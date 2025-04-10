const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const productRoutes =require("./routes/product.route");
const cartRoutes = require("./routes/cart.route");
const orderRoutes = require("./routes/order.route");
const wishlistRoutes = require("./routes/wishlist.route")
// Load environment variables
dotenv.config();

// MongoDB connection
const connectDB = require("./config/db");
connectDB();

const app = express();

// Middleware
//app.use(cors());
const allowedOrigins = ['https://zudio-seven.vercel.app']; // ✅ your frontend domain

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // ✅ allow cookies, auth headers
  })
);
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/products",productRoutes);
app.use("/carts", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/wishlist", wishlistRoutes);
// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
};

app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
