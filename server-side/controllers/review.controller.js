const Review = require("../models/Review"); // Adjust the path if necessary
const Product = require("../models/Product"); // Product model for updating avgRating and numReviews
const asyncHandler = require("express-async-handler"); // Error handling middleware

// Create a review
const createReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment } = req.body;

  // Check if the product exists
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Check if the user has already reviewed the product
  const alreadyReviewed = await Review.findOne({
    product: productId,
    user: req.user._id,
  });
  if (alreadyReviewed) {
    res.status(400);
    throw new Error("You have already reviewed this product");
  }

  // Create a new review
  const review = new Review({
    product: productId,
    user: req.user._id,
    rating,
    comment,
  });

  await review.save();

  // Update the product's avgRating and numReviews
  const reviews = await Review.find({ product: productId });
  product.numReviews = reviews.length;
  product.avgRating =
    reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

  await product.save();

  res.status(201).json({ message: "Review added successfully", review });
});

// Get all reviews for a product
const getReviewsForProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  // Check if the product exists
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Fetch reviews for the product
  const reviews = await Review.find({ product: productId }).populate(
    "user",
    "name email"
  );

  res.status(200).json(reviews);
});

// Update a review
const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  // Find the review by ID
  const review = await Review.findById(reviewId);

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  // Ensure the logged-in user is the owner of the review
  if (review.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You are not authorized to update this review");
  }

  // Update the review fields
  review.rating = rating || review.rating;
  review.comment = comment || review.comment;

  await review.save();

  res.status(200).json({ message: "Review updated successfully", review });
});

// Delete a review
const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  // Find the review by ID
  const review = await Review.findById(reviewId);

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  // Ensure the logged-in user is the owner of the review
  if (review.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You are not authorized to delete this review");
  }

  await review.remove();

  // Update the product's avgRating and numReviews
  const reviews = await Review.find({ product: review.product });
  const product = await Product.findById(review.product);

  product.numReviews = reviews.length;
  product.avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
      : 0;

  await product.save();

  res.status(200).json({ message: "Review deleted successfully" });
});

module.exports = {
  createReview,
  getReviewsForProduct,
  updateReview,
  deleteReview,
};
