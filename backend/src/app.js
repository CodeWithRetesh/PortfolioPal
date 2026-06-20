import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";

import "./config/env.js";

// Route Imports
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import aiProjectRoutes from "./routes/aiProjectRoutes.js";
import { notFound } from "./middleware/notFound.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import portfolioBuilderRoutes from "./routes/portfolioBuilderRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/v1/resume", resumeRoutes);
app.use("/api/v1/portfolios", portfolioRoutes);
app.use("/api/v1/portfolio-builder", portfolioBuilderRoutes);
app.use("/api/v1/ai", aiRoutes);

app.use("/api/v1/ai/projects", aiProjectRoutes);

app.use("/api/v1/pdf", pdfRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("PortfolioPal Backend Running 🚀");
});

// 404 Handler
app.use(notFound);

const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});