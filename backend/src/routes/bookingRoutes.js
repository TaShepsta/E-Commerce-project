import express from 'express';
const router = express.Router();
import {
    createBooking,
    getMyBookings,
    getBookingsOnMyListings,
    updateBookingStatus
} from '../controllers/bookingController.js';
import authenticate from '../middleware/auth.js';
import roleCheck from '../middleware/roleCheck.js';

// Renter-only — book a listing, view own bookings.
router.post('/', authenticate, roleCheck('renter', 'admin'), createBooking);
router.get('/mine', authenticate, getMyBookings);

// Owner-only — bookings made against listings they own.
router.get('/on-my-listings', authenticate, roleCheck('owner', 'admin'), getBookingsOnMyListings);

// Admin (or the relevant owner/renter, later) — update a booking's status.
router.patch('/:id/status', authenticate, updateBookingStatus);

export default router;