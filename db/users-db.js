const db = require('../config/db.js');

const fetchUserByEmailDb = async (email) => {
    try {
        const res = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        return res.rows[0];
    } catch(e) {
        throw new Error(e.message);
    }
}

const fetchDocumentByUserDb = async (user_id) => {
    try {
        const res = await db.query(`select d.uid as uid, d.user_id as user_id, d.dt as dt, d.time as "time", d.comment as "comment",d.status as status,o.name as id_op,d.id_smeny as id_smeny 
        from documents d
        inner join operacii_type o on d.id_op=o.id WHERE d.user_id = $1 and (d.id_op=2 or d.id_op=1) ORDER BY d.uid DESC`, [user_id]);
        return res.rows;
    } catch(e) {
        throw new Error(e.message);
    }
}

const createUserDb = async ({email, first_name, last_name, pwd_hash,number,status}) => {
    const text = `INSERT INTO users(email, first_name, last_name, pwd_hash,number,status)
                  VALUES($1, $2, $3, $4,$5,$6) RETURNING id`;
    const values = [email, first_name, last_name, pwd_hash,number,status];
    try {
        const res = await db.query(text, values);
        return res.rows[0];
    } catch(e) {
        throw new Error(e.message);
    }
}

const createUserDb2 = async ({first_name, last_name,number}) => {
    const text = `INSERT INTO users(first_name, last_name,number)
                  VALUES($1, $2, $3) RETURNING id`;
    const values = [first_name, last_name,number];
    try {
        const res = await db.query(text, values);
        return res.rows[0];
    } catch(e) {
        throw new Error(e.message);
    }
}

module.exports = {  
                    fetchUserByEmailDb,
                    createUserDb, 
                    fetchDocumentByUserDb,
                    createUserDb2,
                }