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
  const searchButtonRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleSearchClick = () => {
    if (!searchOpen) {
      setSearchOpen(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
    // Do not close search when clicking the search icon
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/shop?query=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleCloseSearch();
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // Check if click is outside search bar AND outside search button
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target)
      ) {
        handleCloseSearch();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="sticky top-0 bg-white z-50 border-b border-gray-200">
      {/* Main Header */}
      <div className="relative">
        <div className="flex justify-between items-center p-3 md:p-4">
          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 hover:bg-gray-100 rounded-full transition"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <AiOutlineClose size={20} />
              ) : (
                <AiOutlineMenu size={20} />
              )}
            </button>
          </div>

          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/icons/homeicon.png"
              alt="Home Icon"
              className="w-7 h-7 md:w-8 md:h-8"
            />
            <span className="text-xl md:text-2xl font-serif">Zudio</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6 text-xs md:text-sm font-sm uppercase tracking-wide">
            <Link to="/" className="hover:text-gray-600 transition">
              HOME
            </Link>
            <Link to="/shop" className="hover:text-gray-600 transition">
              SHOP
            </Link>
            <Link to="/blog" className="hover:text-gray-600 transition">
              BLOG
            </Link>
            <Link to="/contact-us" className="hover:text-gray-600 transition">
              CONTACT US
            </Link>
          </div>

          {/* Icon Links */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Search Button - Only opens search */}
            <div className="relative">
              <button
                ref={searchButtonRef}
                onClick={handleSearchClick}
                className="p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="Search"
              >
                <CiSearch size={20} />
              </button>
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="User menu"
              >
                <CiUser size={20} />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-sm rounded-md py-1 z-50">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth/login"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/profile/wishlist"
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <CiHeart size={20} />
            </Link>

            {/* Shopping Cart with Badge */}
            <Link
              className="relative p-2 hover:bg-gray-100 rounded-full transition"
              to="/cart"
            >
              <CiShoppingCart size={20} />
              {user?.cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-xs bg-black text-white rounded-full flex items-center justify-center">
                  {user.cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar - Appears below header */}
        {searchOpen && (
          <div
            ref={searchRef}
            className="absolute top-full left-0 right-0 border-t border-gray-200 bg-white shadow-sm"
          >
            <div className="max-w-4xl mx-auto p-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  autoFocus
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <button
                    type="submit"
                    disabled={!searchQuery.trim()}
                    className={`p-2 rounded-md transition ${
                      searchQuery.trim()
                        ? "text-black hover:text-gray-600"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                    aria-label="Search"
                  >
                    <CiSearch size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseSearch}
                    className="p-2 text-gray-500 hover:text-black transition rounded-md hover:bg-gray-100"
                    aria-label="Close search"
                  >
                    <AiOutlineClose size={18} />
                  </button>
                </div>
              </form>

              {/* Recent Searches (Optional) */}
              <div className="mt-2 px-2">
                <p className="text-xs text-gray-500 mb-1">
                  Press Enter to search • Esc to close
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-white border-t border-gray-200`}
      >
        <Link
          to="/"
          className="block py-3 px-4 hover:bg-gray-50 transition"
          onClick={() => setIsOpen(false)}
        >
          HOME
        </Link>
        <Link
          to="/shop"
          className="block py-3 px-4 hover:bg-gray-50 transition"
          onClick={() => setIsOpen(false)}
        >
          SHOP
        </Link>
        <Link
          to="/blog"
          className="block py-3 px-4 hover:bg-gray-50 transition"
          onClick={() => setIsOpen(false)}
        >
          BLOG
        </Link>
        <Link
          to="/contact-us"
          className="block py-3 px-4 hover:bg-gray-50 transition"
          onClick={() => setIsOpen(false)}
        >
          CONTACT US
        </Link>
      </div>
    </div>
  );
};

export default Header;
