// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getWishlist, removeFromWishlist } from "../../mongo/wishlistServices";

// const Wishlist = () => {
//   const navigate = useNavigate();
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const data = await getWishlist();
//         console.log("Fetched wishlist:", data);

//         if (Array.isArray(data.wishlist)) {
//           setWishlist(data.wishlist);
//         } else {
//           console.warn("Wishlist response is not an array:", data);
//           setWishlist([]);
//         }
//       } catch (error) {
//         console.error("Error fetching wishlist:", error);
//         setWishlist([]);
//       }
//     };

//     fetchWishlist();
//   }, []);


//   const handleRemove = async (productId) => {
//     try {
//       await removeFromWishlist(productId);
//       setWishlist((prev) => prev.filter((item) => item._id !== productId));
//     } catch (error) {
//       console.error("Failed to remove item from wishlist:", error);
//     }
//   };
// const handleProductClick = (product) => {
//   console.log(product);
//   // Navigate to the product details page with the product data
//   navigate(`/product/${product._id}`, { state: { product } });
// };
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>

//       {wishlist.length === 0 ? (
//         <p className="text-gray-500">Your wishlist is empty.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {wishlist.map((product) => (
//             <div
//               key={product._id}
//               onClick={() => handleProductClick(product)}
//               className="relative bg-white p-1 transition"
//             >
//               <img
//                 src={product.images[0]} // First image
//                 alt={product.name}
//                 className="w-full h-80 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
//               />

//               {/* Show second image on hover */}
//               <img
//                 src={product.images[1]} // Second image
//                 alt={product.name}
//                 className="absolute inset-0 w-full h-80 object-cover opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100"
//               />
//               <h3 className="text-lg font-bold mb-1">{product.name}</h3>
//               <p className="text-gray-700">{product.description}</p>
//               <button
//                 onClick={() => handleRemove(product._id)}
//                 className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 hover:bg-red-600 text-sm"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getWishlist, removeFromWishlist } from "../../mongo/wishlistServices";
import {
  Heart,
  ShoppingBag,
  X,
  Star,
  Package,
  Eye,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const data = await getWishlist();

        if (Array.isArray(data.wishlist)) {
          setWishlist(data.wishlist);
        } else {
          setWishlist([]);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (productId, e) => {
    e.stopPropagation();
    try {
      await removeFromWishlist(productId);
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Failed to remove item from wishlist:", error);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Faster stagger
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3">
          <div className="text-center">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              Wishlist
            </h1>
            <nav className="flex items-center justify-center space-x-1 text-xs mt-2">
              <Link
                to="/"
                className="text-gray-500 hover:text-black transition"
              >
                Home
              </Link>
              <ChevronRight className="w-2.5 h-2.5 text-gray-300" />
              <Link
                to="/profile"
                className="text-gray-500 hover:text-black transition"
              >
                Profile
              </Link>
              <ChevronRight className="w-2.5 h-2.5 text-gray-300" />
              <span className="text-black font-medium">Wishlist</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
        {/* Loading State */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
            <p className="mt-2 text-xs text-gray-600">Loading...</p>
          </div>
        ) : wishlist.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-8"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <Heart className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium mb-1">Your wishlist is empty</h3>
            <p className="text-xs text-gray-600 mb-4">Save items you love</p>
            <button
              onClick={() => navigate("/shop")}
              className="text-xs bg-black text-white px-4 py-2 hover:bg-gray-900 transition"
            >
              Browse Products
            </button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {/* Header Stats - Compact */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-xs text-gray-600">
                <span className="font-medium">{wishlist.length}</span>{" "}
                {wishlist.length === 1 ? "item" : "items"}
              </div>
              <button
                onClick={() => navigate("/shop")}
                className="text-xs border border-black text-black px-3 py-1.5 hover:bg-black hover:text-white transition"
              >
                Continue Shopping
              </button>
            </div>

            {/* Compact Wishlist Items */}
            <AnimatePresence>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3"
              >
                {wishlist.map((product) => (
                  <motion.div
                    key={product._id}
                    variants={itemVariants}
                    layout
                    whileHover={{
                      y: -2,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                    className="border border-gray-100 rounded-sm hover:border-gray-300 transition cursor-pointer group bg-white"
                    onClick={() => handleProductClick(product)}
                  >
                    {/* Product Image - Compact */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <motion.img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />

                      {/* Hover Image */}
                      {product.images[1] && (
                        <motion.img
                          src={product.images[1]}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}

                      {/* Remove Button - Compact */}
                      <motion.button
                        onClick={(e) => handleRemove(product._id, e)}
                        className="absolute top-1 right-1 bg-white p-1 rounded shadow-xs hover:shadow-sm transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <X className="w-3 h-3" />
                      </motion.button>
                    </div>

                    {/* Product Details - Compact */}
                    <div className="p-2">
                      {/* Name and Price */}
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xs font-medium truncate flex-1 mr-1">
                          {product.name}
                        </h3>
                        <span className="text-xs font-bold whitespace-nowrap">
                          ${product.price}
                        </span>
                      </div>

                      {/* Brand */}
                      <p className="text-xs text-gray-500 mb-1 truncate">
                        {product.brand}
                      </p>

                      {/* Rating - Compact */}
                      {product.avgRating > 0 && (
                        <div className="flex items-center gap-0.5 mb-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-2 h-2 ${
                                  i < Math.floor(product.avgRating)
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
                      )}

                      {/* Quick Actions */}
                      <div className="flex gap-1 mt-2">
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Add to cart
                            console.log("Add to cart:", product._id);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 bg-black text-white text-xs py-1.5 rounded hover:bg-gray-900 transition flex items-center justify-center"
                        >
                          <ShoppingBag className="w-3 h-3" />
                        </motion.button>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-8 border border-black text-black text-xs py-1.5 rounded hover:bg-black hover:text-white transition flex items-center justify-center"
                        >
                          <Eye className="w-3 h-3" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Compact Footer */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <p className="text-xs text-gray-600">Items saved for 30 days</p>
                <button
                  onClick={() => navigate("/cart")}
                  className="text-xs bg-black text-white px-4 py-2 hover:bg-gray-900 transition flex items-center gap-1"
                >
                  <ShoppingBag className="w-3 h-3" />
                  View Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
