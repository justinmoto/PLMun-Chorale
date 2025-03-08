import mysql2 from 'mysql2/promise' 
let pool;

export const createConnection = async () => {
    if(!pool){
        pool = mysql2.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
    }
    return pool;
}