import pool from '../config/db.js';

const Listing = {
    async create({ ownerId, title, description, category, dailyPrice, weeklyPrice, monthlyPrice, location }) {
        const [result] = await pool.query(
            `INSERT INTO listings
                (owner_id, title, description, category, daily_price, weekly_price, monthly_price, location)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [ownerId, title, description, category, dailyPrice, weeklyPrice || null, monthlyPrice || null, location]
        );
        return this.findById(result.insertId);
    },

    async findById(id) {
        const [rows] = await pool.query(
            'SELECT * FROM listings WHERE id = ?',
            [id]
        );
        return rows[0] || null;
    },

    // All listings belonging to one owner (used to restore "my listings" on login).
    async findByOwnerId(ownerId) {
        const [rows] = await pool.query(
            'SELECT * FROM listings WHERE owner_id = ? ORDER BY created_at DESC',
            [ownerId]
        );
        return rows;
    },

    // Public browse/search — only approved listings should ever show up here.
    async findApproved({ category } = {}) {
        if (category) {
            const [rows] = await pool.query(
                "SELECT * FROM listings WHERE status = 'approved' AND category = ? ORDER BY created_at DESC",
                [category]
            );
            return rows;
        }
        const [rows] = await pool.query(
            "SELECT * FROM listings WHERE status = 'approved' ORDER BY created_at DESC"
        );
        return rows;
    },

    async updateStatus(id, status) {
        await pool.query(
            'UPDATE listings SET status = ? WHERE id = ?',
            [status, id]
        );
        return this.findById(id);
    }
};

export default Listing;