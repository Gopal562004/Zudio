import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWishlist, removeFromWishlist } from "../../mongo/wishlistServices";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();
        console.log("Fetched wishlist:", data);

        if (Array.isArray(data.wishlist)) {
          setWishlist(data.wishlist);
        } else {
          console.warn("Wishlist response is not an array:", data);
          setWishlist([]);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setWishlist([]);
      }
    };

    fetchWishlist();
  }, []);


  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Failed to remove item from wishlist:", error);
    }
  };
const handleProductClick = (product) => {
  console.log(product);
  // Navigate to the product details page with the product data
  navigate(`/product/${product._id}`, { state: { product } });
};
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((product) => (
            <div
              key={product._id}
              
              className="relative bg-white p-1 transition"
            >
              <img
                
                src={product.images[0]} // First image
                alt={product.name}
                className="w-full h-80 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
              />

              {/* Show second image on hover */}
              <img
          
                src={product.images[1]} // Second image
                alt={product.name}
                className="absolute inset-0 w-full h-80 object-cover opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100"
              />
              <h3 className="text-lg font-bold mb-1"
                onClick={() => handleProductClick(product)}>{product.name}</h3>
              <p className="text-gray-700"
                onClick={() => handleProductClick(product)}>{product.description}</p>
              <button
                onClick={() => handleRemove(product._id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
