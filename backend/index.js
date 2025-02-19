import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB.js";

import authRoute from "./routes/auth.route.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // parse incoming request : req.body
app.use(cookieParser()); //  parse incoming cookie

app.use("/api/auth", authRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
