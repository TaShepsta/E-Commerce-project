import pool from "../config/db.js";

const Booking = {
  async create({
    productId,
    renterId,
    startDate,
    endDate,
    totalPrice,
  }) {
    const [result] = await pool.query(
      `INSERT INTO bookings
        (product_id, renter_id, start_date, end_date, total_price)
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
       WHERE product_id = ?
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
         ON p.id = b.product_id
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
         ON p.id = b.product_id
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
};

export default Booking;