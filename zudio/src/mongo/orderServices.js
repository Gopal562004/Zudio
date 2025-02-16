import axios from "axios";

const API_URL = "http://localhost:3000/orders";

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem("zudioToken");
};

// Place a new order
export const placeOrder = async (orderData) => {
  const token = getToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, orderData, config);
  return response.data;
};

// Get orders of the logged-in user
export const getUserOrders = async () => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/my-orders`, config);
  return response.data;
};

// Get order details by ID
export const getOrderById = async (orderId) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${orderId}`, config);
  return response.data;
};

// Update order status (Admin only)
export const updateOrderStatus = async (orderId, orderStatus) => {
  const token = getToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/${orderId}/status`,
    { orderStatus },
    config
  );
  return response.data;
};

// Delete an order (Admin only)
export const deleteOrder = async (orderId) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${orderId}`, config);
  return response.data;
};
