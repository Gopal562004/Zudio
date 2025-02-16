import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addItemToCart, updateCartItem } from "../../mongo/cartServices"; // Import cart services

const MainProductCard = () => {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Dummy product data if no product is passed via state
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

  const handleAddToCart = async () => {
    try {
      let res=await addItemToCart(product._id, quantity);
      console.log(res)
      setIsInCart(true);
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Error adding item to cart");
    }
  };

  const handleIncreaseQuantity = async () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
      let uptres=await updateCartItem(product._id, quantity + 1);
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

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Images */}
        <div className="flex-1">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="flex mt-2 gap-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className="w-16 h-16 object-cover rounded-lg cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-lg font-semibold mt-2">Price: ${product.price}</p>
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

          {/* Add to Cart & Buy Now Buttons */}
          {!isInCart ? (
            <button
              onClick={handleAddToCart}
              className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          ) : (
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={handleDecreaseQuantity}
                className="bg-gray-200 px-4 py-2 rounded-md"
              >
                −
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className="bg-gray-200 px-4 py-2 rounded-md"
              >
                +
              </button>
            </div>
          )}

          <button
            onClick={handleBuyNow}
            className="w-full py-3 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainProductCard;
