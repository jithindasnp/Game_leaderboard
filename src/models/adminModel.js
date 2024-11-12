import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const admin = mongoose.model("admin", adminSchema);

export default admin;
