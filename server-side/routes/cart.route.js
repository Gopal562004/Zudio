const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  getCart,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
  clearCart,
} = require("../controllers/cart.controller");

const router = express.Router();

// Add an item to the cart
router.post("/", protect, addItemToCart);

// Get the cart for the logged-in user
router.get("/", protect, getCart);

// Update the quantity of an item in the cart
router.put("/:itemId", protect, updateCartItem);

// Remove an item from the cart
router.delete("/:itemId", protect, removeItemFromCart);

// Clear the entire cart
router.delete("/", protect, clearCart);

module.exports = router;
