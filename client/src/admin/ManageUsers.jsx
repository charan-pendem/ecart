import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  let loggedInUserId = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      loggedInUserId = decodedToken._id || decodedToken.id;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.filter((user) => user._id !== loggedInUserId));
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [token]);

  const handleDeleteUser = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Manage Users</h2>
      
      <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 max-h-[500px] overflow-auto">
        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found</p>
        ) : (
          users.map((user) => (
            <div 
              key={user._id} 
              className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-3 rounded-lg mb-3 shadow-sm"
            >
              <span className="text-gray-800 text-sm md:text-base">{user.name} - {user.email}</span>
              <button 
                onClick={() => handleDeleteUser(user._id)} 
                className="bg-red-500 text-white text-sm md:text-base px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
