import express from 'express';
import multer from 'multer';

const router = express.Router();

import {
    createListing,
    getApprovedListings,
    getMyListings,
    updateListingStatus
} from '../controllers/listingController.js';

import authenticate from '../middleware/auth.js';
import roleCheck from '../middleware/roleCheck.js';

// Store uploaded images in backend/uploads/
const upload = multer({
    dest: 'uploads/'
});

// Public browse — no login required.
router.get('/', getApprovedListings);

// Owner-only — image upload supported.
router.post(
    '/',
    authenticate,
    roleCheck('owner', 'admin'),
    upload.single('image'),
    createListing
);

router.get(
    '/mine',
    authenticate,
    roleCheck('owner', 'admin'),
    getMyListings
);

// Admin-only — approve/reject a listing.
router.patch(
    '/:id/status',
    authenticate,
    roleCheck('admin'),
    updateListingStatus
);

export default router;