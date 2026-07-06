import pool from '../config/db.js';

const createTable=async()=>{
    const query=`CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    task TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE
);`
try {
    await pool.query(query);
    console.log("database created ")
    
} catch (error) {
    console.log(`some thing went wrong ${error}`);
}
}

export default createTable;