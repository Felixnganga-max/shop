import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const Collections = () => {
  const { products } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [priceRange, setPriceRange] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleTypeChange = (subCategory) => {
    setSelectedType((prev) =>
      prev.includes(subCategory)
        ? prev.filter((item) => item !== subCategory)
        : [...prev, subCategory]
    );
  };

  const handlePriceChange = (range) => {
    setPriceRange((prev) =>
      prev.includes(range)
        ? prev.filter((item) => item !== range)
        : [...prev, range]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory.length
      ? selectedCategory.includes(product.category)
      : true;
    const matchesType = selectedType.length
      ? selectedType.includes(product.subCategory)
      : true;
    const matchesPrice =
      priceRange.length === 0 ||
      priceRange.some((range) => {
        if (range === "below50") return product.price < 50;
        if (range === "50to100")
          return product.price >= 50 && product.price < 100;
        if (range === "100to200")
          return product.price >= 100 && product.price < 200;
        if (range === "above200") return product.price >= 200;
        return false;
      });

    return matchesCategory && matchesType && matchesPrice;
  });

  return (
    <div className="flex flex-col sm:flex-row sm:gap-10 gap-4 border-t pt-6">
      {/* Filter Options */}
      <div className="min-w-[15rem]">
        <p className="my-2 text-xl font-semibold">Filters</p>

        {/* Category Filter */}
        <div className="border border-gray-300 p-4 mt-4">
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids"].map((category) => (
              <label key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategory.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className="border border-gray-300 p-4 mt-4">
          <p className="mb-3 text-sm font-medium">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((subCategory) => (
              <label key={subCategory} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedType.includes(subCategory)}
                  onChange={() => handleTypeChange(subCategory)}
                />
                {subCategory}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="border border-gray-300 p-4 mt-4">
          <p className="mb-3 text-sm font-medium">PRICE RANGE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["below50", "50to100", "100to200", "above200"].map((range) => (
              <label key={range} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={priceRange.includes(range)}
                  onChange={() => handlePriceChange(range)}
                />
                {range === "below50" && "Below $50"}
                {range === "50to100" && "$50 to $100"}
                {range === "100to200" && "$100 to $200"}
                {range === "above200" && "Above $200"}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="flex flex-col items-center text-center"
            >
              <div className="transition-transform transform hover:scale-105">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-60 h-85 object-cover mb-2"
                />
              </div>
              <h3 className="text-lg font-medium mt-2">{product.name}</h3>
              <p className="text-sm text-gray-600">${product.price}</p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No products match the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default Collections;
