import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createPortfolio,
  getMyPortfolios,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolioController.js";

const router = express.Router();

router.post("/", protect, createPortfolio);

router.get("/my", protect, getMyPortfolios);

router.put("/:id", protect, updatePortfolio);

router.delete("/:id", protect, deletePortfolio);

export default router;