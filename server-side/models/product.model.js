const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [2, "Product name must be at least 2 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"]
    },
    size: {
      type: [String],
      required: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
    },
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    ratings: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
