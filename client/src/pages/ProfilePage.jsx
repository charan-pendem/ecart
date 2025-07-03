import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL} https://ecart-nv2f.onrender.com/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          name: data.name || "",
          email: data.email || "",
          password: "",
          mobile: data.mobile || "",
          address: {
            street: data.address?.street || "",
            city: data.address?.city || "",
            state: data.address?.state || "",
            zipCode: data.address?.zipCode || "",
            country: data.address?.country || "",
          },
        });
      })
      .catch(() => toast.error("Failed to fetch profile data"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in profile.address) {
      setProfile((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL} https://ecart-nv2f.onrender.com/api/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      .catch(() => {
        toast.error("Failed to update profile.");
      });
  };

  return (
    <div className="min-h-screen bg-[#1b263b] flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-[#e0e1dd] p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

        <div className="mb-4 text-[#0d1b2a]">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value="********"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={profile.mobile}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-3">Address</h3>

        <div className="mb-3">
          <label className="block mb-1">Street</label>
          <input
            type="text"
            name="street"
            value={profile.address.street}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label className="block mb-1">City</label>
            <input
              type="text"
              name="city"
              value={profile.address.city}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">State</label>
            <input
              type="text"
              name="state"
              value={profile.address.state}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label className="block mb-1">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={profile.address.zipCode}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={profile.address.country}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
