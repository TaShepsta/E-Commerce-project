import pool from "../config/db.js";

const Product = {
    async getAll() {
        const [rows] = await pool.query(`
            SELECT
                id,
                title,
                category,
                price_per_day,
                location,
                description,
                image_url,
                status
            FROM products
            WHERE status = 'Safety Verified'
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
                price_per_day,
                location,
                description,
                image_url,
                status
            FROM products
            WHERE id = ?
              AND status = 'Safety Verified'
            `,
            [id]
        );

        return rows[0] || null;
    }
};

export default Product;