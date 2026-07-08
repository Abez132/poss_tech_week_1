import express from "express";
import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("select * from tasks");
    res.send(result.rows);
  } catch (error) {
    console.log("something went wrong while getting");
  }
});

router.post("/", async (req, res) => {
  const tasks = req.body;
  const id = uuidv4();

  try {
    const result = await pool.query(
      "INSERT INTO  tasks (id,task) VALUEs ($1,$2) RETURNING *",
      [id, tasks.task],
    );
    res.send(result.rows);
  } catch (error) {
    console.log("something went wrong while posting");
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE tasks SET completed = NOT completed WHERE id=$1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "task not found" });
    res.json(result.rows[0]);
  } catch (error) {
    console.log("something went wrong while updating", error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const result = pool.query("DELETE FROM tasks WHERE id=$1 RETURNING *", [
      id,
    ]);
    res.send(`task with the id ${id} has been deleted`);
  } catch (error) {
    console.log("something went wrong while deleting");
  }
});

export default router;
