import axios from "axios";

// Base URL for your API
const API_URL = "http://localhost:3000/";

// Axios instance with default configuration
const api = axios.create({
  baseURL: API_URL,
});

// Get the JWT token from localStorage (or wherever you store it)
const getAuthToken = () => {
  return localStorage.getItem("zudioToken"); // Or use your preferred method
};

// Add the token to the request headers
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

// Create a new product (Admin only)
export const createProduct = async (productData) => {
  try {
    const response = await api.post("/", productData);
    return response.data; // The created product object
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating product");
  }
};

// Update an existing product (Admin only)
export const updateProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/${productId}`, productData);
    return response.data; // The updated product object
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating product");
  }
};

// Delete a product (Admin only)
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/${productId}`);
    return response.data; // Success message
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error deleting product");
  }
};

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
    return response.data; // Products array and pagination info
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching products");
  }
};

// Get a single product by ID
export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/${productId}`);
    return response.data; // The product object
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching product");
  }
};

// Search products by name
export const searchProductsByName = async (searchQuery) => {
  try {
    const response = await api.get("/products", {
      params: { search: searchQuery },
    });
    return response.data; // List of matching products
  } catch (error) {
    console.error("Error searching products:", error);
    return []; // Return an empty array to avoid breaking the UI
  }
};

