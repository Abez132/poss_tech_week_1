import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";
import logger from "../utils/logger.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "email and password are required" });

  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "password must be at least 6 characters" });

  try {
    const existing = await pool.query("SELECT id FROM users WHERE email=$1", [
      email,
    ]);
    if (existing.rows.length > 0)
      return res.status(409).json({ error: "email already registered" });

    const password_hash = await bcrypt.hash(password, 10);
    const id = uuidv4();

    await pool.query(
      "INSERT INTO users (id, email, password_hash) VALUES ($1, $2, $3)",
      [id, email, password_hash],
    );

    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({ token });
  } catch (error) {
    logger.error("register error", { error });
    res.status(500).json({ error: "internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "email and password are required" });

  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (result.rows.length === 0)
      return res.status(401).json({ error: "invalid email or password" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match)
      return res.status(401).json({ error: "invalid email or password" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (error) {
    logger.error("login error", { error });
    res.status(500).json({ error: "internal server error" });
  }
});

export default router;
