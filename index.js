import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/users.js';

const app=express();
const port=5000;

app.use(bodyParser.json());

app.use('/users',router);

app.listen(port,()=> console.log("the server started now"));
app.get('/',(req,res)=>{
    res.send("home");
});