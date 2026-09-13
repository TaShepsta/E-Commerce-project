function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const statusCode =
    res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : err.status || 500;

  res.status(statusCode).json({
    message: err.message || "Internal server error.",
  });
}

export { notFound };
export default errorHandler;
