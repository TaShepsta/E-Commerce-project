import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import pool from "./config/db.js";
import earningsRoutes from "./routes/earningsRoutes.js";
import listingsRoutes from "./routes/listingsRoutes.js";

dotenv.config();

const app = express();

function extractLocation(description = "") {
  const match = description.match(/^Location:\s*([^\n]+)/i);
  return match ? match[1].trim() : "";
}

function formatProduct(listing) {
  const description = listing.description || "";
  const normalizedDescription = description
    .replace(/^Location:\s*[^\n]+\n\s*/i, "")
    .trim();

  return {
    id: listing.id,
    title: listing.name,
    name: listing.name,
    category: listing.category,
    description: normalizedDescription,
    location: extractLocation(description),
    status: listing.status === "Available" ? "Safety Verified" : listing.status,
    price_per_day: Number(listing.price),
    price: Number(listing.price),
    image_url: listing.image,
    image: listing.image,
    imageAlt: listing.imageAlt,
    image_alt: listing.imageAlt,
  };
}

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/api/products", async (req, res, next) => {
  try {
    const ownerId = Number(process.env.OWNER_ID || 1);
    const [rows] = await pool.query(
      `SELECT
         id,
         owner_id AS ownerId,
         item_name AS name,
         description,
         category,
         rental_price AS price,
         price_unit AS priceUnit,
         status,
         image_url AS image,
         image_alt AS imageAlt,
         created_at AS createdAt
       FROM listings
       WHERE owner_id = ?
       ORDER BY created_at DESC`,
      [ownerId],
    );

    const requestedStatus = String(req.query.status || "").trim();
    const items = rows.map(formatProduct);
    const filteredItems = requestedStatus
      ? items.filter((item) => item.status === requestedStatus)
      : items;

    res.json(filteredItems);
  } catch (error) {
    next(error);
  }
});

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
