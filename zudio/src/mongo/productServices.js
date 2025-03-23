import axios from "axios";

// Load API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL; // Fallback for local dev

// Axios instance with default configuration
const api = axios.create({
  baseURL: API_URL,
});

// Get the JWT token from localStorage
const getAuthToken = () => localStorage.getItem("zudioToken");

// Attach the token to the request headers
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =====================
// ✅ Product API Calls
// =====================

// Get all products with pagination, sorting, and filters
export const getProducts = async (
  page = 1,
  size = 10,
  sort = "price_asc",
  category = "",
  search = "",
  minPrice = 0,
  maxPrice = 10000
) => {
  try {
    const response = await api.get("/products", {
      params: { page, size, sort, category, search, minPrice, maxPrice },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching products");
  }
};

// Get a single product by ID
export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching product");
  }
};

// Create a new product (Admin only)
export const createProduct = async (productData) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating product");
  }
};

// Update an existing product (Admin only)
export const updateProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating product");
  }
};

// Delete a product (Admin only)
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error deleting product");
  }
};

// Search products by name
export const searchProductsByName = async (searchQuery) => {
  try {
    const response = await api.get("/products", { params: { search: searchQuery } });
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

