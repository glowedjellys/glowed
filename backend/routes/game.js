import express from "express";
import Game from "../models/Game.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const games = await Game.find().populate("creator", "username avatar");
  res.json(games);
});

router.post("/", async (req, res) => {
  // Assume token & user auth middleware in production
  const { title, description, image, url, creatorId } = req.body;
  const game = await Game.create({ title, description, image, url, creator: creatorId });
  res.json(game);
});

router.get("/:id", async (req, res) => {
  const game = await Game.findById(req.params.id).populate("creator", "username avatar");
  res.json(game);
});

export default router;