import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";

import "./config/env.js";

import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";

import { notFound } from "./middleware/notFound.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/v1/portfolios", portfolioRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("PortfolioPal Backend Running 🚀");
});

// 404 Middleware
app.use(notFound);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});