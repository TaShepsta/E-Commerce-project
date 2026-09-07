import { Router } from "express";
import { validateListing } from "../middleware/validateListing.js";
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
router.post("/", validateListing, addListing);
router.put("/:id", validateListing, editListing);
router.delete("/:id", removeListing);

export default router;
