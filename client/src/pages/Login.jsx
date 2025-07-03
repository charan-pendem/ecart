import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User does not exist. Please register first.");
        }
        throw new Error(data.message || "Login failed");
      }
      
      await onLogin(data.token);
      toast.success("Logged in successfully!");
      
      navigate(data.isAdmin ? "/admin" : "/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1b263b]">
      <form className="bg-[#e0e1dd] p-6 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
          className="w-full p-2 mb-3 border rounded"
          onChange={handleChange}
          required
        />
        <button className="w-full bg-green-500 text-white p-2 rounded cursor-pointer">Login</button>
        <p className="mt-2 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;