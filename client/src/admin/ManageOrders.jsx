import React, { useEffect, useState } from "react";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`https://ecart-nv2f.onrender.com/api/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const sortedOrders = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // Sort latest first
        );
        setOrders(sortedOrders);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );

    fetch(`https://ecart-nv2f.onrender.com/api/orders/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((updatedOrder) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order
          )
        );
      })
      .catch((err) => {
        console.error("Error updating order status:", err);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "Pending" } : order
          )
        );
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Orders</h2>

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        {orders.length > 0 ? (
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Address</th>
                <th className="p-2 border">Products</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Order Date</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                // ✅ Move address formatting inside .map()
                const address = order.user?.address
                  ? `${order.user.address.street}, ${order.user.address.city}, ${order.user.address.state}, ${order.user.address.zipCode}, ${order.user.address.country}`
                  : "No Address Provided";

                return (
                  <tr key={order._id} className="border">
                    <td className="p-2 border">{order._id}</td>
                    <td className="p-2 border">{order.user?.email || "Unknown"}</td>
                    <td className="p-2 border">{address}</td>
                    <td className="p-2 border">
                      {order.products.map((p) => (
                        <p key={p.product._id} className="truncate">
                          {p.product.name} × {p.quantity}
                        </p>
                      ))}
                    </td>
                    <td className="p-2 border font-semibold">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="p-2 border font-medium">{order.status}</td>
                    <td className="p-2 border">
                      {new Date(order.createdAt).toLocaleDateString()} <br />
                      <span className="text-gray-500 text-xs">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </span>
                    </td>
                    <td className="p-3 border">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="p-1 border rounded focus:ring focus:ring-blue-300 bg-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default ManageOrders;
