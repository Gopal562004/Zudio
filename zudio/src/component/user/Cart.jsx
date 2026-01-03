
import React, { useEffect, useState } from "react";
import {
  getCart,
  updateCartItem,
  removeItemFromCart,
  clearCart,
} from "../../mongo/cartServices";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Home,
  ShoppingBag,
  X,
  Plus,
  Minus,
  Tag,
  Truck,
  Receipt,
  ShoppingCart,
  ArrowRight,
  Package,
  Trash2,
} from "lucide-react";

const Cart = () => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCart();
      if (response && Array.isArray(response.items)) {
        setCart(response);
      } else {
        setCart({ items: [], totalPrice: 0 });
      }
    } catch (error) {
      setError(error.message || "Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseQuantity = async (itemId, quantity) => {
    await updateCartItem(itemId, quantity + 1);
    fetchCart();
  };

  const handleDecreaseQuantity = async (itemId, quantity) => {
    if (quantity > 1) {
      await updateCartItem(itemId, quantity - 1);
      fetchCart();
    }
  };

  const handleRemoveItem = async (itemId) => {
    await removeItemFromCart(itemId);
    fetchCart();
  };

  const handleClearCart = async () => {
    await clearCart();
    fetchCart();
  };

  const handleProductClick = (item) => {
    navigate(`/product/${item.product._id}`, { state: { item } });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const calculateTotal = () => {
    const subtotal = cart.totalPrice || 0;
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08; // 8% tax
    return {
      subtotal,
      shipping,
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat((subtotal + shipping + tax).toFixed(2)),
    };
  };

  const totals = calculateTotal();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center justify-center gap-2">
              {/* <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" /> */}
              Shopping Cart
            </h1>
            <nav className="flex items-center justify-center gap-1.5 text-xs sm:text-sm mt-2">
              <button
                onClick={() => navigate("/")}
                className="text-gray-500 hover:text-black transition"
              >
                Home
              </button>
              <span className="text-gray-300">›</span>
              <span className="text-black font-sm">Cart</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Cart Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            <p className="mt-3 text-sm text-gray-600">Loading your cart...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <X className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchCart}
              className="mt-4 text-sm border border-black text-black px-4 py-2 hover:bg-black hover:text-white transition"
            >
              Try Again
            </button>
          </div>
        ) : cart.items.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-sm text-gray-600 mb-6">
              Add items to get started
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="text-sm bg-black text-white px-6 py-3 hover:bg-gray-900 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold">
                  {cart.items.length}{" "}
                  {cart.items.length === 1 ? "Item" : "Items"}
                </h2>
                <button
                  onClick={handleClearCart}
                  className="text-xs text-gray-600 hover:text-black transition flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear Cart
                </button>
              </div>

              {/* Cart Items List */}
              <div className="space-y-3">
                {cart.items.map((item) => (
                  <div
                    key={item._id}
                    className="border border-gray-100 rounded p-3 sm:p-4 hover:border-gray-300 transition group"
                  >
                    <div className="flex gap-3 sm:gap-4">
                      {/* Product Image */}
                      <div
                        className="relative flex-shrink-0 cursor-pointer"
                        onClick={() => handleProductClick(item)}
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity rounded"></div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3
                              onClick={() => handleProductClick(item)}
                              className="text-sm font-medium truncate cursor-pointer hover:text-gray-600 transition"
                            >
                              {item.product.name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                              {item.product.brand}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded">
                                Size: {item.size || "M"}
                              </span>
                              <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded">
                                Color: Black
                              </span>
                            </div>
                          </div>

                          {/* Price */}
                          <p className="text-sm font-bold">
                            ${item.product.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              onClick={() =>
                                handleDecreaseQuantity(item._id, item.quantity)
                              }
                              className="px-2 py-1.5 hover:bg-gray-50 transition"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1.5 text-sm font-medium min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleIncreaseQuantity(item._id, item.quantity)
                              }
                              className="px-2 py-1.5 hover:bg-gray-50 transition"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-xs text-gray-500 hover:text-black transition flex items-center gap-1"
                          >
                            <X className="w-3 h-3" />
                            Remove
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right mt-2">
                          <p className="text-xs text-gray-500">
                            Subtotal:{" "}
                            <span className="font-medium">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-gray-100 rounded p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Receipt className="w-5 h-5" />
                  <h2 className="text-sm font-semibold">Order Summary</h2>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <label className="text-xs font-medium">Promo Code</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 text-sm border border-gray-300 px-3 py-2 rounded focus:ring-1 focus:ring-black focus:border-black transition"
                    />
                    <button className="px-3 py-2 text-xs border border-black text-black hover:bg-black hover:text-white transition">
                      APPLY
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2.5 text-sm mb-6">
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ${totals.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      Shipping
                    </span>
                    <span className="font-medium">
                      {totals.shipping === 0
                        ? "FREE"
                        : `$${totals.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">
                      ${totals.tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="font-semibold">Total</span>
                    <span className="text-lg font-bold">
                      ${totals.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {totals.subtotal < 100 && (
                  <div className="mb-6 p-3 bg-gray-50 rounded text-xs">
                    <p className="text-gray-600">
                      Add{" "}
                      <span className="font-medium">
                        ${(100 - totals.subtotal).toFixed(2)}
                      </span>{" "}
                      more for{" "}
                      <span className="font-medium">FREE shipping</span>
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white text-sm font-medium px-4 py-3 rounded hover:bg-gray-900 transition flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={() => navigate("/shop")}
                  className="w-full mt-3 border border-black text-black text-sm font-medium px-4 py-3 rounded hover:bg-black hover:text-white transition"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-4 border border-gray-100 rounded p-4">
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                  <div className="text-center">
                    <Package className="w-5 h-5 mx-auto mb-1" />
                    <p>Free shipping on orders over $100</p>
                  </div>
                  <div className="text-center">
                    <Truck className="w-5 h-5 mx-auto mb-1" />
                    <p>Estimated delivery: 2-5 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
