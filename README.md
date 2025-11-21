# PLP MERN Stack — Week 2: Express.js REST API

This project contains my Week 2 assignment for the PLP MERN Stack Program.  
It implements a fully functional RESTful API using Express.js, including routing, middleware, validation, authentication, and error handling.

---

## 🚀 Features Implemented

- Express.js server with routing
- CRUD operations for `products`
- Request logging middleware
- Authentication using `x-api-key`
- Validation middleware for POST/PUT
- Global error handling middleware
- Async wrapper for safe async operations
- Pagination, search & category filtering
- Product statistics endpoint
- Environment variable support via `dotenv`

---

## 📂 Project Structure

wk2-express/
│ server.js
│ package.json
│ package-lock.json
│ .env
│ .env.example
│ README.md
│
├── controllers/
│ productsController.js
│
├── middleware/
│ logger.js
│ auth.js
│ validators.js
│ errorHandler.js
│
├── errors/
│ customErrors.js
│
├── routes/
│ products.js
│
└── utils/
asyncHandler.js

yaml
Copy code

---

## 🛠️ Installation & Setup

### 1️⃣ Install Dependencies

```bash
npm install
2️⃣ Configure Environment Variables
Copy .env.example → .env:

ini
Copy code
PORT=3000
API_KEY=mysecret123
3️⃣ Start the Server
Using Node:

bash
Copy code
node server.js
Or using nodemon:

bash
Copy code
npm run dev
Expected console output:

arduino
Copy code
Server running on port 3000
📘 API Documentation
🔐 Authentication
All /api/* routes require:

makefile
Copy code
x-api-key: mysecret123
🟦 PUBLIC ROUTE
GET /
Returns a simple server status message.

Example
nginx
Copy code
GET http://localhost:3000/
Response
json
Copy code
{
  "message": "Hello World — PLP Week 2 Express API"
}
🟩 PRODUCT ROUTES (Protected)
1️⃣ GET /api/products
List all products with pagination, search, and filtering.

Query Parameters
Parameter	Description	Example
page	Page number	?page=2
perPage	Items per page	?perPage=5
category	Filter by category	?category=electronics
search	Search by name	?search=mouse

Example Request (CMD)
bash
Copy code
curl -H "x-api-key: mysecret123" http://localhost:3000/api/products
Example Response
json
Copy code
{
  "total": 10,
  "page": 1,
  "perPage": 10,
  "data": [...]
}
2️⃣ POST /api/products
Create a new product.

Headers
less
Copy code
Content-Type: application/json
x-api-key: mysecret123
Request Body
json
Copy code
{
  "name": "Camera",
  "description": "DSLR camera",
  "price": 2000,
  "category": "electronics",
  "inStock": true
}
Example (CMD)
bash
Copy code
curl -X POST ^
-H "Content-Type: application/json" ^
-H "x-api-key: mysecret123" ^
-d "{\"name\":\"Camera\",\"description\":\"DSLR\",\"price\":2000,\"category\":\"electronics\",\"inStock\":true}" ^
http://localhost:3000/api/products
Response
json
Copy code
{
  "id": "generated-uuid",
  "name": "Camera",
  "description": "DSLR camera",
  "price": 2000,
  "category": "electronics",
  "inStock": true
}
3️⃣ GET /api/products/:id
Get a single product by ID.

Example
bash
Copy code
curl -H "x-api-key: mysecret123" http://localhost:3000/api/products/<id>
Not Found Response
json
Copy code
{
  "error": "NotFoundError",
  "message": "Product not found"
}
4️⃣ PUT /api/products/:id
Update an existing product.

Request Body
json
Copy code
{
  "price": 2500,
  "inStock": false
}
Response
json
Copy code
{
  "id": "existing-uuid",
  "name": "Camera",
  "price": 2500,
  "category": "electronics",
  "inStock": false
}
5️⃣ DELETE /api/products/:id
Delete a product.

Example
bash
Copy code
curl -X DELETE -H "x-api-key: mysecret123" http://localhost:3000/api/products/<id>
Response
json
Copy code
{
  "deleted": true,
  "product": { "id": "<id>" }
}
6️⃣ GET /api/products/stats
Returns grouped statistics.

Example
bash
Copy code
curl -H "x-api-key: mysecret123" http://localhost:3000/api/products/stats
Response
json
Copy code
{
  "total": 10,
  "categories": {
    "electronics": 3,
    "sports": 2,
    "home": 2,
    "stationery": 2,
    "furniture": 1
  }
}
🧩 Error Handling
All errors use a consistent JSON format.

Example Validation Error
json
Copy code
{
  "error": "ValidationError",
  "message": "name is required"
}
Example Authentication Error
json
Copy code
{
  "error": "AuthError",
  "message": "Invalid or missing API key"
}
