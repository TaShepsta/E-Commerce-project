const allowedStatuses = new Set(["Available", "Paused"]);

export function validateListing(req, res, next) {
  const { name, category, price, status } = req.body || {};
  const errors = [];

  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push("name is required");
  }

  if (!category || typeof category !== "string" || !category.trim()) {
    errors.push("category is required");
  }

  if (
    price === undefined ||
    price === null ||
    !Number.isFinite(Number(price)) ||
    Number(price) < 0
  ) {
    errors.push("price must be a positive number");
  }

  if (status !== undefined && !allowedStatuses.has(status)) {
    errors.push("status must be Available or Paused");
  }

  if (errors.length) {
    return res.status(400).json({
      message: "Please check the listing details.",
      errors,
    });
  }

  next();
}
