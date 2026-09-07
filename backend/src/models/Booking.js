import pool from '../config/db.js';

const Booking = {
    async create({ listingId, renterId, startDate, endDate, totalPrice }) {
        const [result] = await pool.query(
            `INSERT INTO bookings (listing_id, renter_id, start_date, end_date, total_price)
             VALUES (?, ?, ?, ?, ?)`,
            [listingId, renterId, startDate, endDate, totalPrice]
        );
        return this.findById(result.insertId);
    },

    async findById(id) {
        const [rows] = await pool.query(
            'SELECT * FROM bookings WHERE id = ?',
            [id]
        );
        return rows[0] || null;
    },

    // A renter's own bookings (used to restore "my bookings" on login).
    async findByRenterId(renterId) {
        const [rows] = await pool.query(
            `SELECT b.*, l.title AS listing_title
             FROM bookings b
             JOIN listings l ON l.id = b.listing_id
             WHERE b.renter_id = ?
             ORDER BY b.created_at DESC`,
            [renterId]
        );
        return rows;
    },

    // Bookings made against listings a given owner owns (so owners can see who's renting their stuff).
    async findByOwnerId(ownerId) {
        const [rows] = await pool.query(
            `SELECT b.*, l.title AS listing_title
             FROM bookings b
             JOIN listings l ON l.id = b.listing_id
             WHERE l.owner_id = ?
             ORDER BY b.created_at DESC`,
            [ownerId]
        );
        return rows;
    },

    async updateStatus(id, status) {
        await pool.query(
            'UPDATE bookings SET status = ? WHERE id = ?',
            [status, id]
        );
        return this.findById(id);
    }
};

export default Booking;