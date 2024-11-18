import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"; // useLocation for path
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { products, getCartCount } = useContext(ShopContext);
  const [visible, setVisible] = useState(false); // Controls sidebar visibility
  const [searchQuery, setSearchQuery] = useState(""); // Holds the search input
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get current path

  // Handle search input change and filter products
  const handleSearchInput = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const results = products.filter((product) => {
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesSubCategory = product.subCategory.toLowerCase().includes(query);
        const matchesDescription = product.description.toLowerCase().includes(query);
        return matchesName || matchesCategory || matchesSubCategory || matchesDescription;
      });
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]); // Clear results when query is empty
    }
  };

  return (
    <div className="relative">
      {/* Main Navbar */}
      <div className={`flex items-center justify-between py-5 font-medium ${visible ? "hidden" : "block"}`}>
        <Link to={"/"}>
          <img className="w-36" src={assets.logo} alt="Logo" />
        </Link>

        <ul className="hidden md:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">HOME</NavLink>
          <NavLink to="/collections" className="flex flex-col items-center gap-1">COLLECTIONS</NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">ABOUT</NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">CONTACT</NavLink>
        </ul>

        <div className="flex items-center gap-6">
          {/* Search Icon */}
          <div className="relative">
            <img
              className="w-7 cursor-pointer"
              src={assets.search_icon}
              alt="Search"
              onClick={() => navigate('/collections')}
            />
          </div>

          {/* Profile and Cart Icons */}
          <div className="group relative">
            <img className="w-7 cursor-pointer" src={assets.profile_icon} alt="Profile" />
            <div className="hidden group-hover:block absolute bg-white shadow-lg p-10 mt-2 rounded-lg">
              <p className="cursor-pointer hover:text-black p-2">My Profile</p>
              <p className="cursor-pointer hover:text-black p-2">Orders</p>
              <p className="cursor-pointer hover:text-black p-2">Logout</p>
            </div>
          </div>

          <Link to="/cart" className="relative">
            <img className="w-7 cursor-pointer" src={assets.cart_icon} alt="Cart" />
            <p className="absolute right-[5px] bottom-[5px] w-4 text-center leading-4 aspect-square">{getCartCount()}</p>
          </Link>

          {/* Sidebar Menu Icon */}
          <img
            onClick={() => setVisible(true)}
            className="w-7 cursor-pointer sm:hidden"
            src={assets.menu_icon}
            alt="Menu"
          />
        </div>
      </div>

      {/* Search Bar (Visible only on Collections Page) */}
      <div className={`flex flex-col items-center mt-2 ${location.pathname === "/collections" ? "block" : "hidden"}`}>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchInput}
          className="w-1/2 rounded-full border border-gray-300 p-2 mb-2"
        />
        {filteredProducts.length > 0 && (
          <div className="absolute mt-2 bg-white shadow-lg rounded-lg z-10">
            {filteredProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="flex items-center p-2 hover:bg-gray-100">
                <img src={product.image} alt={product.name} className="w-10 h-10 mr-2" />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar menu for smaller screens */}
      <div className={`absolute top-0 right-0 overflow-hidden bg-white transition-all duration-300 ${visible ? "w-full z-10" : "w-0"}`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="flex items-center cursor-pointer p-4">
            <img src={assets.dropdown_icon} alt="Back" />
            <p className="ml-2">Back</p>
          </div>

          {/* Sidebar Links */}
          <NavLink to="/" className="flex flex-col items-center gap-1 p-4 hover:bg-gray-100" onClick={() => setVisible(false)}>HOME</NavLink>
          <NavLink to="/collections" className="flex flex-col items-center gap-1 p-4 hover:bg-gray-100" onClick={() => setVisible(false)}>COLLECTIONS</NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1 p-4 hover:bg-gray-100" onClick={() => setVisible(false)}>ABOUT</NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1 p-4 hover:bg-gray-100" onClick={() => setVisible(false)}>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
