const Product = require("../models/product.model");
const asyncHandler = require("express-async-handler");

// Create a new product (Only Admin can create)
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, brand, category, size, stock, images } =
    req.body;

  if (
    !name ||
    !description ||
    !price ||
    !brand ||
    !category ||
    !size ||
    !stock ||
    !images
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const product = new Product({
      name,
      description,
      price,
      brand,
      category,
      size,
      stock,
      images,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
});

// Update a product (Only Admin can update)
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, brand, category, size, stock, images } =
    req.body;
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.size = size || product.size;
    product.stock = stock || product.stock;
    product.images = images || product.images;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
});

// Delete a product (Only Admin can delete)
const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.remove();
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
});

// Get all products (Accessible by all users)
const getProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    size = 10,
    sort,
    category,
    search,
    minPrice,
    maxPrice,
  } = req.query;

  const filter = {};
  if (category) {
    filter.category = category;
  }
  if (search) {
    filter.name = { $regex: search, $options: "i" }; // Case-insensitive search by name
  }
  if (minPrice && maxPrice) {
    filter.price = { $gte: minPrice, $lte: maxPrice };
  }

  const sortOptions = {};
  if (sort === "price_asc") {
    sortOptions.price = 1; // Ascending order
  } else if (sort === "price_desc") {
    sortOptions.price = -1; // Descending order
  }

  try {
    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * size)
      .limit(size);

    const count = await Product.countDocuments(filter);
    res.status(200).json({ products, page, pages: Math.ceil(count / size) });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

// Get product by ID (Accessible by all users)
const getProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
});

// Get products by search by name (Accessible by all users)
const searchProductsByName = asyncHandler(async (req, res) => {
  const { search } = req.query;

  try {
    const products = await Product.find({
      name: { $regex: search, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching products", error: error.message });
  }
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  searchProductsByName,
};
