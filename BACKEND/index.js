import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/users.js';
import dotenv from 'dotenv';
import pool from './config/db.js';
import createTable from './data/table.js';

dotenv.config();

const app=express();
const port=5000;

app.use(bodyParser.json());

app.use('/users',router);

app.listen(port,()=> console.log("the server started now"));


createTable();
app.get('/',async(req,res)=>{
    const result= await pool.query("select current_database()");
    res.send(`the current database is ${result.rows[0].current_database}`);
    console.log(result.rows[0].current_database);
});