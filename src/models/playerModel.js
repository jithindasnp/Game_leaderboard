import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  score: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const player = mongoose.model("player", playerSchema);

export default player;
