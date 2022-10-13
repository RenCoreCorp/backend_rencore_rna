const { 
        signUpUser, 
        loginUser, 
        logoutUser, 
        documentData,
        signUpUser2,
    } = require('../controllers/auth-controller.js')
const { 
        validateSignUpUser,
        validateLoginUser,
        validateGetDocument,
        validateSignUpGuest,
        verifyToken
    } = require('./validation')
const express = require('express');

// function checkAuth(req,res,next){
//     if(req.isAuthenticated()){
//         next();
//     } else{
//         res.status(401).json(
//             { error: { status: 401, data: 'Not authorized' }}
//             );
//     }
// }

const router = express.Router();
router.post('/auth', verifyToken)
router.post('/auth/signup', validateSignUpUser, signUpUser) 
router.post('/auth/upsign', validateSignUpGuest, signUpUser2)
router.post('/auth/login', validateLoginUser, loginUser)
router.post('/auth/logout', logoutUser)
router.get('/document/id/:user_id', validateGetDocument, documentData )

module.exports = router;