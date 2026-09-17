import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import earningsRoutes from "./routes/earningsRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import ownerApplicationRoutes from "./routes/ownerApplicationRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import payfastRoutes from "./routes/payfastRoutes.js";

import errorHandler, { notFound } from "./middleware/errorHandler.js";
import pool from "./config/db.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// ============================================================
// MIDDLEWARE
// ============================================================

app.use(
  cors({
    origin: true,
    credentials: false,
  }),
);

app.use(express.json({ limit: "10mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  }),
);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads")),
);


// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/api/health", async (_req, res) => {
  try {
    const connection = await pool.getConnection();

    await connection.ping();
    connection.release();

    const [[listings]] = await pool.query(
      "SELECT COUNT(*) AS count FROM listings",
    );

    const [[earnings]] = await pool.query(
      "SELECT COUNT(*) AS count FROM rental_earnings",
    );

    const [[products]] = await pool.query(
      "SELECT COUNT(*) AS count FROM listings WHERE status IN ('Available', 'approved')",
    );

    res.json({
      status: "ok",
      database: "connected",
      databaseName: process.env.DB_NAME || "rentosphere",
      listings: Number(listings.count),
      earnings: Number(earnings.count),
      products: Number(products.count),
    });
  } catch (error) {
    console.error(
      "Database health check failed:",
      error.code || error.message,
    );

    res.status(503).json({
      status: "degraded",
      database: "unavailable",
      message: error.code || error.message,
    });
  }
});


// ============================================================
// API ROUTES
// ============================================================

app.use("/api/auth", authRoutes);

app.use("/api/listings", listingRoutes);

app.use("/api/products", productRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/earnings", earningsRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/owner-applications", ownerApplicationRoutes);

app.use("/api/favorites", favoriteRoutes);

app.use("/api/payfast", payfastRoutes);


// ============================================================
// ROOT
// ============================================================

app.get("/", (_req, res) => {
  res.json({
    message: "Rentosphere API is running.",
  });
});


// ============================================================
// ERROR HANDLING
// ============================================================

app.use(notFound);

app.use(errorHandler);

export default app;