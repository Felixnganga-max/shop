import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    // Get products from the ShopContext
    const { products } = useContext(ShopContext)

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter products based on the search query
        const results = products.filter((product) =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.subCategory.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );

        setFilteredProducts(results);
    };

    useEffect(() => {
      setFilteredProducts(products);
  }, [products]);
  

    return (
        <div className="relative">
            {/* Main Navbar */}
            <div className={`flex items-center justify-between py-5 font-medium ${visible ? "hidden" : "block"}`}>
                <Link to={"/"}>
                    <img className="w-36" src={assets.logo} alt="Logo" />
                </Link>

                <ul className="hidden md:flex gap-5 text-sm text-gray-700">
                    <NavLink to="/" className="flex flex-col items-center gap-1">
                        <p>HOME</p>
                    </NavLink>
                    <NavLink to="/collections" className="flex flex-col items-center gap-1">
                        <p>COLLECTIONS</p>
                    </NavLink>
                    <NavLink to="/about" className="flex flex-col items-center gap-1">
                        <p>ABOUT</p>
                    </NavLink>
                    <NavLink to="/contact" className="flex flex-col items-center gap-1">
                        <p>CONTACT</p>
                    </NavLink>
                </ul>

                <div className="flex items-center gap-6">
                    {/* Search Icon */}
                    <img
                        className="w-7 cursor-pointer"
                        src={assets.search_icon}
                        alt="Search"
                        onClick={() => setVisible(!visible)} // Toggle search bar visibility
                    />
                    {/* Other icons... */}
                    <img
                        className="w-7 cursor-pointer"
                        src={assets.profile_icon}
                        alt="Profile"
                    />
                    <Link className="relative">
                        <img className="w-7 cursor-pointer" src={assets.cart_icon} alt="" />
                        <p className="absolute right-[5px] bottom-[5px] w-4 text-center leading-4 aspect-square">10</p>
                    </Link>
                </div>
            </div>

            {/* Search Bar */}
            {visible && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2/3 bg-white shadow-md rounded-md mt-2 p-2">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                    {filteredProducts.length > 0 && (
                        <ul className="mt-2 max-h-60 overflow-y-auto border border-gray-300 rounded-md">
                            {filteredProducts.map((product) => (
                                <li key={product._id} className="p-2 hover:bg-gray-100">
                                    <Link to={`/products/${product._id}`}>
                                        {product.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* Sidebar for smaller screens */}
            <div className={`absolute top-0 right-0 overflow-hidden bg-white transition-all duration-300 ${visible ? "w-full z-10" : "w-0"}`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={() => setVisible(false)} className="flex items-center cursor-pointer p-4">
                        <img src={assets.dropdown_icon} alt="Back" />
                        <p className="ml-2">Back</p>
                    </div>
                    {/* Sidebar Links */}
                    <NavLink to="/" className="flex flex-col items-center gap-1 p-4 hover:bg-gray-100" onClick={() => setVisible(false)}>
                        <p>HOME</p>
                    </NavLink>
                    <NavLink to="/collections" className="flex flex-col items-center gap-1 p-4 hover:bg-gray-100" onClick={() => setVisible(false)}>
                        <p>COLLECTIONS</p>
                    </NavLink>
                    <NavLink to="/about" className="flex flex-col items-center gap-1 p-4 hover:bg-gray-100" onClick={() => setVisible(false)}>
                        <p>ABOUT</p>
                    </NavLink>
                    <NavLink to="/contact" className="flex flex-col items-center gap-1 p-4 hover:bg-gray-100" onClick={() => setVisible(false)}>
                        <p>CONTACT</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
