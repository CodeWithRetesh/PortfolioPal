import express from "express";
import dotenv from "dotenv";
import healthRoutes from "./routes/healthRoutes.js";

dotenv.config();

const app = express();
app.use("/api/health", healthRoutes);

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("PortfolioPal Backend Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(notFound);