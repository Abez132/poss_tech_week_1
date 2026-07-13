import express from "express";
import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import authMiddleware from "../middleware/auth.js";

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
    console.log("error fetching tasks", error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.post("/", async (req, res) => {
  const { task } = req.body;
  const id = uuidv4();

  try {
    const result = await pool.query(
      "INSERT INTO tasks (id, user_id, task) VALUES ($1, $2, $3) RETURNING *",
      [id, req.userId, task],
    );
    res.status(201).json(result.rows);
  } catch (error) {
    console.log("error creating task", error);
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
    console.log("error updating task", error);
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
    console.log("error deleting task", error);
    res.status(500).json({ error: "internal server error" });
  }
});

export default router;
