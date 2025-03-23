import axios from "axios";

// Directly setting the API base URL
const API_BASE_URL = "http://localhost:3000/";

// Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/register", userData);
    console.log(response)
    return response.data; // Ensure you return the data from the API response
  } catch (error) {
    console.log(error);
    throw error.response?.data || { message: "An error occurred" };
  }
};

// Forgot Password
export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post("/users/forgot-password", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred" };
  }
};

// Reset Password
export const resetPassword = async (resetData) => {
  try {
    const response = await axiosInstance.post(
      "/users/resetPassword",
      resetData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred" };
  }
};

// Login User
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/users/login", credentials);
    console.log(response);
    localStorage.setItem("zudioToken",response.data.token)
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred" };
  }
};

// Function to send the contact form
// Send Contact Form
export const sendContactForm = async (formData) => {
  try {
    const response = await axiosInstance.post("/users/contact", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Something went wrong";
  }
};