import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ShopSideBar from "./DesktopShopSideBar";
import MobileShopSideBar from "./MobileShopSideBar";
import ProductCategories from "./ProductCategories";
import { getProducts } from "../../mongo/productServices";

const ShopMain = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [productsToShow, setProductsToShow] = useState(9);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

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
    const updatedFilters = { ...filters };

    if (incomingFilters.priceRange && incomingFilters.priceRange.length > 0) {
      const [minStr, maxStr] = incomingFilters.priceRange[0]
        .replace(/\$/g, "")
        .split("-");
      updatedFilters.minPrice = parseInt(minStr) || 0;
      updatedFilters.maxPrice = parseInt(maxStr) || 10000;
    }

    if (incomingFilters.category !== undefined)
      updatedFilters.category = incomingFilters.category;
    if (incomingFilters.color !== undefined)
      updatedFilters.color = incomingFilters.color;
    if (incomingFilters.size !== undefined)
      updatedFilters.size = incomingFilters.size;
    if (incomingFilters.tags !== undefined)
      updatedFilters.tags = incomingFilters.tags;

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
      const calculatedTotalPages = Math.ceil((data.total || 1) / limit);
      setTotalPages(calculatedTotalPages);
      console.log("Fetching page:", page, "with size:", limit);

    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, productsToShow, filters);
  }, [currentPage, productsToShow, searchQuery]);

  const handleProductLimitChange = (e) => {
    const limit = Number(e.target.value);
    setProductsToShow(limit);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="mx-4 lg:mx-16 xl:mx-56 min-h-screen">
      <div className="font-semibold text-3xl lg:text-5xl flex justify-center items-center mt-12 lg:mt-16">
        Shop
      </div>
      <p className="text-sm text-gray-500 cursor-pointer text-center pt-2">
        <Link to="/" className="font-medium text-gray-800">
          Home
        </Link>{" "}
        / Shop
      </p>
      <button
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        className="lg:hidden bg-black text-white px-4 py-2 mt-4"
      >
        {isMobileSidebarOpen ? "Close Menu" : "Open Menu"}
      </button>

      <MobileShopSideBar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex flex-col lg:flex-row mt-8">
        <div className="hidden lg:block w-full lg:w-1/4">
          <ShopSideBar onFilterChange={handleFilterChange} />
        </div>

        <div className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <div className="results">
              {searchQuery ? (
                <span>
                  Showing results for "<strong>{searchQuery}</strong>"
                </span>
              ) : (
                <span>
                  Showing <strong>{products.length}</strong> results
                </span>
              )}
            </div>
            <div className="controls">
              <label htmlFor="show">Show </label>
              <select
                id="show"
                value={productsToShow}
                onChange={handleProductLimitChange}
                className="ml-2 border rounded px-2 py-1"
              >
                <option value="9">9</option>
                <option value="12">12</option>
                <option value="15">15</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : products.length > 0 ? (
            <ProductCategories products={products} />
          ) : (
            <div className="text-center text-gray-500 mt-4">
              No products found
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 flex-wrap gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-black text-white disabled:bg-gray-400"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2  ${
                    currentPage === index + 1
                      ? "bg-black text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-black text-white disabled:bg-gray-400"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopMain;
