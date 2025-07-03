import React, { useState } from "react";

function HeaderSection({ onSearch, onFilter, onPriceFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilter = (e) => {
    setCategory(e.target.value);
    onFilter(e.target.value);
  };

  const handlePriceChange = () => {
    onPriceFilter({ min: minPrice, max: maxPrice });
  };

  return (
    <div className="bg-[#0d1b2a] p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 border border-gray-700">  
      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        className="p-3 w-full md:w-1/3 border border-[#415a77] rounded-md bg-[#415a77] text-[#e0e1dd] placeholder-[#e0e1dd] focus:outline-none focus:ring-2 focus:ring-gray-500"
      />

      {/* Category */}
      <select
        value={category}
        onChange={handleFilter}
        className="p-3 w-full md:w-1/4 border border-[#415a77] rounded-md bg-[#415a77] text-[#e0e1dd] cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
        <option value="Home">Home</option>
      </select>

      {/* Price Filter */}
      <div className="flex gap-2 w-full md:w-1/3">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          onBlur={handlePriceChange}
          className="p-3 w-1/2 border border-[#415a77] rounded-md bg-[#415a77] text-[#e0e1dd] placeholder-[#e0e1dd] focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onBlur={handlePriceChange}
          className="p-3 w-1/2 border border-[#415a77] rounded-md bg-[#415a77] text-[#e0e1dd] placeholder-[#e0e1dd] focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>
    </div>
  );
}

export default HeaderSection;
