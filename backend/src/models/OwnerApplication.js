import pool from '../config/db.js';

const OwnerApplication = {
    // One row per user. If they've already applied, this updates the
    // existing row and resets it back to 'pending' instead of creating
    // a duplicate (the unique_owner_application_user constraint would
    // reject a second INSERT anyway).
    async upsert(userId, fields) {
        const {
            fullName, email, phone,
            address, city, province, postalCode,
            bankName, accountHolder, accountNumber, accountType, branchCode
        } = fields;

        await pool.query(
            `INSERT INTO owner_applications (
                user_id, full_name, email, phone,
                address, city, province, postal_code,
                bank_name, account_holder, account_number, account_type, branch_code,
                status, reviewed_by, reviewed_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NULL, NULL)
            ON DUPLICATE KEY UPDATE
                full_name = VALUES(full_name),
                email = VALUES(email),
                phone = VALUES(phone),
                address = VALUES(address),
                city = VALUES(city),
                province = VALUES(province),
                postal_code = VALUES(postal_code),
                bank_name = VALUES(bank_name),
                account_holder = VALUES(account_holder),
                account_number = VALUES(account_number),
                account_type = VALUES(account_type),
                branch_code = VALUES(branch_code),
                status = 'pending',
                reviewed_by = NULL,
                reviewed_at = NULL`,
            [
                userId, fullName, email, phone,
                address, city, province, postalCode,
                bankName, accountHolder, accountNumber, accountType, branchCode
            ]
        );

        return this.findByUserId(userId);
    },

    async findById(id) {
        const [rows] = await pool.query(
            `SELECT id, user_id, full_name, email, phone, status,
                    created_at, updated_at, reviewed_at
             FROM owner_applications
             WHERE id = ?`,
            [id]
        );
        return rows[0] || null;
    },

    async findByUserId(userId) {
        const [rows] = await pool.query(
            `SELECT id, user_id, full_name, email, phone, status,
                    created_at, updated_at, reviewed_at
             FROM owner_applications
             WHERE user_id = ?`,
            [userId]
        );
        return rows[0] || null;
    },

    // Just the status — this is what login/register/me attach to the
    // user object, and it should never leak banking details.
    async findStatusByUserId(userId) {
        const [rows] = await pool.query(
            `SELECT status FROM owner_applications WHERE user_id = ?`,
            [userId]
        );
        return rows[0]?.status || null;
    },

    async findAll({ status } = {}) {
        let sql = `
            SELECT
                oa.id, oa.user_id, oa.full_name, oa.email, oa.phone,
                oa.city, oa.province, oa.status,
                oa.created_at, oa.reviewed_at
            FROM owner_applications oa
        `;
        const values = [];

        if (status) {
            sql += ' WHERE oa.status = ?';
            values.push(status);
        }

        sql += ' ORDER BY oa.created_at DESC';

        const [rows] = await pool.query(sql, values);
        return rows;
    },

    async updateStatus(id, status, reviewerId) {
        const [result] = await pool.query(
            `UPDATE owner_applications
             SET status = ?, reviewed_by = ?, reviewed_at = NOW()
             WHERE id = ?`,
            [status, reviewerId, id]
        );
        return result.affectedRows > 0;
    }
};

export default OwnerApplication;