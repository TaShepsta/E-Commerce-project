import express from "express";
import multer from "multer";

import {
  createListing,
  getApprovedListings,
  getMyListings,
  updateListingStatus,
} from "../controllers/listingController.js";

import authenticate from "../middleware/auth.js";
import roleCheck from "../middleware/roleCheck.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

// Public browse
router.get("/", getApprovedListings);

// Owner creates a listing
router.post(
  "/",
  authenticate,
  roleCheck("owner", "admin"),
  upload.single("image"),
  createListing
);

// Owner's listings
router.get(
  "/mine",
  authenticate,
  roleCheck("owner", "admin"),
  getMyListings
);

// Admin approves/rejects listing
router.patch(
  "/:id/status",
  authenticate,
  roleCheck("admin"),
  updateListingStatus
);

export default router;
