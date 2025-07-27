import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.route.js";
import lectureRoutes from "./src/routes/lecture.route.js";

import { connectDB } from "./src/lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", lectureRoutes);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
