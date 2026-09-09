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
    },

    // Stores a hash of the reset token (never the raw token) plus its
    // expiry, keyed by email. Called when a forgot-password request comes in.
    async setResetToken(email, tokenHash, expiresAt) {
        await pool.query(
            'UPDATE users SET reset_token_hash = ?, reset_token_expires = ? WHERE email = ?',
            [tokenHash, expiresAt, email]
        );
    },

    // Looks a user up by the hash of the token from the reset link, and
    // only if it hasn't expired yet.
    async findByValidResetTokenHash(tokenHash) {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE reset_token_hash = ? AND reset_token_expires > NOW()',
            [tokenHash]
        );
        return rows[0] || null;
    },

    // Sets the new password and clears the reset token so it can't be reused.
    async updatePasswordAndClearResetToken(id, passwordHash) {
        await pool.query(
            'UPDATE users SET password_hash = ?, reset_token_hash = NULL, reset_token_expires = NULL WHERE id = ?',
            [passwordHash, id]
        );
    }
};

export default User;
