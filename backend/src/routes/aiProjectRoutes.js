import express from "express";

import {
  saveProject,
  getProjects,
  getProjectById,
  deleteProject,
} from "../controllers/aiProjectController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected - user must be authenticated
router.post("/save-project", protect, saveProject);

// Get all projects for the logged in user
router.get("/my-projects", protect, getProjects);

// Get single project by ID
router.get("/project/:id", protect, getProjectById);

// Delete project by ID
router.delete("/project/:id", protect, deleteProject);

export default router;