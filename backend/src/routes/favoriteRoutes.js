import express from "express";
import authenticate from "../middleware/auth.js";
import {
  addFavorite,
  listFavorites,
  removeFavorite,
} from "../controllers/favoriteController.js";

const router = express.Router();

router.use(authenticate);
router.get("/", listFavorites);
router.post("/:listingId", addFavorite);
router.delete("/:listingId", removeFavorite);

export default router;
