import pool from "../config/db.js";

const Listing = {
  async create({
    ownerId,
    title,
    description,
    category,
    dailyPrice,
    weeklyPrice = null,
    monthlyPrice = null,
    location = null,
    imageUrl = null,
  }) {
    const [result] = await pool.query(
      `
      INSERT INTO listings (
        owner_id,
        title,
        description,
        category,
        daily_price,
        weekly_price,
        monthly_price,
        location,
        image_url
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        ownerId,
        title,
        description,
        category,
        dailyPrice,
        weeklyPrice,
        monthlyPrice,
        location,
        imageUrl,
      ],
    );

    return this.findById(result.insertId);
  },

  async findById(id) {
    const [rows] = await pool.query(
      `
      SELECT *
      FROM listings
      WHERE id = ?
      LIMIT 1
      `,
      [id],
    );

    return rows[0] || null;
  },

  async findByOwnerId(ownerId) {
    const [rows] = await pool.query(
      `
      SELECT *
      FROM listings
      WHERE owner_id = ?
      ORDER BY created_at DESC
      `,
      [ownerId],
    );

    return rows;
  },

  async findApproved({ category } = {}) {
    let query = `
      SELECT *
      FROM listings
      WHERE status IN ('approved', 'Available')
    `;

    const params = [];

    if (category) {
      query += ` AND category = ?`;
      params.push(category);
    }

    query += ` ORDER BY created_at DESC`;

    const [rows] = await pool.query(query, params);

    return rows;
  },

  async updateStatus(id, status) {
    await pool.query(
      `
      UPDATE listings
      SET status = ?
      WHERE id = ?
      `,
      [status, id],
    );

    return this.findById(id);
  },
};

export default Listing;
