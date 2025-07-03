# E-Commerce Backend (MERN Stack)

This is the backend for an e-commerce application built using **Node.js, Express.js, MongoDB, and JWT Authentication**. The API supports user authentication, product management, cart functionality, order processing, and product reviews.

## 📁 Project Structure
```
backend/
├── config/
│   ├── db.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   ├── Review.js
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   ├── reviewRoutes.js
├── middleware/
│   ├── authMiddleware.js
├── controllers/
│   ├── userController.js
│   ├── productController.js
│   ├── orderController.js
│   ├── reviewController.js
├── server.js
├── .env
├── package.json
```

## 🚀 Installation & Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-repo/ecommerce-backend.git
   cd ecommerce-backend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Start the server**
   ```sh
   npm start
   ```

## 🔹 API Routes

### 🔑 Authentication Routes
| Method | Route                | Description                  | Access  |
|--------|----------------------|------------------------------|---------|
| POST   | `/api/users/register` | Register a new user          | Public  |
| POST   | `/api/users/login`    | Login user & get token       | Public  |
| GET    | `/api/users/profile`  | Get user profile             | Private |
| PUT    | `/api/users/profile`  | Update user profile          | Private |

### 🛍️ Product Routes
| Method | Route                | Description                  | Access  |
|--------|----------------------|------------------------------|---------|
| GET    | `/api/products`       | Get all products             | Public  |
| GET    | `/api/products/:id`   | Get single product by ID     | Public  |
| POST   | `/api/products`       | Add a new product            | Admin   |
| PUT    | `/api/products/:id`   | Update product details       | Admin   |
| DELETE | `/api/products/:id`   | Remove a product             | Admin   |

### 🛒 Cart Routes
| Method | Route                | Description                  | Access  |
|--------|----------------------|------------------------------|---------|
| GET    | `/api/cart`           | Get user cart items          | Private |
| POST   | `/api/cart`           | Add item to cart             | Private |
| DELETE | `/api/cart/:id`       | Remove item from cart        | Private |

### 📦 Order Routes
| Method | Route                 | Description                      | Access  |
|--------|-----------------------|----------------------------------|---------|
| POST   | `/api/orders`          | Place a new order               | Private |
| GET    | `/api/orders/myorders` | Get logged-in user's orders     | Private |
| GET    | `/api/orders/:orderId` | Fetch a single order by ID      | Private |
| GET    | `/api/orders`          | Get all orders (Admin only)     | Admin   |
| PUT    | `/api/orders/:id`      | Update order status (Admin)     | Admin   |

### ⭐ Review Routes
| Method | Route                 | Description                  | Access  |
|--------|-----------------------|------------------------------|---------|
| GET    | `/api/reviews/:productId` | Get all reviews for a product | Public  |
| POST   | `/api/reviews/:productId` | Add a review for a product    | Private |

## 🔒 Authentication & Authorization
- Users must log in to access private routes.
- JWT authentication is used for securing APIs.
- Admin users have elevated privileges to manage products and orders.

## 🎯 Features
✅ User authentication (register, login, profile update)  
✅ Product management (CRUD operations)  
✅ Cart functionality (add, remove items)  
✅ Order management (place orders, track status)  
✅ Admin dashboard (manage products & orders)  
✅ Product reviews (add and view reviews)  

## 🛠️ Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt.js
- **Middleware:** Express, CORS, dotenv

## 📜 License
This project is open-source and available under the MIT License.
