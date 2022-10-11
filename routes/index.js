const { 
        signUpUser, 
        loginUser, 
        logoutUser, 
        documentData,
    } = require('../controllers/auth-controller.js')
const { 
        validateSignUpUser,
        validateLoginUser,
        validateGetDocument,
        verifyToken
    } = require('./validation')
const express = require('express');

function checkAuth(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.status(401).json(
            { error: { status: 401, data: 'Not authorized' }}
            );
    }
}

const router = express.Router();
router.get('/', verifyToken)
router  
    .post('/auth/signup', validateSignUpUser, signUpUser)
    .post('/auth/login', validateLoginUser, loginUser)
    .post('/auth/logout', logoutUser)
router.get('/document/id/:user_id', checkAuth,validateGetDocument, documentData )

module.exports = router;