import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pool from "./config/db.js";
import createTable from "./data/table.js";
import taskRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/users", taskRouter);

app.get("/", async (_req, res) => {
  const result = await pool.query("select current_database()");
  res.send(`connected to: ${result.rows[0].current_database}`);
});

// Centralized error handler — must have 4 params for Express to treat it as an error handler
app.use((err, _req, res, _next) => {
  logger.error("unhandled error", { error: err });
  res
    .status(err.status ?? 500)
    .json({ error: err.message ?? "internal server error" });
});

createTable().then(() => {
  app.listen(port, () => logger.info(`server running on port ${port}`));
});

export default app;
