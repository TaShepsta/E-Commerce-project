import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Quick sanity check on startup so connection issues fail loudly.
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('MySQL connected successfully.');
        connection.release();
    } catch (err) {
        console.error('MySQL connection failed:', err.message);
    }
})();

export default pool;
