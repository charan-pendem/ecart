// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, [token]);

  // Fetch Cart Items
  const fetchCartItems = () => {
    if (!token) {
      toast.error("Please log in to view your cart.");
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL} https://ecart-nv2f.onrender.com/api/cart`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch cart items.");
        return response.json();
      })
      .then((data) => {
        setCartItems(data.items || []);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  // Delete a single item from the cart
  const handleDeleteItem = (itemId) => {
    fetch(`${import.meta.env.VITE_API_URL} https://ecart-nv2f.onrender.com/api/cart/${itemId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete item.");
        return response.json();
      })
      .then(() => {
        setCartItems(cartItems.filter((item) => item._id !== itemId));
        toast.success("Item removed from cart.");
      })
      .catch((err) => toast.error(err.message));
  };

  // Clear all cart items
  const handleClearCart = () => {
    fetch(`${import.meta.env.VITE_API_URL} https://ecart-nv2f.onrender.com/api/cart`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to clear cart.");
        return response.json();
      })
      .then(() => {
        setCartItems([]);
        toast.success("Cart cleared.");
      })
      .catch((err) => toast.error(err.message));
  };

  // Navigate to Payment Page
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-[#1b263b] p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#e0e1dd]">Shopping Cart</h2>

      <div className="bg-[#e0e1dd] p-4 rounded-lg shadow-md max-w-3xl mx-auto">
        {loading ? (
          <p className="text-center">Loading cart...</p>
        ) : cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center border-b p-4 justify-between">
                <div className="flex items-center">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-contain mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                    <p className="text-gray-700">₹{item.product.price.toLocaleString("en-IN")} x {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteItem(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              onClick={handleClearCart}
              className="bg-red-600 text-white px-4 py-2 mt-4 rounded w-full hover:bg-red-700"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-4 py-2 mt-4 rounded w-full hover:bg-green-600"
            >
              Checkout
            </button>
          </>
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}

        <div className="text-center mt-4">
          <Link to="/" className="text-blue-500">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
