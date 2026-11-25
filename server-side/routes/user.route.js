const express = require("express");
const router = express.Router();
const {
  registerUser,
  forgotPassword,
  resetPassword,
  loginUser,
  getInTouch,
  getMe,
  updateMe,
  changePassword,
} = require("../controllers/user.controller");
const { isAdmin, protect } = require("../middlewares/authMiddleware");
// Route for registering a user
router.post("/register", registerUser);

// Route for logging in with email and password
router.post("/login", loginUser);
// Route for requesting a password reset (forgot password)
router.post("/forgot-password", forgotPassword);
router.post("/resetPassword", resetPassword);
// Route for OTP-based login (requesting OTP)
// router.post("/otp-login", otpLogin);
router.post("/contact", getInTouch);

// Protected profile & settings routes
router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);
router.put("/change-password", protect, changePassword);

module.exports = router;
