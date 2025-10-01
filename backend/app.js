import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import gameRoutes from "./routes/game.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);

app.get("/", (req, res) => res.send("Glowed API Running!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));