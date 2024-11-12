import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import DB from "./src/dbConnect.js";
import authRouter from './src/modules/authentication/routes/authRoutes.js'

dotenv.config();

DB.connectDB();

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

const corsOptions = {
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

app.use("/api/v1/auth", authRouter);

app.post("*", (req, res) => {
  res.status(404).json({
    status: false,
    message: "Unknown path specified....",
  });
});

app.listen(3003, (err) => {
  if (err) {
    console.log("Server error:", err);
  } else {
    console.log("server running at 3003");
  }
});
