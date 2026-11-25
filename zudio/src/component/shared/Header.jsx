import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiUser, CiSearch, CiHeart, CiShoppingCart } from "react-icons/ci";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { ArrowLeft, ArrowUpRight, Clock, TrendingUp, X } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { getProducts } from "../../mongo/productServices";

const TRENDING_TERMS = [
  "Hoodie",
  "Denim Jacket",
  "Sweater",
  "Boxy Tee",
  "Windbreaker",
  "Poplin Shirt",
  "Crossbody Bag",
];

const QUICK_CATEGORIES = [
  { label: "Women", link: "/shop?category=Women" },
  { label: "Men", link: "/shop?category=Men" },
  { label: "Hoodies", link: "/shop?category=Hoodies" },
  { label: "Jackets", link: "/shop?category=Jackets" },
  { label: "T-Shirts", link: "/shop?category=Tshirts" },
  { label: "Sweatshirts", link: "/shop?category=Sweatshirts" },
  { label: "Bags", link: "/shop?category=Bags" },
];

const RECENT_KEY = "zudio_recent_searches";

const Header = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const inputRef = useRef(null);
  const userMenuRef = useRef(null);
  const headerRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setUserMenuOpen(false);
  };
  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
    setIsOpen(false);
  };

  // Auto-close user dropdown & mobile menu on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setUserMenuOpen(false);
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const openFullSearch = () => {
    setSearchOpen(true);
    setIsOpen(false);
    setUserMenuOpen(false);
    setTimeout(() => inputRef.current?.focus(), 60);
  };

  const closeFullSearch = () => {
    setSearchOpen(false);
  };

  const saveRecentSearch = (term) => {
    const clean = term.trim();
    if (!clean) return;
    const updated = [clean, ...recentSearches.filter((t) => t !== clean)].slice(
      0,
      6
    );
    setRecentSearches(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    saveRecentSearch(q);
    navigate(`/shop?query=${encodeURIComponent(q)}`);
    setSearchOpen(false);
  };

  const handleQuickSearch = (term) => {
    setSearchQuery(term);
    saveRecentSearch(term);
    navigate(`/shop?query=${encodeURIComponent(term)}`);
    setSearchOpen(false);
  };

  // Lock background scroll and listen for Escape when full-page search is open
  useEffect(() => {
    if (!searchOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [searchOpen]);

  // Live debounced product search
  useEffect(() => {
    if (!searchOpen) return;
    const q = searchQuery.trim();
    if (!q) {
      setSuggestions([]);
      setSearching(false);
      return;
    }

    let cancelled = false;
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const data = await getProducts(1, 8, "newest", "", q);
        if (!cancelled) {
          setSuggestions(data?.products || []);
        }
      } catch {
        if (!cancelled) setSuggestions([]);
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [searchQuery, searchOpen]);

  return (
    <>
      <header ref={headerRef} className="sticky top-0 bg-white z-40 border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-3 md:px-6">
          <div className="flex justify-between items-center py-3 gap-3 md:gap-6">
            {/* Left: Mobile Menu + Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 hover:bg-gray-100 rounded-none transition"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? (
                  <AiOutlineClose size={20} />
                ) : (
                  <AiOutlineMenu size={20} />
                )}
              </button>

              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/icons/homeicon.png"
                  alt="Zudio"
                  className="w-7 h-7 md:w-8 md:h-8"
                />
                <span className="text-xl md:text-2xl font-serif">Zudio</span>
              </Link>
            </div>

            {/* Center: Desktop Nav + Amazon/Flipkart-style Search Trigger Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-2xl gap-6">
              <nav className="flex space-x-5 text-xs uppercase tracking-wider flex-shrink-0">
                {[
                  { to: "/", label: "HOME", end: true },
                  { to: "/shop", label: "SHOP" },
                  { to: "/blog", label: "BLOG" },
                  { to: "/contact-us", label: "CONTACT" },
                ].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `pb-0.5 border-b-2 transition-colors ${
                        isActive
                          ? "border-black text-black font-semibold"
                          : "border-transparent text-neutral-500 hover:text-black font-medium"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <button
                type="button"
                onClick={openFullSearch}
                className="flex-1 flex items-center justify-between px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200/70 border border-neutral-300 text-left text-xs text-neutral-500 rounded-none transition cursor-text"
              >
                <span className="truncate">
                  {searchQuery || "Search Zudio for hoodies, shirts, jackets..."}
                </span>
                <CiSearch size={18} className="text-black flex-shrink-0 ml-2" />
              </button>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <button
                onClick={openFullSearch}
                className="md:hidden p-2 hover:bg-gray-100 rounded-none transition"
                aria-label="Search"
              >
                <CiSearch size={20} />
              </button>

              {/* User Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className={`p-2 rounded-none transition cursor-pointer ${
                    userMenuOpen ? "bg-neutral-100" : "hover:bg-gray-100"
                  }`}
                  aria-label="User menu"
                  aria-expanded={userMenuOpen}
                >
                  <CiUser size={20} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 shadow-lg rounded-none py-1.5 z-50">
                    {user ? (
                      <>
                        {user.name && (
                          <div className="px-4 py-2 border-b border-neutral-100">
                            <p className="text-xs font-semibold text-neutral-900 truncate">
                              {user.name}
                            </p>
                            {user.email && (
                              <p className="text-[11px] text-neutral-500 truncate">
                                {user.email}
                              </p>
                            )}
                          </div>
                        )}
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-xs uppercase tracking-wider font-medium text-neutral-800 hover:bg-neutral-100 transition"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/profile/wishlist"
                          className="block px-4 py-2 text-xs uppercase tracking-wider font-medium text-neutral-800 hover:bg-neutral-100 transition"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Wishlist
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs uppercase tracking-wider font-medium text-red-600 hover:bg-neutral-100 transition border-t border-neutral-100 mt-1 cursor-pointer"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/auth/login"
                          className="block px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:bg-neutral-100 transition"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to="/auth/signup"
                          className="block px-4 py-2.5 text-xs uppercase tracking-wider font-medium text-neutral-600 hover:bg-neutral-100 transition border-t border-neutral-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link
                to="/profile/wishlist"
                className="p-2 hover:bg-gray-100 rounded-none transition"
                aria-label="Wishlist"
              >
                <CiHeart size={20} />
              </Link>

              {/* Cart */}
              <Link
                className="relative p-2 hover:bg-gray-100 rounded-none transition"
                to="/cart"
                aria-label="Cart"
              >
                <CiShoppingCart size={20} />
                {user?.cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] bg-black text-white rounded-full flex items-center justify-center">
                    {user.cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:hidden bg-white border-t border-gray-200`}
        >
          {[
            { to: "/", label: "HOME", end: true },
            { to: "/shop", label: "SHOP" },
            { to: "/blog", label: "BLOG" },
            { to: "/contact-us", label: "CONTACT US" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-3 px-4 text-sm transition border-l-2 ${
                  isActive
                    ? "bg-neutral-100 text-black font-semibold border-black"
                    : "text-neutral-600 hover:bg-gray-50 border-transparent"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </header>

      {/* Themed Editorial Search Drawer (Backdrop + Panel, not a blank screen) */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex flex-col"
          onClick={closeFullSearch}
        >
          <div
            className="w-full bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xl max-h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Search Bar */}
            <div className="border-b border-neutral-200">
              <form
                onSubmit={handleSearchSubmit}
                className="max-w-screen-xl mx-auto px-3 sm:px-6 py-3.5 flex items-center gap-2 sm:gap-3"
              >
                <button
                  type="button"
                  onClick={closeFullSearch}
                  aria-label="Close search"
                  className="p-2 hover:bg-neutral-100 text-neutral-800 rounded-none cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search Zudio — hoodies, jackets, shirts, bags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-neutral-100/90 border border-neutral-300 focus:border-black focus:bg-white focus:outline-none rounded-none pr-10"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        inputRef.current?.focus();
                      }}
                      aria-label="Clear search"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-neutral-500 hover:text-black cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!searchQuery.trim()}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-black text-white text-xs sm:text-sm uppercase tracking-wider font-semibold rounded-none disabled:opacity-40 hover:bg-neutral-800 transition cursor-pointer"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Scrollable Search Results & Suggestions */}
            <div className="overflow-y-auto">
              <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-7">
              {/* Live Results When Typing */}
              {searchQuery.trim() ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                      {searching
                        ? "Searching..."
                        : `Results for "${searchQuery.trim()}"`}
                    </h2>
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-black hover:underline cursor-pointer"
                    >
                      View all in Shop
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {searching ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="aspect-[4/5] bg-neutral-200 animate-pulse"
                        />
                      ))}
                    </div>
                  ) : suggestions.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                      {suggestions.map((item) => (
                        <div
                          key={item._id}
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            saveRecentSearch(searchQuery);
                            setSearchOpen(false);
                            navigate(`/product/${item._id}`, {
                              state: { product: item },
                            });
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              saveRecentSearch(searchQuery);
                              setSearchOpen(false);
                              navigate(`/product/${item._id}`, {
                                state: { product: item },
                              });
                            }
                          }}
                          className="bg-white border border-neutral-200 hover:border-black transition cursor-pointer group"
                        >
                          <div className="aspect-[4/5] bg-neutral-100 overflow-hidden">
                            <img
                              src={item.images?.[0] || "/images/prod-hoodie.jpg"}
                              alt={item.name}
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-3">
                            <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                              {item.brand} • {item.category}
                            </p>
                            <p className="text-xs sm:text-sm font-medium text-neutral-900 truncate mt-0.5">
                              {item.name}
                            </p>
                            <p className="text-xs sm:text-sm font-bold mt-1">
                              ₹{Number(item.price).toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white border border-neutral-200 p-8 text-center">
                      <p className="text-sm text-neutral-600">
                        No matching products found for "{searchQuery.trim()}".
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchOpen(false);
                          navigate("/shop");
                        }}
                        className="mt-4 px-5 py-2.5 bg-black text-white text-xs uppercase tracking-wider font-semibold cursor-pointer"
                      >
                        Browse All Products
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          Recent Searches
                        </h2>
                        <button
                          type="button"
                          onClick={() => {
                            setRecentSearches([]);
                            localStorage.removeItem(RECENT_KEY);
                          }}
                          className="text-xs text-neutral-500 hover:text-black underline cursor-pointer"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => handleQuickSearch(term)}
                            className="px-3.5 py-2 bg-white border border-neutral-200 hover:border-black text-xs font-medium text-neutral-800 cursor-pointer"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Trending Searches */}
                  <div>
                    <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold flex items-center gap-1.5 mb-3">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Trending on Zudio
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING_TERMS.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => handleQuickSearch(term)}
                          className="px-3.5 py-2 bg-white border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-colors text-xs font-medium cursor-pointer"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Browse Categories */}
                  <div>
                    <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-3">
                      Browse by Category
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                      {QUICK_CATEGORIES.map((cat) => (
                        <button
                          key={cat.label}
                          type="button"
                          onClick={() => {
                            setSearchOpen(false);
                            navigate(cat.link);
                          }}
                          className="p-3 bg-white border border-neutral-200 hover:border-black text-left transition cursor-pointer flex items-center justify-between"
                        >
                          <span className="text-xs font-semibold uppercase tracking-wider">
                            {cat.label}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
