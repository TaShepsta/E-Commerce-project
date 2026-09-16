import {
  createOwnerListing,
  deleteOwnerListing,
  getListingImage,
  getOwnerListingById,
  getOwnerListings,
  getPublicListingById,
  getPublicListings,
  updateOwnerListing,
} from "../models/listingsModel.js";
import OwnerApplication from "../models/OwnerApplication.js";

function getOwnerId(req) {
  return Number(req.user.id);
}

// =========================================================
// PUBLIC LISTINGS
// =========================================================

export async function getApprovedListings(req, res, next) {
  try {
    const listings = await getPublicListings({
      category: req.query.category,
      location: req.query.location,
    });

    res.json(listings);
  } catch (error) {
    next(error);
  }
}

export async function getApprovedListingById(req, res, next) {
  try {
    const listing = await getPublicListingById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.json(listing);
  } catch (error) {
    next(error);
  }
}

// =========================================================
// OWNER LISTINGS
// =========================================================

export async function getMyListings(req, res, next) {
  try {
    const listings = await getOwnerListings(getOwnerId(req));

    res.json(listings);
  } catch (error) {
    next(error);
  }
}

export async function createListing(req, res, next) {
  try {
    if (req.user.role === "owner") {
      const ownerStatus = await OwnerApplication.findStatusByUserId(req.user.id);

      if (ownerStatus !== "approved") {
        return res.status(403).json({
          message: "Your owner application must be approved before you can create listings.",
        });
      }
    }

    const listing = await createOwnerListing(
      {
        ...req.body,
        file: req.file || null,
      },
      getOwnerId(req),
    );

    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
}

export async function updateListing(req, res, next) {
  try {
    const listing = await updateOwnerListing(
      req.params.id,
      {
        ...req.body,
        file: req.file || null,
      },
      getOwnerId(req),
    );

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found.",
      });
    }

    res.json(listing);
  } catch (error) {
    next(error);
  }
}

export async function deleteListing(req, res, next) {
  try {
    const removed = await deleteOwnerListing(req.params.id, getOwnerId(req));

    if (!removed) {
      return res.status(404).json({
        message: "Listing not found.",
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}



export async function updateListingStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required.",
      });
    }

    const allowedStatuses = [
      "Available",
      "Paused",
      "approved",
      "pending",
      "rejected",
      "inactive",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid listing status.",
      });
    }

    const listing = await updateOwnerListing(id, { status }, null);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found.",
      });
    }

    res.json(listing);
  } catch (error) {
    next(error);
  }
}



export async function serveListingImage(req, res, next) {
  try {
    const image = await getListingImage(req.params.id);

    if (!image?.image_data) {
      return res.status(404).json({
        message: "Listing image not found.",
      });
    }

    res.setHeader("Content-Type", image.image_mime_type || "image/jpeg");

    res.send(image.image_data);
  } catch (error) {
    next(error);
  }
}
