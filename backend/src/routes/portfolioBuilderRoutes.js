import express from "express";
import protect from "../middleware/authMiddleware.js";
import { generatePortfolio } from "../controllers/portfolioBuilderController.js";

const router = express.Router();

router.post("/generate", protect, generatePortfolio);

export default router;