// import React, { useState } from "react";
// import DesktopShopSideBar from "./DesktopShopSideBar";
// import MobileShopSideBar from "./MobileShopSideBar";
// import ProductCategories from "./ProductCategories";

// // Sample product data
// const products = [
//   {
//     id: 1,
//     image:
//       "https://mixtas.novaworks.net/wp-content/uploads/2024/01/m10_03_1.jpg",
//     name: "adidas X Pop Beckenbauer Track Jacket",
//     price: "$120.00",
//     category: "JACKETS",
//   },
//   {
//     id: 2,
//     image: "https://mixtas.b-cdn.net/wp-content/uploads/2023/12/m1_04_1.jpg",
//     name: "adidas X Pop Classic t-shirt, grey / navy",
//     price: "$120.00",
//     category: "JACKETS",
//   },
//   {
//     id: 3,
//     image:
//       "https://mixtas.novaworks.net/wp-content/uploads/2023/12/m1_13_1.jpg",
//     name: "adidas X Pop Polo shirt, navy / blue",
//     price: "$69.99",
//     category: "JACKETS",
//   },
//   {
//     id: 4,
//     image:
//       "https://mixtas.novaworks.net/wp-content/uploads/2024/01/m10_08_1.jpg",
//     name: "adidas Cap",
//     price: "$29.99",
//     category: "HATS",
//   },
  
//   // Add more products as needed
// ];

// const ShopMain = () => {
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
//   const [productsToShow, setProductsToShow] = useState(12);

//   const toggleMobileSidebar = () => {
//     setIsMobileSidebarOpen(!isMobileSidebarOpen);
//   };

//   const closeMobileSidebar = () => {
//     setIsMobileSidebarOpen(false);
//   };

//   const handleProductLimitChange = (e) => {
//     setProductsToShow(Number(e.target.value));
//   };

//   return (
//     <div className="mx-4 lg:mx-16 xl:mx-56 min-h-screen">
//       {/* Shop title */}
//       <div className="font-semibold text-3xl lg:text-5xl flex justify-center items-center mt-12 lg:mt-16">
//         Shop
//       </div>

//       {/* Mobile Sidebar Toggle Button */}
//       <button
//         onClick={toggleMobileSidebar}
//         className="lg:hidden bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
//       >
//         {isMobileSidebarOpen ? "Close Menu" : "Open Menu"}
//       </button>

//       {/* Mobile Sidebar */}
//       <MobileShopSideBar
//         isOpen={isMobileSidebarOpen}
//         onClose={closeMobileSidebar}
//       />

//       {/* Main content area */}
//       <div className="flex flex-col lg:flex-row mt-8">
//         {/* Desktop Sidebar */}
//         <div className="hidden lg:block w-full lg:w-1/4">
//           <DesktopShopSideBar />
//         </div>

//         {/* Main content area */}
//         <div className="w-full lg:w-3/4">
//           {/* Sorting and Display Controls */}
//           <div className="flex justify-between items-center mb-4">
//             <div className="results">
//               Showing 1–{productsToShow} of {products.length} results
//             </div>
//             <div className="controls">
//               <label htmlFor="show">Show </label>
//               <select
//                 id="show"
//                 value={productsToShow}
//                 onChange={handleProductLimitChange}
//               >
//                 <option value="12">12</option>
//                 <option value="15">15</option>
//                 <option value="30">30</option>
//               </select>
//               <span className="ml-2">Default sorting</span>
//             </div>
//           </div>

//           {/* Categories Section */}
//           <ProductCategories products={products.slice(0, productsToShow)} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopMain;
///////////////
// import React, { useState, useEffect } from "react";
// import DesktopShopSideBar from "./DesktopShopSideBar";
// import MobileShopSideBar from "./MobileShopSideBar";
// import ProductCategories from "./ProductCategories";
// import { getProducts } from "../../mongo/productServices"; // Import the API function to fetch products

// const ShopMain = () => {
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
//   const [productsToShow, setProductsToShow] = useState(9);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1); // Track the current page
//   const [totalPages, setTotalPages] = useState(1); // Track the total number of pages

//   const toggleMobileSidebar = () => {
//     setIsMobileSidebarOpen(!isMobileSidebarOpen);
//   };

//   const closeMobileSidebar = () => {
//     setIsMobileSidebarOpen(false);
//   };

