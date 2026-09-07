import express from 'express';
const router = express.Router();
import {
    createListing,
    getApprovedListings,
    getMyListings,
    updateListingStatus
} from '../controllers/listingController.js';
import authenticate from '../middleware/auth.js';
import roleCheck from '../middleware/roleCheck.js';

// Public browse — no login required.
router.get('/', getApprovedListings);

// Owner-only.
router.post('/', authenticate, roleCheck('owner', 'admin'), createListing);
router.get('/mine', authenticate, roleCheck('owner', 'admin'), getMyListings);

// Admin-only — approve/reject a listing.
router.patch('/:id/status', authenticate, roleCheck('admin'), updateListingStatus);

export default router;