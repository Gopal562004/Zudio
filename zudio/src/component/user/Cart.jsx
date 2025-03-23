import React, { useEffect, useState } from "react";
import {
  getCart,
  updateCartItem,
  removeItemFromCart,
  clearCart,
} from "../../mongo/cartServices";

const Cart = () => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Shopping Bag Title */}
      <h1 className="text-2xl font-bold border-b pb-3">MY SHOPPING BAG</h1>

      {/* Cart Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Product List */}
        <div className="lg:col-span-2">
          {loading ? (
            <p className="text-gray-500">Loading cart...</p>
          ) : cart.items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center justify-between border-b py-4"
              >
                {/* Product Image */}
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover mb-4 sm:mb-0"
                />

                {/* Product Details */}
                <div className="flex flex-col flex-1 text-center sm:text-left px-4">
                  <h2 className="text-lg font-semibold">{item.product.name}</h2>
                  <p className="text-gray-500 text-sm">
                    Category: {item.product.category}
                  </p>
                  <p className="text-sm">Color: Black</p>
                  <p className="text-sm">Size: M</p>
                </div>

                {/* Price & Quantity Controls */}
                <div className="flex flex-col sm:flex-row items-center space-x-4">
                  <p className="font-semibold">
                    ${item.product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleDecreaseQuantity(item._id, item.quantity)
                      }
                      className="px-3 py-1 border border-black text-black hover:bg-black hover:text-white transition"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleIncreaseQuantity(item._id, item.quantity)
                      }
                      className="px-3 py-1 border border-black text-black hover:bg-black hover:text-white transition"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-500 hover:underline mt-2 sm:mt-0"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 p-6">
          <h2 className="text-lg font-bold border-b pb-2">SUMMARY</h2>

          {/* Coupon Code */}
          <div className="mt-4">
            <p className="text-sm">Do you have a promo code?</p>
            <div className="flex mt-2">
              <input
                type="text"
                placeholder="Enter code"
                className="border px-3 py-2 w-full text-sm"
              />
              <button className="ml-2 px-4 py-2 bg-black text-white text-sm">
                APPLY
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p>${cart.totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping:</p>
              <p>$10.00</p>
            </div>
            <div className="flex justify-between">
              <p>Sales Tax:</p>
              <p>$15.00</p>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <p>Estimated Total:</p>
              <p>${(cart.totalPrice + 10 + 15).toFixed(2)}</p>
            </div>
          </div>

          {/* Checkout Button */}
          <button className="mt-4 w-full py-3 bg-black text-white text-sm hover:opacity-80 transition">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
