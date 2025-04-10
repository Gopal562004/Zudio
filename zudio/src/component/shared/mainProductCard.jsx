// import React, { useState } from "react";
// import { useLocation, useParams, useNavigate,Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import { addItemToCart, updateCartItem } from "../../mongo/cartServices"; // Import cart services

// const MainProductCard = () => {
//   const { productId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Dummy product data if no product is passed via state
//   const product = location.state?.product || {
//     name: "H&M Slim Fit Chinos",
//     description: "Slim fit chinos in a variety of colors for a versatile look.",
//     price: 50,
//     brand: "H&M",
//     category: "PANTS",
//     size: ["S", "M", "L", "XL"],
//     stock: 180,
//     images: [
//       "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F14%2F27%2F1427a7bd6c055a3af0570dea9243090e97ed101f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_trousers_chinos_slim_all%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLqEYWplfifkBKLjhHpTG30_3i9WFaCnzA3RANSdTcL-mzuqZqwE7s87vATcyYebztWpY&usqp=CAU",
//     ],
//     avgRating: 4.5,
//     numReviews: 120,
//     ratings: [5, 4, 3, 5, 4],
//     _id: "6799373218602c030f0bf7f8",
//     createdAt: "2025-01-28T19:59:46.348Z",
//   };

//   const [quantity, setQuantity] = useState(1);
//   const [isInCart, setIsInCart] = useState(false);

//   const handleAddToCart = async () => {
//     try {
//       let res=await addItemToCart(product._id, quantity);
//       console.log(res)
//       setIsInCart(true);
//       toast.success("Added to cart!");
//     } catch (error) {
//       toast.error("Error adding item to cart or login first");
//     }
//   };

//  const handleIncreaseQuantity = async () => {
//    if (quantity < product.stock) {
//      setQuantity(quantity + 1);
//      let uptres = await updateCartItem(product._id, quantity + 1);
//      console.log(uptres);
//    }
//  };

//  const handleDecreaseQuantity = async () => {
//    if (quantity > 1) {
//      setQuantity(quantity - 1);
//      await updateCartItem(product._id, quantity - 1);
//    }
//  };

//   const handleBuyNow = () => {
//     navigate("/checkout", { state: { product, quantity } });
//   };

//   return (
//     <div>
//       <div className="max-w-5xl mx-auto p-4">
//         <p className="text-sm text-gray-500 cursor-pointer pt-2 my-5">
//           <Link to="/" className="font-medium text-gray-800">
//             Home
//           </Link>{" "}
//           <Link to="/shop" className="font-medium text-gray-800">
//             / Shop
//           </Link>{" "}
//           / {product._id}
//         </p>
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Product Images */}
//           <div className="flex-1">
//             <img
//               src={product.images[0]}
//               alt={product.name}
//               className="w-full h-96 object-cover rounded-lg"
//             />
//             <div className="flex mt-2 gap-2">
//               {product.images.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img}
//                   alt={`Thumbnail ${index}`}
//                   className="w-16 h-16 object-cover rounded-lg cursor-pointer"
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Product Details */}
//           <div className="flex-1">
//             <h1 className="text-2xl font-bold">{product.name}</h1>
//             <p className="text-gray-600 mt-2">{product.description}</p>
//             <p className="text-lg font-semibold mt-2">
//               Price: ${product.price}
//             </p>
//             <p className="text-sm text-gray-500 mt-1">Stock: {product.stock}</p>
//             <p className="text-sm text-gray-500 mt-1">Brand: {product.brand}</p>
//             <p className="text-sm text-gray-500 mt-1">
//               Category: {product.category}
//             </p>
//             <p className="text-sm text-gray-500 mt-1">
//               Available Sizes: {product.size.join(", ")}
//             </p>
//             <p className="text-sm text-gray-500 mt-1">
//               Rating: ⭐ {product.avgRating} ({product.numReviews} reviews)
//             </p>

//             {/* Add to Cart & Buy Now Buttons */}
//             {!isInCart ? (
//               <button
//                 onClick={handleAddToCart}
//                 className="w-full py-3 mt-4 bg-gray-800 text-white  hover:bg-gray-700 transition"
//               >
//                 Add to Cart
//               </button>
//             ) : (
//               <div className="mt-4 flex items-center gap-4">
//                 <button
//                   onClick={handleDecreaseQuantity}
//                   className="bg-gray-200 px-4 py-2"
//                 >
//                   −
//                 </button>
//                 <span className="text-lg font-semibold">{quantity}</span>
//                 <button
//                   onClick={handleIncreaseQuantity}
//                   className="bg-gray-200 px-4 py-2"
//                 >
//                   +
//                 </button>
//               </div>
//             )}

