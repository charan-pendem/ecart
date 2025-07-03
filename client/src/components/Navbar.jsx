import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-[#0d1b2a] text-[#e0e1dd] p-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto relative">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-gray-100">
          ElectroCart
        </Link>

        {/* Centered Menu */}
        <div className="hidden md:flex gap-8 absolute left-1/2 transform -translate-x-1/2">
          <Link
            to="/cart"
            className="hover:text-gray-300 text-base font-medium"
          >
            🛒 My Cart
          </Link>
          <Link
            to="/orders"
            className="hover:text-gray-300 text-base font-medium"
          >
            📦 My Orders
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-white cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Right Section */}
        <div
          className={`flex-col md:flex-row md:flex items-center gap-4 absolute md:static top-16 left-0 w-full md:w-auto bg-[#0d1b2a] md:bg-transparent p-4 md:p-0 border-b md:border-none ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          {/* For mobile links */}
          <div className="flex flex-col md:hidden gap-4 w-full">
            <Link
              to="/cart"
              className="hover:text-gray-300 text-base font-medium"
              onClick={() => setMenuOpen(false)}
            >
              🛒 My Cart
            </Link>
            <Link
              to="/orders"
              className="hover:text-gray-300 text-base font-medium"
              onClick={() => setMenuOpen(false)}
            >
              📦 My Orders
            </Link>
          </div>

          {user ? (
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:ml-8">
              <div
                className="flex flex-col items-start md:items-end cursor-pointer"
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
              >
                <span className="font-semibold text-gray-300">{user.name}</span>
                <span className="text-gray-400 text-sm">{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition md:ml-6 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
