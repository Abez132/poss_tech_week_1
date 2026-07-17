import express from "express";
import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import authMiddleware from "../middleware/auth.js";
import logger from "../utils/logger.js";

const router = express.Router();

// All task routes require a valid JWT
router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id=$1 ORDER BY created_at ASC",
      [req.userId],
    );
    res.json(result.rows);
  } catch (error) {
    logger.error("error fetching tasks", { error });
    res.status(500).json({ error: "internal server error" });
  }
});

const VALID_PRIORITIES = ["High", "Medium", "Low"];

router.post("/", async (req, res) => {
  const { task, priority = "Medium" } = req.body;

  if (!VALID_PRIORITIES.includes(priority)) {
    return res.status(400).json({ error: "priority must be High, Medium, or Low" });
  }

  const id = uuidv4();

  try {
    const result = await pool.query(
      "INSERT INTO tasks (id, user_id, task, priority) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, req.userId, task, priority],
    );
    res.status(201).json(result.rows);
  } catch (error) {
    logger.error("error creating task", { error });
    res.status(500).json({ error: "internal server error" });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE tasks SET completed = NOT completed WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, req.userId],
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "task not found" });
    res.json(result.rows[0]);
  } catch (error) {
    logger.error("error updating task", { error });
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, req.userId],
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "task not found" });
    res.json({ message: "task deleted" });
  } catch (error) {
    logger.error("error deleting task", { error });
    res.status(500).json({ error: "internal server error" });
  }
});

export default router;
