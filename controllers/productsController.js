const { v4: uuidv4 } = require('uuid');
const { NotFoundError } = require('../errors/customErrors');

// In-memory product store (seeded)
let products = [
  { id: uuidv4(), name: "Wireless Mouse", description: "Ergonomic mouse", price: 25.99, category: "electronics", inStock: true },
  { id: uuidv4(), name: "Gaming Keyboard", description: "Mechanical RGB", price: 79.99, category: "electronics", inStock: true },
  { id: uuidv4(), name: "Water Bottle", description: "Stainless steel 1L", price: 15.0, category: "home", inStock: true },
  { id: uuidv4(), name: "Running Shoes", description: "Lightweight shoes", price: 60.0, category: "sports", inStock: false },
  { id: uuidv4(), name: "Notebook", description: "A5 ruled notebook", price: 3.5, category: "stationery", inStock: true },
  { id: uuidv4(), name: "Noise Cancelling Headphones", description: "Over-ear", price: 129.99, category: "electronics", inStock: true },
  { id: uuidv4(), name: "Office Chair", description: "Comfortable mesh", price: 150.0, category: "furniture", inStock: true },
  { id: uuidv4(), name: "Coffee Mug", description: "Ceramic 350ml", price: 7.5, category: "home", inStock: true },
  { id: uuidv4(), name: "Yoga Mat", description: "Non-slip", price: 20.0, category: "sports", inStock: true },
  { id: uuidv4(), name: "Pen Set", description: "Pack of 10 gel pens", price: 5.0, category: "stationery", inStock: true }
];

// Helper: apply filters, search, sort, paginate
function applyQueryOptions(list, { category, q, sort, page, limit }) {
  let result = list;

  if (category) {
    result = result.filter(p => p.category === category);
  }

  if (q) {
    const qlower = q.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(qlower));
  }

  // Sorting by price: sort=price_asc or price_desc
  if (sort === 'price_asc') result = result.sort((a,b)=> a.price - b.price);
  if (sort === 'price_desc') result = result.sort((a,b)=> b.price - a.price);

  // Pagination
  const pageNum = Math.max(parseInt(page) || 1, 1);
  const perPage = Math.max(parseInt(limit) || 10, 1);
  const start = (pageNum - 1) * perPage;
  const paged = result.slice(start, start + perPage);

  return { total: result.length, page: pageNum, perPage, data: paged };
}

exports.getProducts = async (req, res) => {
  const { category, q, sort, page, limit } = req.query;
  const { total, page: p, perPage, data } = applyQueryOptions(products, { category, q, sort, page, limit });
  res.json({ total, page: p, perPage, data });
};

exports.getProductById = async (req, res) => {
  const id = req.params.id;
  const product = products.find(p => p.id === id);
  if (!product) throw new NotFoundError('Product not found');
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const body = req.body;
  const newProduct = {
    id: uuidv4(),
    name: body.name,
    description: body.description || '',
    price: body.price,
    category: body.category,
    inStock: !!body.inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) throw new NotFoundError('Product not found');
  const body = req.body;
  products[idx] = {
    ...products[idx],
    name: body.name,
    description: body.description || products[idx].description,
    price: body.price,
    category: body.category,
    inStock: !!body.inStock
  };
  res.json(products[idx]);
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) throw new NotFoundError('Product not found');
  const removed = products.splice(idx, 1)[0];
  res.json({ deleted: true, product: removed });
};

exports.getStats = async (req, res) => {
  const counts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  res.json({ totalProducts: products.length, counts });
};
