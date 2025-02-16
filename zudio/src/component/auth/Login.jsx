import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { loginUser } from "../../mongo/authServices"; // Import the loginUser function
import { toast } from "react-toastify"; // For displaying notifications

const Login = () => {
  const [email, setEmail] = useState(""); // State for username input
  const [password, setPassword] = useState(""); // State for password input
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({}); // Store validation errors
  const navigate = useNavigate(); // Initialize navigate

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUpRedirect = () => {
    navigate("/auth/signup");
  };

  const handleForgotPassword = () => {
    navigate("/auth/forgot-password");
  };

  // Validation function for login form
  const validateForm = () => {
    const newErrors = {};

    // Email validation (basic format check)
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    } else {
      // Enhanced password validation for a-z, A-Z, special character, and number
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        newErrors.password =
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform client-side validation
    if (!validateForm()) {
      return;
    }

    try {
      const response = await loginUser({ email, password });
      toast.success("Login successful!");
       setTimeout(() => {
         navigate("/"); // Navigate to Home page after the Toast
       }, 1000);  // Redirect to a protected route
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-center text-xl font-semibold mb-4 text-black">
          CUSTOMER LOGIN
        </h2>
        <div className="border-t-2 border-black mx-auto w-20 mb-6"></div>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 text-gray-500">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-grow py-2 px-4 text-sm outline-none bg-transparent ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email}</span>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 text-gray-500">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`flex-grow py-2 px-4 text-sm outline-none bg-transparent ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <span
                onClick={togglePasswordVisibility}
                className="px-3 text-gray-500 cursor-pointer"
              >
                <i
                  className={
                    passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"
                  }
                ></i>
              </span>
            </div>
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password}</span>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-4">
            <a
              onClick={handleForgotPassword}
              href="#"
              className="text-sm text-gray-500 hover:text-black transition"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
          >
            LOGIN
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-4 text-gray-500">Or</div>

        {/* Social Media Login */}
        <div className="flex justify-center gap-4 mb-4">
          <a href="#" className="text-blue-600 text-xl">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-sky-400 text-xl">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-red-500 text-xl">
            <i className="fab fa-google"></i>
          </a>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <span
            onClick={handleSignUpRedirect}
            className="text-black font-semibold hover:underline cursor-pointer transition"
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