//   const handleProductLimitChange = (e) => {
//     setProductsToShow(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page when the limit changes
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await getProducts(currentPage, productsToShow); // Fetch products with pagination
//         setProducts(data.products); // Set the fetched products
//         setTotalPages(data.totalPages); // Set the total number of pages
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false); // Set loading to false once data is fetched
//       }
//     };
//     fetchProducts();
//   }, [currentPage, productsToShow]); // Fetch products when the page or productsToShow changes

//   return (
//     <div className="mx-4 lg:mx-16 xl:mx-56 min-h-screen">
//       {/* Shop title */}
//       <div className="font-semibold text-3xl lg:text-5xl flex justify-center items-center mt-12 lg:mt-16">
//         Shop
//       </div>

//       {/* Mobile Sidebar Toggle Button */}
//       <button
//         onClick={toggleMobileSidebar}
//         className="lg:hidden bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
//       >
//         {isMobileSidebarOpen ? "Close Menu" : "Open Menu"}
//       </button>

//       {/* Mobile Sidebar */}
//       <MobileShopSideBar
//         isOpen={isMobileSidebarOpen}
//         onClose={closeMobileSidebar}
//       />

//       {/* Main content area */}
//       <div className="flex flex-col lg:flex-row mt-8">
//         {/* Desktop Sidebar */}
//         <div className="hidden lg:block w-full lg:w-1/4">
//           <DesktopShopSideBar />
//         </div>

//         {/* Main content area */}
//         <div className="w-full lg:w-3/4">
//           {/* Sorting and Display Controls */}
//           <div className="flex justify-between items-center mb-4">
//             <div className="results">
//               Showing 1–{productsToShow} of {products.length} results
//             </div>
//             <div className="controls">
//               <label htmlFor="show">Show </label>
//               <select
//                 id="show"
//                 value={productsToShow}
//                 onChange={handleProductLimitChange}
//               >
//                 <option value="12">12</option>
//                 <option value="15">15</option>
//                 <option value="30">30</option>
//               </select>
//               <span className="ml-2">Default sorting</span>
//             </div>
//           </div>

//           {/* Categories Section */}
//           {loading ? (
//             <div>Loading...</div>
//           ) : (
//             <ProductCategories products={products} />
//           )}

//           {/* Pagination Controls */}
//           <div className="flex justify-center mt-4">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
//             >
//               Previous
//             </button>

//             {/* Display page numbers */}
//             {[...Array(totalPages)].map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => handlePageChange(index + 1)}
//                 className={`px-4 py-2 mx-2 rounded-md ${
//                   currentPage === index + 1
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200"
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}

//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopMain;
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Import hook to read URL params
import DesktopShopSideBar from "./DesktopShopSideBar";
import MobileShopSideBar from "./MobileShopSideBar";
import ProductCategories from "./ProductCategories";
import { getProducts, searchProductsByName } from "../../mongo/productServices";

const ShopMain = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [productsToShow, setProductsToShow] = useState(9);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams(); // Get URL params

  const searchQuery = searchParams.get("query"); // Updated query parameter

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let data;
        if (searchQuery) {
          data = await searchProductsByName(searchQuery);
        } else {
          data = await getProducts(currentPage, productsToShow);
        }

        setProducts(data.products || []); // Ensure products is always an array
        setTotalPages(data.totalPages || 1); // Default to 1 if no totalPages
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, productsToShow, searchQuery]); // Re-fetch when page, limit, or search query changes

  return (
    <div className="mx-4 lg:mx-16 xl:mx-56 min-h-screen">
      <div className="font-semibold text-3xl lg:text-5xl flex justify-center items-center mt-12 lg:mt-16">
        Shop
      </div>

      <button
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        className="lg:hidden bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        {isMobileSidebarOpen ? "Close Menu" : "Open Menu"}
      </button>

      <MobileShopSideBar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex flex-col lg:flex-row mt-8">
        <div className="hidden lg:block w-full lg:w-1/4">
          <DesktopShopSideBar />
        </div>

        <div className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <div className="results">
              {searchQuery
                ? `Showing results for "${searchQuery}"`
                : `Showing 1–${productsToShow} of ${products.length} results`}
            </div>
            <div className="controls">
              <label htmlFor="show">Show </label>
              <select
                id="show"
                value={productsToShow}
                onChange={(e) => setProductsToShow(Number(e.target.value))}
              >
                <option value="9">9</option>
                <option value="12">12</option>
                <option value="15">15</option>
              </select>
              <span className="ml-2">Default sorting</span>
            </div>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : products.length > 0 ? (
            <ProductCategories products={products} />
          ) : (
            <div className="text-center text-gray-500 mt-4">
              No products found
            </div>
          )}

          {!searchQuery && totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 mx-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
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
