const { 
        fetchUserByEmailDb,
        createUserDb, 
        fetchDocumentByUserDb,
        createDocumentByUserDb,
        fetchAllDocumentByUserDb,
        fetchDocumentOPByUserDb,
        adminStage1,
        adminStage2,fetchAdminDocumentByUserDb,fetchAdminUDocumentByUserDb
    }
    = require('../db/users-db');

const fetchUserByEmail = async (email) => {
    try {
        return await fetchUserByEmailDb(email);
    } catch (e) {
        throw new Error(e.message);
    }
}

const fetchDocumentByUser = async (user_id) => {
    try {
        return await fetchDocumentByUserDb(user_id);
    } catch (e) {
        throw new Error(e.message);
    }
}

const fetchDocumentOPByUser = async (user_id,id_smeny) => {
    try {
        return await fetchDocumentOPByUserDb(user_id,id_smeny);
    } catch (e) {
        throw new Error(e.message);
    }
}

const adminStageS1 = async (id_smeny) => {
    try {
        return await adminStage1(id_smeny);
    } catch (e) {
        throw new Error(e.message);
    }
}

const adminStageS2 = async (user_id,id_smeny) => {
    try {
        return await adminStage2(user_id,id_smeny);
    } catch (e) {
        throw new Error(e.message);
    }
}

const createDocument = async (uid) => {
    try {
        return await createDocumentByUserDb(uid);
    } catch (e) {
        throw new Error(e.message);
    }
}

const fetchAllDocumentByUser = async (dt1,dt2) => {
    try {
        return await fetchAllDocumentByUserDb(dt1,dt2);
    } catch (e) {
        throw new Error(e.message);
    }
}

const fetchAdminDocumentByUser = async (dt1,dt2,user) => {
    try {
        return await fetchAdminDocumentByUserDb(dt1,dt2,user);
    } catch (e) {
        throw new Error(e.message);
    }
}

const fetchAdminUDocumentByUser = async (dt1,dt2) => {
    try {
        return await fetchAdminUDocumentByUserDb(dt1,dt2);
    } catch (e) {
        throw new Error(e.message);
    }
}

const createUser = async (user) => {
    try {
        return await createUserDb(user);
    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = {  
                    fetchUserByEmail,
                    createUser, 
                    fetchDocumentByUser,
                    createDocument,
                    fetchAllDocumentByUser,
                    fetchDocumentOPByUser,
                    adminStageS1,
                    adminStageS2,
                    fetchAdminDocumentByUser,fetchAdminUDocumentByUser
                }