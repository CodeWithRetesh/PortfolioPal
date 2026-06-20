import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  exportProjectPDF,
} from "../controllers/pdfController.js";

const router = express.Router();

router.get(
  "/project/:id/pdf",
  protect,
  exportProjectPDF
);

export default router;