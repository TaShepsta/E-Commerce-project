import pool from "../config/db.js";

const Payment = {
  async create({ mPaymentId, renterId, amount, bookingIds }) {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const [result] = await connection.query(
        `INSERT INTO payments (m_payment_id, renter_id, amount)
         VALUES (?, ?, ?)`,
        [mPaymentId, renterId, amount],
      );

      const paymentId = result.insertId;

      if (bookingIds.length) {
        const values = bookingIds.map((bookingId) => [paymentId, bookingId]);

        await connection.query(
          `INSERT INTO payment_bookings (payment_id, booking_id) VALUES ?`,
          [values],
        );
      }

      await connection.commit();

      return this.findByMPaymentId(mPaymentId);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async findByMPaymentId(mPaymentId) {
    const [rows] = await pool.query(
      `SELECT * FROM payments WHERE m_payment_id = ?`,
      [mPaymentId],
    );

    return rows[0] || null;
  },

  async getBookingIds(paymentId) {
    const [rows] = await pool.query(
      `SELECT booking_id FROM payment_bookings WHERE payment_id = ?`,
      [paymentId],
    );

    return rows.map((row) => row.booking_id);
  },

  async updateStatus(mPaymentId, { status, pfPaymentId, rawItn }) {
    await pool.query(
      `UPDATE payments
       SET status = ?,
           pf_payment_id = COALESCE(?, pf_payment_id),
           raw_itn = ?
       WHERE m_payment_id = ?`,
      [status, pfPaymentId || null, rawItn ? JSON.stringify(rawItn) : null, mPaymentId],
    );

    return this.findByMPaymentId(mPaymentId);
  },
};

export default Payment;
