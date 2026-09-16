import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import earningsRoutes from "./routes/earningsRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import ownerApplicationRoutes from "./routes/ownerApplicationRoutes.js";

import errorHandler, { notFound } from "./middleware/errorHandler.js";
import pool from "./config/db.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



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
      "SELECT COUNT(*) AS count FROM products",
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



app.get("/api/products", async (req, res, next) => {
  try {
    const { category, location } = req.query;

    let sql = `
      SELECT
        id,
        title,
        category,
        price_per_day,
        location,
        description,
        image_url,
        status
      FROM products
      WHERE status = 'Safety Verified'
    `;

    const values = [];

    if (category) {
      sql += " AND category = ?";
      values.push(category);
    }

    if (location) {
      sql += " AND location LIKE ?";
      values.push(`%${location}%`);
    }

    sql += " ORDER BY id DESC";

    const [rows] = await pool.query(sql, values);

    res.json(rows);
  } catch (error) {
    next(error);
  }
});



app.get("/api/products/:id", async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `
        SELECT
          id,
          title,
          category,
          price_per_day,
          location,
          description,
          image_url,
          status
        FROM products
        WHERE id = ?
          AND status = 'Safety Verified'
        LIMIT 1
      `,
      [req.params.id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});



app.get("/api/listings/:id/image", async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `
        SELECT
          image_data,
          image_mime_type
        FROM listings
        WHERE id = ?
      `,
      [req.params.id],
    );

    const listing = rows[0];

    if (!listing?.image_data) {
      return res.status(404).json({
        message: "Listing image not found.",
      });
    }

    res.setHeader(
      "Content-Type",
      listing.image_mime_type || "image/jpeg",
    );

    res.send(listing.image_data);
  } catch (error) {
    next(error);
  }
});



app.use("/api/auth", authRoutes);

app.use("/api/listings", listingRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/earnings", earningsRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/owner-applications", ownerApplicationRoutes);



app.get("/", (_req, res) => {
  res.json({
    message: "Rentosphere API is running.",
  });
});


app.use(notFound);

app.use(errorHandler);

export default app;