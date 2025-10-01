import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hash });
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // Ensure username is a string to prevent NoSQL injection
  if (typeof username !== "string") {
    return res.status(400).json({ success: false, error: "Invalid username format" });
  }
  // Use $eq to treat username as literal value in query
  const user = await User.findOne({ username: { $eq: username } });
  if (!user) return res.status(400).json({ success: false, error: "User not found" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ success: false, error: "Invalid password" });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ success: true, token, user: { username: user.username, avatar: user.avatar } });
});

export default router;