import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login", { replace: true }); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Link to="/admin/products" className="bg-blue-500 text-white p-4 rounded-lg shadow text-center hover:bg-blue-600">
          Manage Products
        </Link>
        <Link to="/admin/users" className="bg-green-500 text-white p-4 rounded-lg shadow text-center hover:bg-green-600">
          Manage Users
        </Link>
        <Link to="/admin/orders" className="bg-red-500 text-white p-4 rounded-lg shadow text-center hover:bg-red-600">
          Manage Orders
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
