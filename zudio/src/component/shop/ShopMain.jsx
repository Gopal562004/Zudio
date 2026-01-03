
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ShopSideBar from "./DesktopShopSideBar";
import MobileShopSideBar from "./MobileShopSideBar";
import { getProducts } from "../../mongo/productServices";
import {
  ChevronRight,
  Filter,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Grid,
  List,
  SortAsc,
  Eye,
  Heart,
  Star,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ProductCategories component with animations
const ProductCategories = ({ products, viewMode = "grid" }) => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  // Animation variants for products
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  if (viewMode === "list") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 p-3 border border-gray-100 hover:border-gray-300 transition cursor-pointer group"
            whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
          >
            <div className="relative aspect-square w-full sm:w-40 flex-shrink-0 overflow-hidden bg-gray-50">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.images[1] && (
                <img
                  src={product.images[1]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              )}
              {product.stock < 10 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                  Low Stock
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-sm sm:text-base truncate">
                  {product.name}
                </h3>
                <span className="text-sm sm:text-base font-bold">
                  ${product.price}
                </span>
              </div>

              <p className="text-xs text-gray-500 mb-2">{product.brand}</p>

              <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                {product.description || "No description available"}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.avgRating || 0)
                            ? "fill-black stroke-black"
                            : "stroke-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.numReviews || 0})
                  </span>
                </div>

                <span className="text-xs text-gray-500">
                  <Check className="w-3 h-3 inline mr-1" />
                  {product.stock} in stock
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Default grid view
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
    >
      {products.map((product) => (
        <motion.div
          key={product._id}
          variants={itemVariants}
          whileHover={{
            y: -4,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
          className="group cursor-pointer"
        >
          <div
            onClick={() => handleProductClick(product)}
            className="relative overflow-hidden bg-gray-50 aspect-square mb-3 rounded"
          >
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />

            {product.images[1] && (
              <motion.img
                src={product.images[1]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}

            <motion.button
              className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-xs hover:shadow-sm transition opacity-0 group-hover:opacity-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-4 h-4 stroke-gray-400 hover:stroke-red-500" />
            </motion.button>

            {product.stock < 10 && (
              <motion.span
                className="absolute top-2 left-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                Low Stock
              </motion.span>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium truncate">{product.name}</h3>
            <p className="text-xs text-gray-500 truncate">{product.brand}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">${product.price}</span>
              <div className="flex items-center">
                <Star className="w-3 h-3 fill-gray-300 stroke-gray-300" />
                <span className="text-xs text-gray-500 ml-0.5">
                  {product.avgRating?.toFixed(1) || "0.0"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Main ShopMain Component
const ShopMain = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [productsToShow, setProductsToShow] = useState(9);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [viewMode, setViewMode] = useState("grid");

  const [filters, setFilters] = useState({
    sort: "price_asc",
    category: "",
    minPrice: 0,
    maxPrice: 10000,
    color: "",
    size: "",
    tags: "",
  });

  const handleFilterChange = (incomingFilters) => {
    const updatedFilters = {
      ...filters,
      category: incomingFilters.category || "",
      color: incomingFilters.color || "",
      size: incomingFilters.size || "",
      tags: incomingFilters.tags || "",
      minPrice: incomingFilters.minPrice ?? 0,
      maxPrice: incomingFilters.maxPrice ?? 10000,
    };

    setFilters(updatedFilters);
    setCurrentPage(1);
    fetchProducts(1, productsToShow, updatedFilters);
  };

  const fetchProducts = async (
    page = currentPage,
    limit = productsToShow,
    activeFilters = filters
  ) => {
    setLoading(true);
    try {
      const data = await getProducts(
        page,
        limit,
        activeFilters.sort,
        activeFilters.category,
        searchQuery,
        activeFilters.minPrice,
        activeFilters.maxPrice,
        activeFilters.color,
        activeFilters.size,
        activeFilters.tags
      );

      setProducts(data.products || []);
      setTotalPages(Math.ceil((data.total || 1) / limit));
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, productsToShow, filters);
  }, [currentPage, productsToShow, searchQuery, filters]);

  const handleProductLimitChange = (e) => {
    const limit = Number(e.target.value);
    setProductsToShow(limit);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSortChange = (e) => {
    setFilters({ ...filters, sort: e.target.value });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
              Shop
            </h1>
            <nav className="flex items-center justify-center space-x-1 text-xs sm:text-sm mt-2">
              <Link
                to="/"
                className="text-gray-500 hover:text-black transition"
              >
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <span className="text-black font-sm">Shop</span>
              {searchQuery && (
                <>
                  <ChevronRight className="w-3 h-3 text-gray-300" />
                  <span className="text-black font-medium truncate max-w-[150px]">
                    Search: "{searchQuery}"
                  </span>
                </>
              )}
            </nav>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Animated Mobile Filter Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:hidden"
        >
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-2.5 text-sm font-medium mb-4"
          >
            {isMobileSidebarOpen ? (
              <>
                <X className="w-4 h-4" />
                Close Filters
              </>
            ) : (
              <>
                <Filter className="w-4 h-4" />
                Filter Products
              </>
            )}
          </button>
        </motion.div>

        <MobileShopSideBar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          onFilterChange={handleFilterChange}
        />

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Desktop Sidebar with Animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block w-full lg:w-1/4"
          >
            <ShopSideBar onFilterChange={handleFilterChange} />
          </motion.div>

          {/* Main Content with Animation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-3/4"
          >
            {/* Animated Controls Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6"
            >
              <div className="text-xs sm:text-sm text-gray-600">
                {searchQuery ? (
                  <span>
                    Results for "
                    <span className="font-medium">{searchQuery}</span>"
                  </span>
                ) : (
                  <span>
                    Showing{" "}
                    <span className="font-medium">{products.length}</span>{" "}
                    products
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* View Toggle */}
                <div className="flex border border-gray-300 rounded">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 sm:p-2 ${
                      viewMode === "grid"
                        ? "bg-black text-white"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 sm:p-2 ${
                      viewMode === "list"
                        ? "bg-black text-white"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative flex-1 sm:flex-initial">
                  <select
                    value={filters.sort}
                    onChange={handleSortChange}
                    className="w-full text-xs sm:text-sm border border-gray-300 rounded py-2 pl-3 pr-8 appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="popular">Most Popular</option>
                  </select>
                  <SortAsc className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Items Per Page */}
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-xs sm:text-sm whitespace-nowrap">
                    Show:
                  </span>
                  <select
                    value={productsToShow}
                    onChange={handleProductLimitChange}
                    className="text-xs sm:text-sm border border-gray-300 rounded py-1.5 px-2"
                  >
                    <option value="9">9</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                    <option value="24">24</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Loading State with Animation */}
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12 sm:py-16"
              >
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                <p className="mt-3 text-sm text-gray-600">
                  Loading products...
                </p>
              </motion.div>
            ) : products.length > 0 ? (
              <>
                {/* Animated Product Grid/List */}
                <AnimatePresence mode="wait">
                  <ProductCategories
                    key={currentPage}
                    products={products}
                    viewMode={viewMode}
                  />
                </AnimatePresence>

                {/* Animated Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 sm:mt-8 pt-6 border-t border-gray-100"
                  >
                    <div className="text-xs sm:text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 border border-gray-300 hover:border-black disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-1">
                        {(() => {
                          const pages = [];
                          const maxVisible = 5;
                          let start = Math.max(
                            1,
                            currentPage - Math.floor(maxVisible / 2)
                          );
                          let end = Math.min(
                            totalPages,
                            start + maxVisible - 1
                          );

                          if (end - start + 1 < maxVisible) {
                            start = Math.max(1, end - maxVisible + 1);
                          }

                          if (start > 1) {
                            pages.push(
                              <button
                                key={1}
                                onClick={() => handlePageChange(1)}
                                className="px-3 py-1.5 text-xs hover:bg-gray-100 transition"
                              >
                                1
                              </button>
                            );
                            if (start > 2) {
                              pages.push(
                                <span
                                  key="dots1"
                                  className="px-1 text-gray-400"
                                >
                                  ...
                                </span>
                              );
                            }
                          }

                          for (let i = start; i <= end; i++) {
                            pages.push(
                              <button
                                key={i}
                                onClick={() => handlePageChange(i)}
                                className={`px-3 py-1.5 text-xs transition ${
                                  currentPage === i
                                    ? "bg-black text-white"
                                    : "hover:bg-gray-100"
                                }`}
                              >
                                {i}
                              </button>
                            );
                          }

                          if (end < totalPages) {
                            if (end < totalPages - 1) {
                              pages.push(
                                <span
                                  key="dots2"
                                  className="px-1 text-gray-400"
                                >
                                  ...
                                </span>
                              );
                            }
                            pages.push(
                              <button
                                key={totalPages}
                                onClick={() => handlePageChange(totalPages)}
                                className="px-3 py-1.5 text-xs hover:bg-gray-100 transition"
                              >
                                {totalPages}
                              </button>
                            );
                          }

                          return pages;
                        })()}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-gray-300 hover:border-black disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        <ChevronRightIcon className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs sm:text-sm text-gray-600">
                      {products.length} of {totalPages * productsToShow} items
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              /* No Results State with Animation */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12 sm:py-16"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-sm text-gray-600 mb-6">
                  {searchQuery
                    ? `No results found for "${searchQuery}". Try different keywords.`
                    : "Try adjusting your filters or browse our categories."}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setFilters({
                      sort: "price_asc",
                      category: "",
                      minPrice: 0,
                      maxPrice: 10000,
                      color: "",
                      size: "",
                      tags: "",
                    });
                    setCurrentPage(1);
                  }}
                  className="text-sm border border-black text-black px-4 py-2 hover:bg-black hover:text-white transition"
                >
                  Clear all filters
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ShopMain;
