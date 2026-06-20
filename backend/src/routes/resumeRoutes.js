import express from "express";
import protect from "../middleware/authMiddleware.js";
import { generateResume } from "../controllers/resumeController.js";

const router = express.Router();

router.post(
  "/generate",
  protect,
  generateResume
);

export default router;