import { Router } from "express";
import {
  addListing,
  editListing,
  listListings,
  removeListing,
  showListing,
} from "../controllers/listingsController.js";

const router = Router();

router.get("/", listListings);
router.get("/:id", showListing);
router.post("/", addListing);
router.put("/:id", editListing);
router.delete("/:id", removeListing);

export default router;
