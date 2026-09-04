import pool from '../config/db.js';

const User = {
    async create({ name, email, passwordHash, role }) {
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [name, email, passwordHash, role]
        );
        return { id: result.insertId, name, email, role };
    },

    async findByEmail(email) {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0] || null;
    },

    async findById(id) {
        const [rows] = await pool.query(
            'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
            [id]
        );
        return rows[0] || null;
    }
};

export default User;
