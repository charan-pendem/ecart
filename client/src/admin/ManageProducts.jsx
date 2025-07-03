import React, { useState, useEffect } from "react";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [stockUpdates, setStockUpdates] = useState({});
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: "",
  });
  const [showForm, setShowForm] = useState(false); // Toggle form visibility

  const token = localStorage.getItem("token");

  // Fetch products from API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Handle input change for new product form
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handle stock input change
  const handleStockChange = (productId, value) => {
    setStockUpdates((prev) => ({ ...prev, [productId]: value }));
  };

  // Submit new product
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data]);
        setNewProduct({ name: "", price: "", description: "", category: "", stock: "", image: "" });
        setShowForm(false); // Hide form after submission
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  // Update stock on button click
  const updateStock = (productId) => {
    const newStock = stockUpdates[productId];
    if (newStock === undefined || newStock === "") return;

    fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}/stock`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ stock: Number(newStock) }),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product
          )
        );
        setStockUpdates((prev) => ({ ...prev, [productId]: "" })); // Clear input field
      })
      .catch((err) => console.error("Error updating stock:", err));
  };

  const deleteProduct = (productId) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setProducts(products.filter((product) => product._id !== productId));
        } else {
          console.error("Error deleting product");
        }
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Products</h2>

      {/* Add Product Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {showForm ? "Close Form" : "Add Product"}
        </button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mb-8">
          <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} className="w-full p-2 border rounded focus:ring focus:ring-blue-300" required />
            <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} className="w-full p-2 border rounded focus:ring focus:ring-blue-300" required />
            <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleChange} className="w-full p-2 border rounded focus:ring focus:ring-blue-300" required />
            <input type="number" name="stock" placeholder="Stock Quantity" value={newProduct.stock} onChange={handleChange} className="w-full p-2 border rounded focus:ring focus:ring-blue-300" required />
            <input type="text" name="image" placeholder="Image URL" value={newProduct.image} onChange={handleChange} className="w-full p-2 border rounded focus:ring focus:ring-blue-300" required />
            <textarea name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} className="w-full p-2 border rounded focus:ring focus:ring-blue-300" required />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">Add Product</button>
          </form>
        </div>
      )}

      {/* Product List */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Existing Products</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-sm md:text-base">
              <th className="border p-2">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Update Stock</th>
              <th className="border p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border text-sm md:text-base">
                <td className="border p-2">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                </td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">₹{product.price.toLocaleString("en-IN")}</td>
                <td className="border p-2">{product.category}</td>
                <td className="border p-2 font-semibold">{product.stock}</td>
                <td className="border p-2">
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={stockUpdates[product._id] || ""}
                      onChange={(e) => handleStockChange(product._id, e.target.value)}
                      className="border p-2 rounded w-20 focus:ring focus:ring-blue-300"
                      placeholder="New stock"
                    />
                    <button
                      onClick={() => updateStock(product._id)}
                      className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Update
                    </button>
                  </div>
                </td>
                <td className="border p-2">
                  <button onClick={() => deleteProduct(product._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageProducts;
