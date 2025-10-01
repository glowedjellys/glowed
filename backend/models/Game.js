import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  url: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Game", gameSchema);