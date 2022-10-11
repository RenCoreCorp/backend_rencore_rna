const { fetchUserByEmail, 
        createUser, 
        fetchDocumentByUser,
        createDocument,
        fetchAllDocumentByUser ,
        fetchDocumentOPByUser,
        adminStageS1,
        adminStageS2,
        fetchAdminDocumentByUser,fetchAdminUDocumentByUser
    } = require('../services/users-service');
const jwt = require("jsonwebtoken");
const passport = require('passport');
const bcrypt = require('bcrypt');

//регистрация
const signUpUser = async (req, res, next) => {
    const { email, first_name, last_name, password } = req.body;

    try {
        const userDb = await fetchUserByEmail(email)  
        if (userDb) {
            return res.status(422).json({
                error: { status: 422, data: "Пользователь с таким адресом электронной почты уже существует."}
            });
        }

        const pwd_hash = await bcrypt.hash(password, 10);
        const user = {
            email,
            first_name,
            last_name,
            pwd_hash,
        }
        const newUser = await createUser(user);
        res.status(201).json({user_id: newUser.id});
    } catch(err) {
        return next(err);
    }
}

//Создание отметки в documents
const createDocumentByUser = async (req, res, next) => {
    const { user_id,comment } = req.body;
    try {
        const document = {
            user_id, 
            comment
        }
        const newDocument = await createDocument(document);
        return res.status(201).json(newDocument);
    } catch(err) {
        return next(err);
    }
}

//вывод Admin документов
const fetchDocument = async (req, res, next) => {
    try {
        const {dt1,dt2} = req.params
        const newDocument = await fetchAllDocumentByUser(dt1,dt2)
        if (!newDocument) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }
        return res.json(newDocument)
    } catch(err) {
        return next(err);
    }
}

const fetchAdminDocument = async (req, res, next) => {
    try {
        const {dt1,dt2,user} = req.params
        const newDocument = await fetchAdminDocumentByUser(dt1,dt2,user)
        if (!newDocument) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }
        return res.json(newDocument)
    } catch(err) {
        return next(err);
    }
}

const fetchAdminUDocument = async (req, res, next) => {
    try {
        const {dt1,dt2} = req.params
        const newDocument = await fetchAdminUDocumentByUser(dt1,dt2)
        if (!newDocument) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }
        return res.json(newDocument)
    } catch(err) {
        return next(err);
    }
}
//вход в учетку
const loginUser = (req, res, next) => {
        passport.authenticate(
            'login', (err, user, info) => {
                    if (err) return res.status(500).send();
                    if (!user) {
                        return res.status(401)
                                  .json({ error: { status: 401,
                                                   data: info.message }
                                            })
                        }
                    req.login(user, (err) => {
                        if (err) return next(err);
                        const { id, first_name, last_name, email, isAdmin } = req.user;
                        const token = jwt.sign({id: user.id, email: user.email}, process.env.SESSION_SECRET, {expiresIn: "24h"})
                        // const userinfo = {
                        //     id, first_name, last_name, email, isAdmin
                        // }
                        // return res.json({
                        //     token,
                        //     userinfo: {
                        //         id: userinfo.id,
                        //         first_name: userinfo.first_name,
                        //         last_name: userinfo.last_name,
                        //         email: userinfo.email,
                        //         isAdmin: userinfo.isAdmin
                        //     }
                        // })
                        let options = {
                            maxAge: 7 * 24 * 60 * 60 * 1000, // would expire after 15 minutes
                            httpOnly: true, // The cookie only accessible by the web server
                            signed: true // Indicates if the cookie should be signed
                        }
                        return res.cookie('x-access-token', 'token', options), res.header('x-access-token', [token]),res.json({token,id, first_name, last_name, email, isAdmin});
                        
                    })
            }
    )(req, res, next);
}

//вывод информации с таблицы с условием
const documentData = async (req, res, next) => {
    try {
        
        const {user_id} = req.params
        const document = await fetchDocumentByUser(user_id)
        if (!document) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }

        //возвращает все документы
        res.status(200).json(document)

        //возвращает только 1 документ
        // return res.json(document)
        // next()
    } catch(err) {
        return next(err);
    }
}

const adminStag1 = async (req, res, next) => {
    try {
        const {id_smeny} = req.params
        const document = await adminStageS1(id_smeny)
        if (!document) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }
        //возвращает все документы
        res.status(200).json(document)
    } catch(err) {
        return next(err);
    }
}

const adminStag2 = async (req, res, next) => {
    try {
        const {user_id,id_smeny} = req.params
        const document = await adminStageS2(user_id,id_smeny)
        if (!document) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }
        //возвращает все документы
        res.status(200).json(document)
    } catch(err) {
        return next(err);
    }
}

//вывод информации с таблицы с условием
const fetchDocuments = async (req, res, next) => {
    try {
        
        const {user_id,id_smeny} = req.params
        const document = await fetchDocumentOPByUser(user_id,id_smeny)
        if (!document) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }

        // //возвращает все документы
        return res.json(document)

        //возвращает только 1 документ
        // return res.json(document)
        next()
    } catch(err) {
        return next(err);
    }
}

//выход с учетки
const logoutUser = (req, res, next) => {
    req.logout();
    res.clearCookie('connect.sid');
    req.session.destroy(function (err) {
        res.status(200).send();
    });
}

module.exports = {
    signUpUser, 
    loginUser, 
    logoutUser, 
    documentData,
    createDocumentByUser,
    fetchDocument,
    fetchDocuments,
    adminStag1,
    adminStag2,
    fetchAdminDocument,fetchAdminUDocument
}