const { ValidationError } = require('../errors/customErrors');

function validateProduct(req, res, next) {
  const body = req.body;
  const errors = [];

  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    errors.push('name is required (min 2 chars)');
  }
  if (typeof body.price !== 'number' || Number.isNaN(body.price) || body.price < 0) {
    errors.push('price is required and must be a non-negative number');
  }
  if (!body.category || typeof body.category !== 'string') {
    errors.push('category is required');
  }
  if (typeof body.inStock !== 'boolean' && typeof body.inStock !== 'undefined') {
    errors.push('inStock must be a boolean when provided');
  }

  if (errors.length) {
    throw new ValidationError(errors.join('; '));
  }
  next();
}

module.exports = { validateProduct };
