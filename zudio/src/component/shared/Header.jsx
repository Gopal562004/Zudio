import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiUser, CiSearch, CiHeart, CiShoppingCart } from "react-icons/ci";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../auth/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/products?query=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Close search input when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 bg-white z-50 flex justify-between items-center p-4 border-b border-gray-300">
      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Logo Section */}
      <Link to="/" className="text-2xl md:text-4xl font-serif lg:pl-5">
        Zudio
      </Link>

      {/* Navigation Links (Hidden on Mobile) */}
      <div className="hidden md:flex space-x-8 text-sm font-normal">
        <Link to="/" className="hover:text-gray-600">
          HOME
        </Link>
        <Link to="/shop" className="hover:text-gray-600">
          SHOP
        </Link>
        <Link to="#" className="hover:text-gray-600">
          PAGES
        </Link>
        <Link to="/blog" className="hover:text-gray-600">
          BLOG
        </Link>
        <Link to="contact-us" className="hover:text-gray-600">
          CONTACT US
        </Link>
      </div>

      {/* Icon Links */}
      <div className="flex space-x-6 text-2xl relative">
        {/* Search Bar */}
        <div className="relative" ref={searchRef}>
          <button onClick={toggleSearch} className="hover:text-gray-600">
            <CiSearch />
          </button>
          {searchOpen && (
       <form
              onSubmit={handleSearchSubmit}
              className="fixed top-14 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 shadow-lg p-3 flex items-center space-x-2 w-full sm:w-[90vw] md:max-w-lg rounded-lg transition-all duration-300 z-50"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-3 w-full border-none outline-none bg-transparent text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 rounded-md"
              />
              <button
                type="submit"
                className="text-gray-500 hover:text-blue-500 transition duration-300"
              >
                <CiSearch size={28} />
              </button>
            </form>
          )}
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <button onClick={toggleUserMenu} className="hover:text-gray-600">
            <CiUser />
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-md rounded-lg">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth/login"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>

        <Link to="/profile/wishlist">
          <CiHeart className="hover:text-gray-600 cursor-pointer" />
        </Link>

        {/* Shopping Cart with Badge */}
        <Link className="relative" to="/cart">
          <CiShoppingCart className="hover:text-gray-600 cursor-pointer" />
          {user?.cartCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 text-xs bg-black text-white rounded-full flex items-center justify-center">
              {user.cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-white md:hidden text-sm`}
      >
        <Link
          to="/"
          className="block py-2 px-4 hover:text-gray-600"
          onClick={toggleMenu}
        >
          HOME
        </Link>
        <Link
          to="/shop"
          className="block py-2 px-4 hover:text-gray-600"
          onClick={toggleMenu}
        >
          SHOP
        </Link>
        <Link
          to="#"
          className="block py-2 px-4 hover:text-gray-600"
          onClick={toggleMenu}
        >
          PAGES
        </Link>
        <Link
          to="#"
          className="block py-2 px-4 hover:text-gray-600"
          onClick={toggleMenu}
        >
          BLOG
        </Link>
        <Link
          to="#"
          className="block py-2 px-4 hover:text-gray-600"
          onClick={toggleMenu}
        >
          CONTACT US
        </Link>
      </div>
    </div>
  );
};

export default Header;
