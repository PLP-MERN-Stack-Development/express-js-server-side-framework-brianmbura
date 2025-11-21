require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const { logger } = require('./middleware/logger');
const { authMiddleware } = require('./middleware/auth');
const productRoutes = require('./routes/products');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Public route
app.get('/', (req, res) => {
  res.json({ message: 'Hello World — PLP Week 2 Express API' });
});

// Protected routes
app.use('/api', authMiddleware);

// Products routes
app.use('/api/products', productRoutes);

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
