import pool from "../config/db.js";

const fallbackImage =
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80";

const listingFields = `
  id,
  owner_id AS ownerId,
  item_name AS name,
  description,
  category,
  rental_price AS price,
  price_unit AS priceUnit,
  status,
  CASE
    WHEN image_data IS NOT NULL THEN CONCAT('/api/listings/', id, '/image')
    WHEN image_url IS NOT NULL THEN image_url
    ELSE '${fallbackImage}'
  END AS image,
  image_alt AS imageAlt,
  created_at AS createdAt
`;

function normalizeListing(listing) {
  return {
    ...listing,
    image: listing.image || fallbackImage,
  };
}

export async function getListings(ownerId) {
  const [rows] = await pool.query(
    `SELECT ${listingFields} FROM listings WHERE owner_id = ? ORDER BY created_at DESC`,
    [ownerId],
  );
  return rows.map(normalizeListing);
}

export async function getListingById(id, ownerId) {
  const [rows] = await pool.query(
    `SELECT ${listingFields} FROM listings WHERE id = ? AND owner_id = ?`,
    [id, ownerId],
  );
  return rows[0] ? normalizeListing(rows[0]) : null;
}

export async function createListing(listing, ownerId) {
  const [result] = await pool.execute(
    `INSERT INTO listings
      (owner_id, item_name, description, category, rental_price, price_unit, status, image_url, image_data, image_mime_type, image_alt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      ownerId,
      listing.name,
      listing.description || null,
      listing.category,
      listing.price,
      listing.priceUnit || "day",
      listing.status || "Available",
      listing.imageUrl || null,
      listing.file?.buffer || null,
      listing.file?.mimetype || null,
      listing.imageAlt || null,
    ],
  );

  return getListingById(result.insertId, ownerId);
}

export async function updateListing(id, listing, ownerId) {
  const hasImage = Boolean(listing.file && listing.file.buffer);

  const queryParts = [
    "item_name = ?",
    "description = ?",
    "category = ?",
    "rental_price = ?",
    "price_unit = ?",
    "status = ?",
    "image_alt = ?",
  ];

  const params = [
    listing.name,
    listing.description || null,
    listing.category,
    listing.price,
    listing.priceUnit || "day",
    listing.status || "Available",
    listing.imageAlt || null,
  ];

  if (hasImage) {
    queryParts.push(
      "image_data = ?",
      "image_mime_type = ?",
      "image_url = NULL",
    );
    params.push(listing.file.buffer, listing.file.mimetype);
  }

  const [result] = await pool.execute(
    `UPDATE listings
     SET ${queryParts.join(", ")}
     WHERE id = ? AND owner_id = ?`,
    [...params, id, ownerId],
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
