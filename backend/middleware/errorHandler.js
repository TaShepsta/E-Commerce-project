export function notFound(req, res) {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(error, req, res, next) {
  console.error(error);

  const isDatabaseError =
    error.code?.startsWith("ECONN") || error.code?.startsWith("ER_");

  res.status(error.status || 500).json({
    message: isDatabaseError
      ? "The backend is running, but it cannot connect to MySQL. Check backend/.env and make sure MySQL is running."
      : "Internal server error",
  });
}
