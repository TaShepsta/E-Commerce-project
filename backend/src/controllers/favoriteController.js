import Favorite from "../models/Favorite.js";
import Listing from "../models/Listing.js";

export async function listFavorites(req, res, next) {
  try {
    const listingIds = await Favorite.findListingIdsByUserId(req.user.id);
    res.json({ listingIds });
  } catch (error) {
    next(error);
  }
}

export async function addFavorite(req, res, next) {
  try {
    const listing = await Listing.findById(req.params.listingId);
    if (!listing || !["Available", "approved"].includes(listing.status)) {
      return res.status(404).json({ message: "Listing not found." });
    }

    await Favorite.add(req.user.id, req.params.listingId);
    res.status(201).json({ message: "Listing saved." });
  } catch (error) {
    next(error);
  }
}

export async function removeFavorite(req, res, next) {
  try {
    await Favorite.remove(req.user.id, req.params.listingId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
