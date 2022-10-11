const { 
        signUpUser, 
        loginUser, 
        logoutUser, 
        documentData,
        createDocumentByUser ,
        fetchDocument,
        fetchDocuments,
        adminStag1,
        adminStag2,
        fetchAdminDocument,fetchAdminUDocument
    } = require('../controllers/auth-controller.js')
const { 
        validateSignUpUser,
        validateLoginUser,
        validateGetDocument,
        validatePostDocument,
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
router .get('/', verifyToken)
router  
    .post('/auth/signup', validateSignUpUser, signUpUser)
    .post('/auth/login', validateLoginUser, loginUser)
    .post('/auth/logout', logoutUser)
    
router.get('/document/id/:user_id', checkAuth,validateGetDocument, documentData )
router.post('/document/add', validatePostDocument, createDocumentByUser )
router.get('/document/id/:user_id/id_smeny/:id_smeny',fetchDocuments  )
router.get('/admin/dt1/:dt1/dt2/:dt2',  fetchDocument )
router.get('/admin/user/:user/dt1/:dt1/dt2/:dt2',  fetchAdminDocument )
router.get('/admin/admin/dt1/:dt1/dt2/:dt2',  fetchAdminUDocument )
router.get('/admin/:id_smeny',  adminStag1 )
router.get('/admin/:user_id/:id_smeny',  adminStag2 )
// router.get('/admin/all',  fetchDocument )

module.exports = router;