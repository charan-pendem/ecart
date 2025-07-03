import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Payment() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [address, setAddress] = useState(null);
  const [isAddressAvailable, setIsAddressAvailable] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
    fetchUserAddress();
  }, []);

  const fetchCartItems = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data.items || []);
      })
      .catch(() => toast.error("Failed to load cart items"));
  };

  const fetchUserAddress = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.address) {
          const { street, city, state, zipCode, country } = data.address;
          const addressParts = [street, city, state, zipCode, country].filter(Boolean); 
          const formattedAddress = addressParts.join(", "); 
  
          setAddress(formattedAddress);
          setIsAddressAvailable(addressParts.length > 0);
        } else {
          setAddress(null);
          setIsAddressAvailable(false);
        }
      })
      .catch(() => {
        toast.error("Failed to load address");
        setIsAddressAvailable(false);
      });
  };
  

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!isAddressAvailable) {
      toast.error("Please add an address before placing an order.");
      return;
    }

    const orderData = {
      products: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
    };

    fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then(() => {
        toast.success("Order placed successfully!");
        navigate("/orders");
      })
      .catch(() => toast.error("Failed to place order."));
  };

  return (
    <div className="min-h-screen bg-[#1b263b] p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#e0e1dd]">Payment</h2>
      <div className="bg-white p-4 rounded-lg shadow-md max-w-3xl mx-auto">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div key={item.product._id} className="flex justify-between border-b p-2">
                <p>{item.product.name} (x{item.quantity})</p>
                <p>₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</p>
              </div>
            ))}
            <h3 className="text-xl font-bold mt-4">Total: ₹{totalAmount.toLocaleString("en-IN")}</h3>
            <h3 className="text-lg font-semibold mt-4">Shipping Address</h3>
            {isAddressAvailable ? (
              <p className="text-gray-700">{address}</p>
            ) : (
              <p className="text-red-500">No address found. Please add an address.</p>
            )}
            <h3 className="text-lg font-semibold mt-4">Select Payment Method</h3>
            <div className="mt-2">
              <label className="block">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={selectedPayment === "COD"}
                  onChange={() => setSelectedPayment("COD")}
                />
                <span className="ml-2">Cash on Delivery (COD)</span>
              </label>
              <label className="block text-gray-400">
                <input type="radio" name="payment" value="UPI" disabled />
                <span className="ml-2">UPI (Unavailable)</span>
              </label>
              <label className="block text-gray-400">
                <input type="radio" name="payment" value="Card" disabled />
                <span className="ml-2">Credit/Debit Card (Unavailable)</span>
              </label>
            </div>
            <button
              onClick={handlePlaceOrder}
              className={`px-4 py-2 mt-4 w-full rounded text-white ${
                isAddressAvailable ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isAddressAvailable}
            >
              Place Order
            </button>
          </>
        ) : (
          <p className="text-center">No items in cart.</p>
        )}
      </div>
    </div>
  );
}

export default Payment;
