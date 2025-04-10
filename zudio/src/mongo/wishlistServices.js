import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/wishlist`;

// Helper to get the token from localStorage
const getToken = () => {
  return localStorage.getItem("zudioToken");
};

// GET: Fetch wishlist for the logged-in user
export const getWishlist = async () => {
  const res = await axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    withCredentials: true,
  });
  return res.data;
};

// POST: Add a product to the wishlist (productId in body)
export const addToWishlist = async (productId) => {
  const res = await axios.post(
    `${API_URL}/add`,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      withCredentials: true,
    }
  );
  return res.data;
};

// DELETE: Remove a product from the wishlist (productId in body)
export const removeFromWishlist = async (productId) => {
  const res = await axios.delete(`${API_URL}/remove`, {
    data: { productId }, // ✅ sent in body
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    withCredentials: true,
  });
  return res.data;
};
