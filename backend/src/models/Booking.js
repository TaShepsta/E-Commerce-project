import pool from "../config/db.js";

const Booking = {
  async createEarningsForBooking(bookingId) {
    const [bookingRows] = await pool.query(
      `SELECT b.id, b.total_price, b.listing_id, p.owner_id, p.title AS listing_title
       FROM bookings b
       LEFT JOIN products p ON p.id = b.listing_id
       WHERE b.id = ?
       LIMIT 1`,
      [bookingId],
    );

    const booking = bookingRows[0];

    if (!booking || !booking.owner_id) {
      return null;
    }

    const [existingRows] = await pool.query(
      `SELECT id
       FROM rental_earnings
       WHERE booking_id = ?
       LIMIT 1`,
      [bookingId],
    );

    if (existingRows[0]) {
      return existingRows[0];
    }

    const [result] = await pool.execute(
      `INSERT INTO rental_earnings
        (owner_id, booking_id, description, amount, rental_date, status)
       VALUES (?, ?, ?, ?, CURDATE(), 'Completed')`,
      [
        booking.owner_id,
        bookingId,
        `Rental payment for ${booking.listing_title || "listing"}`,
        Number(booking.total_price || 0),
      ],
    );

    return { id: result.insertId };
  },

  async create({
    productId,
    renterId,
    startDate,
    endDate,
    totalPrice,
  }) {
    const [result] = await pool.query(
      `INSERT INTO bookings
        (listing_id, renter_id, start_date, end_date, total_price)
       VALUES (?, ?, ?, ?, ?)`,
      [
        productId,
        renterId,
        startDate,
        endDate,
        totalPrice,
      ],
    );

    return this.findById(result.insertId);
  },

  async findById(id) {
    const [rows] = await pool.query(
      `SELECT *
       FROM bookings
       WHERE id = ?`,
      [id],
    );

    return rows[0] || null;
  },

  async findOverlappingByProduct(
    productId,
    startDate,
    endDate,
  ) {
    const [rows] = await pool.query(
      `SELECT id
       FROM bookings
       WHERE listing_id = ?
         AND status NOT IN ('cancelled', 'completed')
         AND start_date <= ?
         AND end_date >= ?
       LIMIT 1`,
      [
        productId,
        endDate,
        startDate,
      ],
    );

    return rows[0] || null;
  },

  async findByRenterId(renterId) {
    const [rows] = await pool.query(
      `SELECT
        b.*,
        p.title AS listing_title
       FROM bookings b
       JOIN products p
         ON p.id = b.listing_id
       WHERE b.renter_id = ?
       ORDER BY b.created_at DESC`,
      [renterId],
    );

    return rows;
  },

  async findByOwnerId(ownerId) {
    const [rows] = await pool.query(
      `SELECT
        b.*,
        p.title AS listing_title
       FROM bookings b
       JOIN products p
         ON p.id = b.listing_id
       WHERE p.id IN (
         SELECT id
         FROM products
       )
       ORDER BY b.created_at DESC`,
    );

    return rows;
  },

  async updateStatus(id, status) {
    await pool.query(
      `UPDATE bookings
       SET status = ?
       WHERE id = ?`,
      [status, id],
    );

    return this.findById(id);
  },

  // Fetch multiple bookings by id, scoped to a renter — used when
  // initiating a PayFast payment so a user can't pay for someone else's
  // booking by guessing an id.
  async findByIdsForRenter(ids, renterId) {
    if (!ids.length) return [];

    const [rows] = await pool.query(
      `SELECT *
       FROM bookings
       WHERE id IN (?)
         AND renter_id = ?`,
      [ids, renterId],
    );

    return rows;
  },

  async updateStatusForIds(ids, status) {
    if (!ids.length) return;

    await pool.query(
      `UPDATE bookings
       SET status = ?
       WHERE id IN (?)`,
      [status, ids],
    );

    if (status === "confirmed" || status === "completed") {
      for (const id of ids) {
        await this.createEarningsForBooking(id);
      }
    }
  },
};

export default Booking;