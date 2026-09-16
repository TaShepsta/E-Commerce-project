import Booking from '../models/Booking.js';
import Listing from '../models/Listing.js';

export const createBooking = async (req, res) => {
    try {
        const { listingId, startDate, endDate } = req.body;

        if (!listingId || !startDate || !endDate) {
            return res.status(400).json({ message: 'Listing, start date, and end date are required.' });
        }

        const start = new Date(`${startDate}T00:00:00`);
        const end = new Date(`${endDate}T00:00:00`);
        if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
            return res.status(400).json({ message: 'End date must be on or after the start date.' });
        }

        const conflictingBooking = await Booking.findOverlappingByListing(
            listingId,
            startDate,
            endDate
        );
        if (conflictingBooking) {
            return res.status(409).json({ message: 'This listing is already booked for those dates.' });
        }

        const listing = await Listing.findById(listingId);
        if (!listing || !["approved", "Available"].includes(listing.status)) {
            return res.status(404).json({ message: 'Listing not found or not available for booking.' });
        }

        const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) || 1;
        const totalPrice = (Number(listing.daily_price) * days).toFixed(2);

        const booking = await Booking.create({
            listingId,
            renterId: req.user.id,
            startDate,
            endDate,
            totalPrice
        });

        res.status(201).json({ message: 'Booking created, awaiting payment.', booking });
    } catch (err) {
        console.error('Create booking error:', err);
        res.status(500).json({ message: 'Something went wrong while creating the booking.' });
    }
};

// The logged-in renter's own bookings.
export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.findByRenterId(req.user.id);
        res.status(200).json({ bookings });
    } catch (err) {
        console.error('Get my bookings error:', err);
        res.status(500).json({ message: 'Something went wrong while fetching your bookings.' });
    }
};

// Bookings made against listings the logged-in owner owns.
export const getBookingsOnMyListings = async (req, res) => {
    try {
        const bookings = await Booking.findByOwnerId(req.user.id);
        res.status(200).json({ bookings });
    } catch (err) {
        console.error('Get bookings on my listings error:', err);
        res.status(500).json({ message: 'Something went wrong while fetching bookings.' });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const allowedStatuses = ['pending_payment', 'confirmed', 'in_progress', 'completed', 'cancelled'];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status.' });
        }

        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        if (req.user.role !== 'admin') {
            const listing = await Listing.findById(booking.listing_id);
            const isOwner = req.user.role === 'owner' && listing?.owner_id === req.user.id;
            const isRenter = req.user.role === 'renter' && booking.renter_id === req.user.id;

            if (!isOwner && !isRenter) {
                return res.status(403).json({ message: 'You do not have permission to update this booking.' });
            }
        }

        const updated = await Booking.updateStatus(req.params.id, status);
        res.status(200).json({ message: 'Booking status updated.', booking: updated });
    } catch (err) {
        console.error('Update booking status error:', err);
        res.status(500).json({ message: 'Something went wrong while updating the booking.' });
    }
};