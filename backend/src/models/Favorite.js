import pool from "../config/db.js";

const Favorite = {
  async findListingIdsByUserId(userId) {
    const [rows] = await pool.query(
      "SELECT listing_id FROM favorites WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
    );
    return rows.map((row) => row.listing_id);
  },

  async add(userId, listingId) {
    await pool.query(
      "INSERT IGNORE INTO favorites (user_id, listing_id) VALUES (?, ?)",
      [userId, listingId],
    );
  },

  async remove(userId, listingId) {
    const [result] = await pool.query(
      "DELETE FROM favorites WHERE user_id = ? AND listing_id = ?",
      [userId, listingId],
    );
    return result.affectedRows > 0;
  },
};

export default Favorite;
