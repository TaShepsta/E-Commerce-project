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
  serveListingImage,
} from "../controllers/listingController.js";

import authenticate from "../middleware/auth.js";
import roleCheck from "../middleware/roleCheck.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

// PUBLIC BROWSE

router.get("/", getApprovedListings);

// PUBLIC LISTING IMAGE

router.get("/:id/image", serveListingImage);

// OWNER CREATES LISTING

router.post(
  "/",
  authenticate,
  roleCheck("owner", "admin"),
  upload.single("image"),
  createListing
);

// OWNER'S LISTINGS

router.get(
  "/mine",
  authenticate,
  roleCheck("owner", "admin"),
  getMyListings
);

// PUBLIC SINGLE LISTING

router.get("/:id", getApprovedListingById);


// OWNER UPDATES LISTING

router.put(
  "/:id",
  authenticate,
  roleCheck("owner", "admin"),
  upload.single("image"),
  updateListing
);


// OWNER DELETES LISTING


router.delete(
  "/:id",
  authenticate,
  roleCheck("owner", "admin"),
  deleteListing
);

// ADMIN APPROVES/REJECTS

router.patch(
  "/:id/status",
  authenticate,
  roleCheck("admin"),
  updateListingStatus
);

export default router;

