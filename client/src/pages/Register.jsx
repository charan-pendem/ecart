import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://ecart-nv2f.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      toast.success("Registration successful! Please log in.");
    } catch (err) {
      console.error("Registration Error:", err);
      toast.error(err.message || "Something went wrong during registration.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1b263b]">
      <form className="bg-[#e0e1dd] p-6 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center text-[#1b263b]">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 mb-3 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
          required
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer">
          Register
        </button>
        <p className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
