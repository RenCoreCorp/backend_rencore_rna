const { 
        fetchUserByEmailDb,
        createUserDb, 
        fetchDocumentByUserDb,
        createUserDb2,
        
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

const createUser = async (user) => {
    try {
        return await createUserDb(user);
    } catch (e) {
        throw new Error(e.message);
    }
}

const createUser2 = async (user) => {
    try {
        return await createUserDb2(user);
    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = {  
                    fetchUserByEmail,
                    createUser, 
                    fetchDocumentByUser,
                    createUser2,
                }