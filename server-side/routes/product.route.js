const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  searchProductsByName,
} = require("../controllers/product.controller");
const { isAdmin, protect } = require("../middlewares/authMiddleware");

// Admin only routes
router.post("/create",protect, isAdmin, createProduct); // Create product
router.put("/:id", protect, isAdmin, updateProduct); // Update product
router.delete("/:id", protect, isAdmin, deleteProduct); // Delete product

// Accessible by all
router.get("/", getProducts); // Get all products
router.get("/search", protect, searchProductsByName); // Search product by name
router.get("/:id", protect, getProductById); // Get product by ID

module.exports = router;
