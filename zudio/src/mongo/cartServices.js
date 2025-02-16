import axios from "axios";

const API_URL = "http://localhost:3000/carts"; // Change URL based on your backend

// Function to get token from localStorage
const getToken = () => {
  return localStorage.getItem("zudioToken");
};

// Axios instance with Authorization header
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to attach the token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Get user cart
export const getCart = async () => {
  try {
    const response = await axiosInstance.get("/");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error fetching cart";
  }
};

// Add item to cart
export const addItemToCart = async (productId, quantity) => {
  try {
    const response = await axiosInstance.post("/", { productId, quantity });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error adding item to cart";
  }
};

// Update item quantity in cart
export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await axiosInstance.put(`/${itemId}`, { quantity });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error updating cart item";
  }
};

// Remove item from cart
export const removeItemFromCart = async (itemId) => {
  try {
    const response = await axiosInstance.delete(`/${itemId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error removing item from cart";
  }
};

// Clear entire cart
export const clearCart = async () => {
  try {
    const response = await axiosInstance.delete("/");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error clearing cart";
  }
};
