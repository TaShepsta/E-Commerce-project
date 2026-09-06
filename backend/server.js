import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});
