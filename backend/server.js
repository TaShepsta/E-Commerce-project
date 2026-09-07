import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import pool from "./config/db.js";
import earningsRoutes from "./routes/earningsRoutes.js";
import listingsRoutes from "./routes/listingsRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/listings", listingsRoutes);
app.use("/api/earnings", earningsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "E-commerce backend is running!",
  });
});

app.get("/api/health", async (req, res) => {
  try {
    const [[counts]] = await pool.query(
      `SELECT
         (SELECT COUNT(*) FROM listings WHERE owner_id = ?) AS listings,
         (SELECT COUNT(*) FROM rental_earnings WHERE owner_id = ?) AS earnings`,
      [Number(process.env.OWNER_ID || 1), Number(process.env.OWNER_ID || 1)],
    );
    res.json({
      status: "ok",
      database: "connected",
      databaseName: process.env.DB_NAME || "rentosphere",
      listings: Number(counts.listings),
      earnings: Number(counts.earnings),
    });
  } catch (error) {
    console.error("Database health check failed:", error.code || error.message);
    res.status(503).json({
      status: "degraded",
      database: "unavailable",
      message: error.code || "Check MySQL and backend/.env",
    });
  }
});

app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  pool.query("SELECT 1").catch((error) => {
    console.error(
      `Database unavailable. Check MySQL and backend/.env: ${error.code || error.message || error.name}`,
    );
  });
});

app.use(errorHandler);
