const express = require("express");
const router = express.Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlist.controller");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getWishlist);
router.post("/add", protect, addToWishlist);
router.delete("/remove", protect, removeFromWishlist);

module.exports = router;
