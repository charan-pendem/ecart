import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import AdminDashboard from "./admin/AdminDashboard";
import ManageProducts from "./admin/ManageProducts";
import ManageUsers from "./admin/ManageUsers";
import ManageOrders from "./admin/ManageOrders";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to Fetch User Data
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await fetch(`https://ecart-nv2f.onrender.com/api/users/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data);
          setIsAdmin(data.isAdmin);
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
        setIsAdmin(false);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
    setLoading(false);
  }, []);

  // Function to Handle Login
  const handleLogin = async (token) => {
    localStorage.setItem("token", token); // Store token
    await fetchUserData(); // Fetch user data immediately
  };

  // Function to Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setUser(null); // Clear user state
    setIsAdmin(false); // Reset admin status
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <Router>
      <Toaster position="top-right" />
      {isAdmin ? (
        // Admin Routes (No Navbar)
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      ) : (
        // User Routes (With Navbar)
        <Layout user={user} onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/admin/*" element={<Navigate to="/" />} /> {/* Redirect non-admins */}
          </Routes>
        </Layout>
      )}
    </Router>
  );
}

export default App;