//             <button
//               onClick={handleBuyNow}
//               className="w-full py-3 mt-4 bg-black text-white transition"
//             >
//               Buy Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainProductCard;
import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // at top
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { addItemToCart, updateCartItem } from "../../mongo/cartServices";
import { getProducts } from "../../mongo/productServices";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../../mongo/wishlistServices";
const MainProductCard = () => {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product || {
    name: "H&M Slim Fit Chinos",
    description: "Slim fit chinos in a variety of colors for a versatile look.",
    price: 50,
    brand: "H&M",
    category: "PANTS",
    size: ["S", "M", "L", "XL"],
    stock: 180,
    images: [
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F14%2F27%2F1427a7bd6c055a3af0570dea9243090e97ed101f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_trousers_chinos_slim_all%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLqEYWplfifkBKLjhHpTG30_3i9WFaCnzA3RANSdTcL-mzuqZqwE7s87vATcyYebztWpY&usqp=CAU",
    ],
    avgRating: 4.5,
    numReviews: 120,
    ratings: [5, 4, 3, 5, 4],
    _id: "6799373218602c030f0bf7f8",
    createdAt: "2025-01-28T19:59:46.348Z",
  };

  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
const [wishlist, setWishlist] = useState([]);
 useEffect(() => {
   const fetchRelated = async () => {
     try {
       const data = await getProducts();
       const allProducts = data.products || [];

       // Exclude current product
       const filtered = allProducts.filter((p) => p._id !== product._id);

       // Shuffle the filtered products randomly
       const shuffled = filtered.sort(() => 0.5 - Math.random());

       // Get the first 4 random products
       const randomRelated = shuffled.slice(0, 4);

       setRelatedProducts(randomRelated);
     } catch (error) {
       console.error("Failed to fetch related products", error.message);
     }
   };


   fetchRelated();
 }, [product]);


  const handleAddToCart = async () => {
    try {
      let res = await addItemToCart(product._id, quantity);
      console.log(res);
      setIsInCart(true);
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Error adding item to cart or login first");
    }
  };

  const handleIncreaseQuantity = async () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
      let uptres = await updateCartItem(product._id, quantity + 1);
      console.log(uptres);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      await updateCartItem(product._id, quantity - 1);
    }
  };

  const handleBuyNow = () => {
    navigate("/checkout", { state: { product, quantity } });
  };

const handleToggleWishlist = async (productId) => {
  try {
    const isWishlisted = wishlist.some((item) => item._id === productId);

    if (isWishlisted) {
      await removeFromWishlist(productId);
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
      toast.info("Removed from wishlist ❤️‍🩹");
    } else {
      const newItem = await addToWishlist(productId);
      setWishlist((prev) => [...prev, newItem]);
      toast.success("Added to wishlist ❤️");
    }
  } catch (error) {
    console.error("Error toggling wishlist:", error);
    toast.error("Something went wrong while updating wishlist.");
  }
};


  return (
    <div>
      <div className="max-w-5xl mx-auto p-4">
        <p className="text-sm text-gray-500 cursor-pointer pt-2 my-5">
          <Link to="/" className="font-medium text-gray-800">
            Home
          </Link>{" "}
          <Link to="/shop" className="font-medium text-gray-800">
            / Shop
          </Link>{" "}
          / {product._id}
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Images */}

          <div className="flex-1 relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleWishlist(product._id);
              }}
              className="absolute top-2 right-2 z-10 bg-white/80 p-2 rounded-full transition text-lg"
            >
              {wishlist.some((item) => item._id === product._id) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-500 hover:text-red-500" />
              )}
            </button>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
            <div className="flex mt-2 gap-2">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className="w-16 h-16 object-cover  cursor-pointer"
                />
              ))}
            </div>
          </div>
          {/* Product Details */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-lg font-semibold mt-2">
              Price: ${product.price}
            </p>
            <p className="text-sm text-gray-500 mt-1">Stock: {product.stock}</p>
            <p className="text-sm text-gray-500 mt-1">Brand: {product.brand}</p>
            <p className="text-sm text-gray-500 mt-1">
              Category: {product.category}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Available Sizes: {product.size.join(", ")}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Rating: ⭐ {product.avgRating} ({product.numReviews} reviews)
            </p>

            {/* Add to Cart / Quantity Update */}
            {!isInCart ? (
              <button
                onClick={handleAddToCart}
                className="w-full py-3 mt-4 bg-gray-800 text-white hover:bg-gray-700 transition"
              >
                Add to Cart
              </button>
            ) : (
              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={handleDecreaseQuantity}
                  className="bg-gray-200 px-4 py-2"
                >
                  −
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={handleIncreaseQuantity}
                  className="bg-gray-200 px-4 py-2"
                >
                  +
                </button>
              </div>
            )}

            <button
              onClick={handleBuyNow}
              className="w-full py-3 mt-4 bg-black text-white transition"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-5xl font-normal font-montserrat mb-4 text-center lg:mb-24">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
              {relatedProducts.map((item) => (
                <Link
                  to={`/product/${item._id}`}
                  state={{ product: item }}
                  key={item._id}
                  className="p-2 transition group"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden lg:h-80">
                    {/* Default Image */}
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                    />
                    {/* Hover Image */}
                    {item.images?.[1] && (
                      <img
                        src={item.images[1]}
                        alt={`${item.name} alternate`}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    )}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold font-montserrat">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">{item.brand}</p>
                  <p className="text-sm font-bold text-black">${item.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainProductCard;
