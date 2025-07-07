import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderSection from "../components/HeaderSection";
import toast from "react-hot-toast";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://ecart-nv2f.onrender.com/api/products`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load products");
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(() => toast.error("Failed to load products"));
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, categoryFilter, priceFilter, products]);

  const applyFilters = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    if (priceFilter.min !== "" || priceFilter.max !== "") {
      filtered = filtered.filter((product) => {
        const price = product.price;
        const min = priceFilter.min !== "" ? parseFloat(priceFilter.min) : 0;
        const max = priceFilter.max !== "" ? parseFloat(priceFilter.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  const handlePriceFilter = ({ min, max }) => {
    setPriceFilter({ min, max });
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-[#e0e1dd]">
      <HeaderSection
        onSearch={handleSearch}
        onFilter={handleCategoryFilter}
        onPriceFilter={handlePriceFilter}
      />
      <h2 className="text-3xl font-bold text-center mb-8">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 pb-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-[#1b263b] p-4 rounded-xl shadow-lg text-center cursor-pointer hover:shadow-2xl transition-all border border-gray-700 hover:border-gray-500"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <div className="w-full h-52 flex justify-center items-center overflow-hidden mb-4 rounded-lg bg-[#415a77]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain w-full h-full p-2"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-400 mb-2 text-sm">{product.description}</p>
              <p className="text-gray-100 font-bold text-lg">₹{product.price.toLocaleString("en-IN")}</p>
            </div>
          ))
        ) : (
          <>
          <p className="text-center col-span-full text-gray-400">No products found.</p>
          <p className="text-center col-span-full text-gray-400">Wait for a minute to active the backend server.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
