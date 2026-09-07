import Listing from '../models/Listing.js';

export const createListing = async (req, res) => {
    try {
        const { title, description, category, dailyPrice, weeklyPrice, monthlyPrice, location } = req.body;

        if (!title || !dailyPrice) {
            return res.status(400).json({ message: 'Title and daily price are required.' });
        }

        const listing = await Listing.create({
            ownerId: req.user.id,
            title,
            description,
            category,
            dailyPrice,
            weeklyPrice,
            monthlyPrice,
            location
        });

        res.status(201).json({ message: 'Listing created and pending approval.', listing });
    } catch (err) {
        console.error('Create listing error:', err);
        res.status(500).json({ message: 'Something went wrong while creating the listing.' });
    }
};

// Public browse — only approved listings, optionally filtered by category.
export const getApprovedListings = async (req, res) => {
    try {
        const { category } = req.query;
        const listings = await Listing.findApproved({ category });
        res.status(200).json({ listings });
    } catch (err) {
        console.error('Get listings error:', err);
        res.status(500).json({ message: 'Something went wrong while fetching listings.' });
    }
};

// The logged-in owner's own listings, any status.
export const getMyListings = async (req, res) => {
    try {
        const listings = await Listing.findByOwnerId(req.user.id);
        res.status(200).json({ listings });
    } catch (err) {
        console.error('Get my listings error:', err);
        res.status(500).json({ message: 'Something went wrong while fetching your listings.' });
    }
};

// Admin-only: approve or reject a pending listing.
export const updateListingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const allowedStatuses = ['pending', 'approved', 'rejected', 'inactive'];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status.' });
        }

        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found.' });
        }

        const updated = await Listing.updateStatus(req.params.id, status);
        res.status(200).json({ message: 'Listing status updated.', listing: updated });
    } catch (err) {
        console.error('Update listing status error:', err);
        res.status(500).json({ message: 'Something went wrong while updating the listing.' });
    }
};