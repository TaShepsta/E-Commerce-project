import {
  createListing,
  deleteListing,
  getListingById,
  getListings,
  updateListing,
} from "../models/listingsModel.js";

const ownerId = () => Number(process.env.OWNER_ID || 1);

export async function listListings(req, res, next) {
  try {
    res.json(await getListings(ownerId()));
  } catch (error) {
    next(error);
  }
}

export async function showListing(req, res, next) {
  try {
    const listing = await getListingById(req.params.id, ownerId());
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (error) {
    next(error);
  }
}

export async function addListing(req, res, next) {
  try {
    const listing = await createListing(req.body, ownerId());
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
}

export async function editListing(req, res, next) {
  try {
    const listing = await updateListing(req.params.id, req.body, ownerId());
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (error) {
    next(error);
  }
}

export async function removeListing(req, res, next) {
  try {
    const removed = await deleteListing(req.params.id, ownerId());
    if (!removed) return res.status(404).json({ message: "Listing not found" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
