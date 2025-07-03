import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: 5, text: "" });
  const [reviewedProductIds, setReviewedProductIds] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/orders/myorders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const sortedOrders = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
      })
      .catch(() => toast.error("Failed to fetch orders."));
  };

  const handleReviewSubmit = (productId) => {
    if (!reviewData.text || reviewData.rating < 1 || reviewData.rating > 5) {
      toast.error("Please provide valid rating and review text.");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/reviews/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rating: reviewData.rating,
        comment: reviewData.text,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Review submitted successfully!");
        setShowReviewForm(null);
        setReviewData({ rating: 5, text: "" });
        setReviewedProductIds((prev) => [...prev, productId]);
      })
      .catch(() => toast.error("Failed to submit review."));
  };

  return (
    <div className="min-h-screen bg-[#1b263b] p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#e0e1dd]">My Orders</h2>

      <div className="bg-[#e0e1dd] p-4 rounded-lg shadow-md max-w-3xl mx-auto">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="border-b p-4">
              <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
              <p className="text-gray-800">Total: ₹{order.totalAmount.toLocaleString("en-IN")}</p>
              <p className="text-gray-800">Status: {order.status}</p>
              <p className="text-gray-800 text-sm">
                Ordered on: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              {order.products.map((item) => (
                <div
                  key={item.product._id}
                  className="mt-4 p-3 bg-gray-100 rounded flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-semibold">{item.product.name}</h4>
                    <p className="text-gray-700">
                      ₹{item.product.price.toLocaleString("en-IN")} x {item.quantity}
                    </p>
                  </div>

                  {order.status === "Delivered" && (
                    <div>
                      {reviewedProductIds.includes(item.product._id) ? (
                        <button
                          disabled
                          className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                        >
                          Reviewed
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowReviewForm(item.product._id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Write a Review
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {order.products.map((item) =>
                showReviewForm === item.product._id ? (
                  <div
                    key={`form-${item.product._id}`}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                  >
                    <div className="bg-white p-6 rounded shadow-md w-96">
                      <h3 className="text-lg font-bold mb-3">
                        Review for {item.product.name}
                      </h3>

                      <label className="block mb-2">Rating:</label>
                      <select
                        className="w-full p-2 border rounded mb-3"
                        value={reviewData.rating}
                        onChange={(e) =>
                          setReviewData({
                            ...reviewData,
                            rating: parseInt(e.target.value),
                          })
                        }
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <option key={star} value={star}>
                            {star} Star{star > 1 && "s"}
                          </option>
                        ))}
                      </select>

                      <label className="block mb-2">Your Review:</label>
                      <textarea
                        placeholder="Write your review..."
                        className="w-full p-2 border rounded mb-3"
                        value={reviewData.text}
                        onChange={(e) =>
                          setReviewData({ ...reviewData, text: e.target.value })
                        }
                      ></textarea>

                      <div className="flex justify-between">
                        <button
                          onClick={() => handleReviewSubmit(item.product._id)}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                          Submit
                        </button>
                        <button
                          onClick={() => setShowReviewForm(null)}
                          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          ))
        ) : (
          <p className="text-center">You have no orders placed.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
