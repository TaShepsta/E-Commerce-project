import pool from "../config/db.js";

const Product = {
    async getAll() {
        const [rows] = await pool.query(`
            SELECT
                id,
                title,
                category,
                daily_price AS price_per_day,
                location,
                description,
                image_url,
                status
            FROM listings
            WHERE status IN ('Available', 'approved')
            ORDER BY id ASC
        `);

        return rows;
    },

    async findById(id) {
        const [rows] = await pool.query(
            `
            SELECT
                id,
                title,
                category,
                daily_price AS price_per_day,
                location,
                description,
                image_url,
                status
            FROM listings
            WHERE id = ?
              AND status IN ('Available', 'approved')
            `,
            [id]
        );

        return rows[0] || null;
    }
};

export default Product;