import express from "express";
import { getLecturesByDateView } from "../controllers/lecture.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getLecturesByDateView);

export default router;
