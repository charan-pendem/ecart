# E-Commerce Frontend

This is the **frontend** of an E-commerce application built using **React.js**. It provides a user-friendly interface for customers to browse products, manage their cart, place orders, and more. It also includes an admin dashboard for managing products, users, and orders.

---

## 🚀 Features

### User Features

- **Home Page**: Browse products with search, category, and price filters.
- **Product Details**: View detailed information about a product.
- **Cart Management**: Add, update, or remove items from the cart.
- **User Authentication**: Login and register functionality.
- **Profile Management**: Update user profile and address.
- **Order Management**: View and manage past orders.
- **Payment**: Place orders with payment options.

### Admin Features

- **Admin Dashboard**: Access to manage the application.
- **Manage Products**: Add, update, or delete products.
- **Manage Users**: View and delete users.
- **Manage Orders**: Update the status of orders.

---

## 🛠️ Tech Stack

- **React.js**: Frontend framework.
- **React Router**: For navigation and routing.
- **Tailwind CSS**: For styling.
- **Toastify**: For notifications.
- **LocalStorage**: For storing user tokens.

---

## 📁 Folder Structure

```
client/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── ManageOrders.jsx
│   │   ├── ManageProducts.jsx
│   │   └── ManageUsers.jsx
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── HeaderSection.jsx
│   │   ├── Layout.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Cart.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Order.jsx
│   │   ├── Payment.jsx
│   │   ├── Product.jsx
│   │   ├── ProfilePage.jsx
│   │   └── Register.jsx
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

---

## ⚙️ Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/e-commerce-frontend.git
   cd e-commerce-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

4. **Open the application in your browser:**
   ```
   http://localhost:3000
   ```

---

## 🏗️ Key Components

- **`HeaderSection.jsx`** - Provides search, category, and price filters for products.
- **`Navbar.jsx`** - Displays navigation links and user account options.
- **`Footer.jsx`** - Displays the footer with copyright information.
- **`AdminDashboard.jsx`** - Admin panel for managing products, users, and orders.
- **`Home.jsx`** - Displays the list of products with filtering options.
- **`Cart.jsx`** - Allows users to view and manage their cart items.
- **`Login.jsx` & `Register.jsx`** - Handles user authentication.
- **`ProfilePage.jsx`** - Allows users to update their profile and address.
- **`Payment.jsx`** - Handles order placement and payment options.

---

## 📜 License

This project is licensed under the **MIT License**.
