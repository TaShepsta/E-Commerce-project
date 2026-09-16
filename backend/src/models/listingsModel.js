import pool from "../config/db.js";

const fallbackImage =
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80";

const listingFields = `
  id,
  owner_id AS ownerId,
  title AS name,
  description,
  category,
  daily_price AS price,
  weekly_price AS weeklyPrice,
  monthly_price AS monthlyPrice,
  price_unit AS priceUnit,
  location,
  status,
  CASE
    WHEN image_data IS NOT NULL THEN CONCAT('/api/listings/', id, '/image')
    WHEN image_url IS NOT NULL AND image_url <> '' THEN image_url
    ELSE '${fallbackImage}'
  END AS image,
  image_alt AS imageAlt,
  created_at AS createdAt,
  updated_at AS updatedAt
`;

function normalizeListing(listing) {
  return {
    ...listing,
    price: Number(listing.price),
    weeklyPrice:
      listing.weeklyPrice === null ? null : Number(listing.weeklyPrice),
    monthlyPrice:
      listing.monthlyPrice === null ? null : Number(listing.monthlyPrice),
    image: listing.image || fallbackImage,
  };
}

export async function getPublicListings({ category, location } = {}) {
  const conditions = ["status IN ('Available', 'approved')"];
  const params = [];

  if (category) {
    conditions.push("category = ?");
    params.push(category);
  }

  if (location) {
    conditions.push("location LIKE ?");
    params.push(`%${location}%`);
  }

  const [rows] = await pool.query(
    `SELECT ${listingFields}
     FROM listings
     WHERE ${conditions.join(" AND ")}
     ORDER BY created_at DESC`,
    params,
  );

  return rows.map(normalizeListing);
}

export async function getPublicListingById(id) {
  const [rows] = await pool.query(
    `SELECT ${listingFields}
     FROM listings
     WHERE id = ? AND status IN ('Available', 'approved')
     LIMIT 1`,
    [id],
  );

  return rows[0] ? normalizeListing(rows[0]) : null;
}

export async function getOwnerListings(ownerId) {
  const [rows] = await pool.query(
    `SELECT ${listingFields}
     FROM listings
     WHERE owner_id = ?
     ORDER BY created_at DESC`,
    [ownerId],
  );

  return rows.map(normalizeListing);
}

export async function getOwnerListingById(id, ownerId) {
  const [rows] = await pool.query(
    `SELECT ${listingFields}
     FROM listings
     WHERE id = ? AND owner_id = ?`,
    [id, ownerId],
  );

  return rows[0] ? normalizeListing(rows[0]) : null;
}

export async function createOwnerListing(listing, ownerId) {
  const [result] = await pool.execute(
    `INSERT INTO listings
      (
        owner_id,
        title,
        description,
        category,
        daily_price,
        weekly_price,
        monthly_price,
        price_unit,
        location,
        image_url,
        image_data,
        image_mime_type,
        image_alt,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      ownerId,
      listing.name.trim(),
      listing.description?.trim() || null,
      listing.category.trim(),
      Number(listing.price),
      listing.weeklyPrice ? Number(listing.weeklyPrice) : null,
      listing.monthlyPrice ? Number(listing.monthlyPrice) : null,
      listing.priceUnit || "day",
      listing.location?.trim() || null,
      listing.imageUrl || null,
      listing.file?.buffer || null,
      listing.file?.mimetype || null,
      listing.imageAlt?.trim() || listing.name.trim(),
      listing.status || "Available",
    ],
  );

  return getOwnerListingById(result.insertId, ownerId);
}

export async function updateOwnerListing(id, listing, ownerId) {
  const queryParts = [];
  const params = [];

  if (listing.name !== undefined) {
    queryParts.push("title = ?");
    params.push(listing.name.trim());
  }

  if (listing.description !== undefined) {
    queryParts.push("description = ?");
    params.push(listing.description?.trim() || null);
  }

  if (listing.category !== undefined) {
    queryParts.push("category = ?");
    params.push(listing.category.trim());
  }

  if (listing.price !== undefined) {
    queryParts.push("daily_price = ?");
    params.push(Number(listing.price));
  }

  if (listing.priceUnit !== undefined) {
    queryParts.push("price_unit = ?");
    params.push(listing.priceUnit);
  }

  if (listing.location !== undefined) {
    queryParts.push("location = ?");
    params.push(listing.location?.trim() || null);
  }

  if (listing.status !== undefined) {
    queryParts.push("status = ?");
    params.push(listing.status);
  }

  if (listing.imageAlt !== undefined || listing.name !== undefined) {
    queryParts.push("image_alt = ?");
    params.push(listing.imageAlt?.trim() || listing.name?.trim() || null);
  }

  if (listing.file?.buffer) {
    queryParts.push("image_data = ?", "image_mime_type = ?", "image_url = NULL");
    params.push(listing.file.buffer, listing.file.mimetype);
  }

  if (queryParts.length === 0) {
    return getOwnerListingById(id, ownerId);
  }

  const ownershipClause = ownerId === null ? "id = ?" : "id = ? AND owner_id = ?";
  const ownershipParams = ownerId === null ? [id] : [id, ownerId];

  const [result] = await pool.execute(
    `UPDATE listings
     SET ${queryParts.join(", ")}
     WHERE ${ownershipClause}`,
    [...params, ...ownershipParams],
  );

  if (!result.affectedRows) return null;

  if (ownerId === null) {
    const [rows] = await pool.query(
      `SELECT ${listingFields} FROM listings WHERE id = ?`,
      [id],
    );
    return rows[0] ? normalizeListing(rows[0]) : null;
  }

  return getOwnerListingById(id, ownerId);
}

export async function deleteOwnerListing(id, ownerId) {
  const [result] = await pool.execute(
    "DELETE FROM listings WHERE id = ? AND owner_id = ?",
    [id, ownerId],
  );

  return result.affectedRows > 0;
}

export async function getListingImage(id) {
  const [rows] = await pool.query(
    "SELECT image_data, image_mime_type FROM listings WHERE id = ?",
    [id],
  );

  return rows[0] || null;
}
