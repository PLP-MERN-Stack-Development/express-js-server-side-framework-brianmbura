const { AuthError } = require('../errors/customErrors');

function authMiddleware(req, res, next) {
  // Check header x-api-key
  const apiKey = req.header('x-api-key');
  const expected = process.env.API_KEY || 'replace_with_a_secret_api_key';
  if (!apiKey || apiKey !== expected) {
    throw new AuthError('Invalid or missing API key');
  }
  next();
}

module.exports = { authMiddleware };
