import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB.js";

import authRoute from "./routes/auth.route.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // parse incoming request : req.body
app.use(cookieParser()); //  parse incoming cookie

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
