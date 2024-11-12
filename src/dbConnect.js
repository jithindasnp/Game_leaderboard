// db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    
    const uri = process.env.CONNECTION_LINK;

    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

export default { connectDB };
