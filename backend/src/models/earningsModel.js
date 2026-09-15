import pool from "../config/db.js";

export async function getEarnings(ownerId) {
  const [[summary]] = await pool.query(
    `SELECT
       COALESCE(
         SUM(
           CASE
             WHEN status IN ('Completed', 'Paid') THEN amount
             ELSE 0
           END
         ),
         0
       ) AS total,

       COALESCE(
         SUM(
           CASE
             WHEN status IN ('Completed', 'Paid')
              AND rental_date >= DATE_FORMAT(CURRENT_DATE, '%Y-%m-01')
             THEN amount
             ELSE 0
           END
         ),
         0
       ) AS month,

       COUNT(
         CASE
           WHEN status IN ('Completed', 'Paid') THEN 1
         END
       ) AS rentals,

       COALESCE(
         SUM(
           CASE
             WHEN status = 'Paid' THEN amount
             ELSE 0
           END
         ),
         0
       ) AS available

     FROM rental_earnings
     WHERE owner_id = ?`,
    [ownerId],
  );

  const [monthlyRows] = await pool.query(
    `SELECT
       DATE_FORMAT(rental_date, '%b') AS label,
       SUM(amount) AS amount
     FROM rental_earnings
     WHERE owner_id = ?
       AND status IN ('Completed', 'Paid')
     GROUP BY
       YEAR(rental_date),
       MONTH(rental_date),
       DATE_FORMAT(rental_date, '%b')
     ORDER BY
       YEAR(rental_date),
       MONTH(rental_date)`,
    [ownerId],
  );

  const [history] = await pool.query(
    `SELECT
       id,
       description,
       DATE_FORMAT(rental_date, '%d %b %Y') AS date,
       status,
       amount
     FROM rental_earnings
     WHERE owner_id = ?
     ORDER BY rental_date DESC, id DESC`,
    [ownerId],
  );

  return {
    summary: {
      total: Number(summary.total || 0),
      month: Number(summary.month || 0),
      rentals: Number(summary.rentals || 0),
      available: Number(summary.available || 0),
      nextPayout: null,
    },

    monthlyEarnings: monthlyRows.map((row) => ({
      label: row.label,
      amount: Number(row.amount || 0),
    })),

    history: history.map((row) => ({
      id: row.id,
      description: row.description,
      date: row.date,
      status: row.status,
      amount: Number(row.amount || 0),
    })),
  };
}
