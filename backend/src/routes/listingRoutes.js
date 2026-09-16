import express from "express";
import multer from "multer";

import {
  createListing,
  deleteListing,
  getApprovedListings,
  getApprovedListingById,
  getMyListings,
  updateListing,
  updateListingStatus,
} from "../controllers/listingController.js";

import authenticate from "../middleware/auth.js";
import roleCheck from "../middleware/roleCheck.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

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

router.get("/:id", getApprovedListingById);

// Owner updates or deletes their own listing
router.put(
  "/:id",
  authenticate,
  roleCheck("owner", "admin"),
  upload.single("image"),
  updateListing
);

router.delete(
  "/:id",
  authenticate,
  roleCheck("owner", "admin"),
  deleteListing
);

// Admin approves/rejects listing
router.patch(
  "/:id/status",
  authenticate,
  roleCheck("admin"),
  updateListingStatus
);

export default router;
