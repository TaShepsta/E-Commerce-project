import pool from "../config/db.js";

const listingFields = `
  id,
  owner_id AS ownerId,
  item_name AS name,
  description,
  category,
  rental_price AS price,
  price_unit AS priceUnit,
  status,
  image_url AS image,
  image_alt AS imageAlt,
  created_at AS createdAt
`;

export async function getListings(ownerId) {
  const [rows] = await pool.query(
    `SELECT ${listingFields} FROM listings WHERE owner_id = ? ORDER BY created_at DESC`,
    [ownerId],
  );
  return rows;
}

export async function getListingById(id, ownerId) {
  const [rows] = await pool.query(
    `SELECT ${listingFields} FROM listings WHERE id = ? AND owner_id = ?`,
    [id, ownerId],
  );
  return rows[0] || null;
}

export async function createListing(listing, ownerId) {
  const [result] = await pool.execute(
    `INSERT INTO listings
      (owner_id, item_name, description, category, rental_price, price_unit, status, image_url, image_alt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      ownerId,
      listing.name,
      listing.description || null,
      listing.category,
      listing.price,
      listing.priceUnit || "day",
      listing.status || "Available",
      listing.image || null,
      listing.imageAlt || null,
    ],
  );
  return getListingById(result.insertId, ownerId);
}

export async function updateListing(id, listing, ownerId) {
  const [result] = await pool.execute(
    `UPDATE listings
     SET item_name = ?, description = ?, category = ?, rental_price = ?,
         price_unit = ?, status = ?, image_url = ?, image_alt = ?
     WHERE id = ? AND owner_id = ?`,
    [
      listing.name,
      listing.description || null,
      listing.category,
      listing.price,
      listing.priceUnit || "day",
      listing.status || "Available",
      listing.image || null,
      listing.imageAlt || null,
      id,
      ownerId,
    ],
  );
  return result.affectedRows ? getListingById(id, ownerId) : null;
}

export async function deleteListing(id, ownerId) {
  const [result] = await pool.execute(
    "DELETE FROM listings WHERE id = ? AND owner_id = ?",
    [id, ownerId],
  );
  return result.affectedRows > 0;
}
