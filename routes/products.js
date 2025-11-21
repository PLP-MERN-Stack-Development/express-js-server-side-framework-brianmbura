const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils/asyncHandler');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getStats
} = require('../controllers/productsController');
const { validateProduct } = require('../middleware/validators');

// GET /api/products/stats  (must be before :id)
router.get('/stats', asyncHandler(getStats));

// GET /api/products  (list with filtering, pagination, search)
router.get('/', asyncHandler(getProducts));

// GET /api/products/:id
router.get('/:id', asyncHandler(getProductById));

// POST /api/products
router.post('/', validateProduct, asyncHandler(createProduct));

// PUT /api/products/:id
router.put('/:id', validateProduct, asyncHandler(updateProduct));

// DELETE /api/products/:id
router.delete('/:id', asyncHandler(deleteProduct));

module.exports = router;
