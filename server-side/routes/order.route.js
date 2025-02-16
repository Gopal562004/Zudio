const express = require("express");
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const {
  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/order.controller");

const router = express.Router();

// Place a new order
router.post("/", protect, placeOrder);

// Get orders of the logged-in user
router.get("/my-orders", protect, getUserOrders);

// Get order details by ID
router.get("/:id", protect, getOrderById);

// Update order status (Admin only)
router.put("/:id/status", protect, isAdmin, updateOrderStatus);

// Delete an order (Admin only)
router.delete("/:id", protect, isAdmin, deleteOrder);

module.exports = router;
