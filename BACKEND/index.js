import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pool from "./config/db.js";
import createTable from "./data/table.js";
import taskRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use("/auth", authRouter); // public  — register & login
app.use("/users", taskRouter); // protected — requires JWT

app.get("/", async (_req, res) => {
    const result = await pool.query("select current_database()");
    res.send(`connected to: ${result.rows[0].current_database}`);
});

createTable().then(() => {
    app.listen(port, () => console.log(`server running on port ${port}`));
});
