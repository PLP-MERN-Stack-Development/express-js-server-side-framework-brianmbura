// global error handler
function errorHandler(err, req, res, next) {
  console.error(err);

  // custom shape
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.name, message: err.message });
  }

  // default to 500
  res.status(500).json({ error: 'InternalServerError', message: err.message || 'An error occurred' });
}

module.exports = { errorHandler };
