// src/pages/Product.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}https://ecart-nv2f.onrender.com/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch(() => toast.error("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL} https://ecart-nv2f.onrender.com/api/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load reviews"));
  }, [id]);

  const handleAddToCart = async (quantity = 1) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL} https://ecart-nv2f.onrender.com/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: id, quantity }),
      });

      if (response.ok) {
        toast.success("Item added to cart!");
      } else {
        toast.error("Failed to add item to cart.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart(1);
    navigate("/cart");
  };

  if (loading) return <p className="text-center">Loading product...</p>;

  if (!product) return <p className="text-center text-red-500">Product not found.</p>;

  return (
    <div className="min-h-screen bg-[#1b263b] p-6 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <img src={product.image} alt={product.name} className="w-full h-96 object-contain mb-4 rounded-lg" />
          <h2 className="text-3xl font-bold mb-2 text-[#e0e1dd]">{product.name}</h2>
          <p className="text-white mb-2">{product.description}</p>
          <p className="text-xl font-bold text-blue-600">₹{product.price.toLocaleString("en-IN")}</p>
          <p className="text-sm text-[#e0e1dd]">Category: {product.category}</p>
          <p className="text-sm text-[#e0e1dd]">Stock: {product.stock > 0 ? product.stock : "Out of stock"}</p>

          <div className="mt-4 flex space-x-4">
            <button onClick={handleBuyNow} className="bg-green-500 text-white px-4 py-2 rounded">
              Buy Now
            </button>
            <button onClick={() => handleAddToCart(1)} className="bg-yellow-500 text-white px-4 py-2 rounded">
              Add to Cart
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-[#e0e1dd] p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Reviews</h3>
          <div className="mt-2">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="py-2 border-b">
                  <p className="font-semibold">{review.user?.name || "Anonymous"}</p>
                  <p className="text-sm">{review.comment || "No comment"}</p>
                  <p className="text-yellow-500">
                    {"★".repeat(review.rating || 0)}
                    {"☆".repeat(5 - (review.rating || 0))}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
