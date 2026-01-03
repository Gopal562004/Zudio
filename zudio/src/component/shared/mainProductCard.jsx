
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Heart,
  ShoppingBag,
  Star,
  Minus,
  Plus,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  Home,
  Store,
  Package,
  Tag,
  Ruler,
  Calendar,
  TrendingUp,
  X,
  Check,
  Globe,
  ShieldCheck,
  TruckIcon,
} from "lucide-react";
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
    _id: "678d007791fa06593fad30ba",
    name: "adidas Cap",
    description: "Product Description",
    price: 29.99,
    brand: "adidas",
    category: "HATS",
    size: ["M"],
    stock: 42,
    images: [
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/5d435d60d6d84f269e9bacfa014fcf3b_9366/Logo_Baseball_Cap_Black_GR9691_01_standard.jpg",
      "https://cdn.pixelspray.io/v2/black-bread-289bfa/XUefL6/wrkr/t.resize(h:1355,w:1080)/data/mothercare/07092022img/410264668001_2.jpg",
    ],
    avgRating: 0,
    numReviews: 0,
    ratings: [],
    createdAt: "2025-01-19T13:39:03.984Z",
    updatedAt: "2025-01-28T19:31:43.694Z",
    __v: 2,
  };

  console.log("current pro:", product);

  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.size[0]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const data = await getProducts();
        const allProducts = data.products || [];
        const filtered = allProducts.filter((p) => p._id !== product._id);
        const shuffled = filtered.sort(() => 0.5 - Math.random());
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
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      if (isInCart) {
        let uptres = await updateCartItem(product._id, newQuantity);
        console.log(uptres);
      }
    }
  };

  const handleDecreaseQuantity = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (isInCart) {
        await updateCartItem(product._id, newQuantity);
      }
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
        toast.success("Removed from wishlist");
      } else {
        const newItem = await addToWishlist(productId);
        setWishlist((prev) => [...prev, newItem]);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast.error("Something went wrong while updating wishlist.");
    }
  };

  const handleImageNavigation = (direction) => {
    if (direction === "next") {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    } else {
      setSelectedImage(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Header/Breadcrumb */}
      <div className="border-b border-gray-100 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-1 text-xs sm:text-sm">
            <Link to="/" className="text-gray-500 hover:text-black transition">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <Link
              to="/shop"
              className="text-gray-500 hover:text-black transition"
            >
              Shop
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-black font-sm truncate max-w-[120px] sm:max-w-xs text-xs sm:text-sm">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Product Images - Compact */}
          <div className="space-y-2 sm:space-y-3">
            <div className="relative aspect-square overflow-hidden rounded">
              <button
                onClick={() => handleImageNavigation("prev")}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 p-1.5 sm:p-2 rounded-full shadow-xs hover:bg-white transition"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>

              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-4 sm:p-8"
              />

              <button
                onClick={() => handleImageNavigation("next")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 p-1.5 sm:p-2 rounded-full shadow-xs hover:bg-white transition"
              >
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleWishlist(product._id);
                }}
                className="absolute top-2 right-2 z-10 bg-white p-1.5 sm:p-2 rounded-full shadow-xs hover:shadow-sm transition"
              >
                <Heart
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                    wishlist.some((item) => item._id === product._id)
                      ? "fill-black stroke-black"
                      : "stroke-gray-400"
                  }`}
                />
              </button>
            </div>

            {/* Thumbnail Images - Compact */}
            <div className="grid grid-cols-4 gap-1 sm:gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded border transition-all ${
                    selectedImage === index
                      ? "border-black"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details - Compact */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    {product.brand}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleWishlist(product._id);
                  }}
                  className="lg:hidden p-1.5 hover:bg-gray-100 rounded-full transition"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      wishlist.some((item) => item._id === product._id)
                        ? "fill-black stroke-black"
                        : "stroke-gray-400"
                    }`}
                  />
                </button>
              </div>

              {/* Rating & Stock - Compact */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
                  <div className="flex">
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
                  <span className="ml-1.5 text-xs text-gray-600">
                    {product.avgRating || "0.0"}
                  </span>
                </div>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-600 flex items-center">
                  <Package className="w-3 h-3 mr-1" />
                  {product.stock} in stock
                </span>
                {product.numReviews > 0 && (
                  <>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-600">
                      {product.numReviews} reviews
                    </span>
                  </>
                )}
              </div>

              {/* Price - Prominent but Compact */}
              <div className="mb-4">
                <p className="text-2xl sm:text-3xl font-bold">
                  ${product.price}
                </p>
                {product.stock < 50 && (
                  <p className="text-xs text-red-600 font-medium mt-1">
                    Only {product.stock} left in stock!
                  </p>
                )}
              </div>

              {/* Description - Compact */}
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {product.description}
              </p>
            </div>

            {/* Product Specifications Grid - Compact */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-gray-100 pt-4">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-1.5">
                  <Tag className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-xs font-medium">Brand</span>
                </div>
                <p className="text-sm">{product.brand}</p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center space-x-1.5">
                  <Package className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-xs font-medium">Category</span>
                </div>
                <p className="text-sm">{product.category}</p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-xs font-medium">Updated</span>
                </div>
                <p className="text-sm">
                  {new Date(product.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Size Selection - Compact */}
            {product.size.length > 1 && (
              <div className="space-y-2 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium flex items-center">
                    <Ruler className="w-3.5 h-3.5 mr-1.5" />
                    Select Size
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {product.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs sm:text-sm text-center border transition-all ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Cart Actions - Compact */}
            <div className="space-y-3 border-t border-gray-100 pt-4">
              {!isInCart ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex items-center border border-gray-300 rounded self-start">
                    <button
                      onClick={handleDecreaseQuantity}
                      className="px-3 py-2 hover:bg-gray-50 transition"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 py-2 min-w-[40px] text-center text-sm font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncreaseQuantity}
                      className="px-3 py-2 hover:bg-gray-50 transition"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-black text-white py-2.5 text-sm font-medium hover:bg-gray-900 transition flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between border border-gray-300 rounded p-1.5">
                    <button
                      onClick={handleDecreaseQuantity}
                      className="p-1.5 hover:bg-gray-50 transition rounded"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium">
                      {quantity} in cart
                    </span>
                    <button
                      onClick={handleIncreaseQuantity}
                      className="p-1.5 hover:bg-gray-50 transition rounded"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => setIsInCart(false)}
                    className="text-xs text-gray-600 hover:text-black transition"
                  >
                    Remove from cart
                  </button>
                </div>
              )}

              <button
                onClick={handleBuyNow}
                className="w-full border-2 border-black text-black py-2.5 text-sm font-medium hover:bg-black hover:text-white transition"
              >
                Buy Now
              </button>
            </div>

            {/* Compact Features */}
            <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
              <div className="text-center p-2">
                <TruckIcon className="w-4 h-4 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center p-2">
                <ShieldCheck className="w-4 h-4 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Secure</p>
              </div>
              <div className="text-center p-2">
                <RefreshCw className="w-4 h-4 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products - Compact */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 sm:mt-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-bold">
                Related Products
              </h2>
              <Link
                to="/shop"
                className="text-xs sm:text-sm font-medium flex items-center hover:text-gray-600 transition gap-0.5"
              >
                View All
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {relatedProducts.map((item) => (
                <div key={item._id} className="group">
                  <Link
                    to={`/product/${item._id}`}
                    state={{ product: item }}
                    className="block"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50 rounded mb-2">
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleToggleWishlist(item._id);
                        }}
                        className="absolute top-1.5 right-1.5 bg-white p-1 rounded-full shadow-xs hover:shadow-sm transition"
                      >
                        <Heart
                          className={`w-3 h-3 ${
                            wishlist.some((w) => w._id === item._id)
                              ? "fill-black stroke-black"
                              : "stroke-gray-400"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="text-xs sm:text-sm font-medium truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {item.brand}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">${item.price}</span>
                        {item.avgRating > 0 && (
                          <div className="flex items-center">
                            <Star className="w-3 h-3 fill-gray-300 stroke-gray-300" />
                            <span className="text-xs text-gray-500 ml-0.5">
                              {item.avgRating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainProductCard;
