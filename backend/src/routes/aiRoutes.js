import express from "express";
import { generateProjectController } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-project", generateProjectController);

export default router;