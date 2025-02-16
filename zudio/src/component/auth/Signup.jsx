import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../mongo/authServices";
import { toast } from "react-toastify"; // For displaying notifications

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleGotoLogin = () => {
    navigate("/auth/login");
  };

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!name || name.length < 3 || name.length > 50) {
      formErrors.name = "Name must be between 3 and 50 characters.";
    }

    if (!email || !emailRegex.test(email)) {
      formErrors.email = "Please enter a valid email.";
    }

    if (!password || !passwordRegex.test(password)) {
      formErrors.password =
        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character.";
    }

    if (!phone || !phoneRegex.test(phone)) {
      formErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    return formErrors;
  };

  const handleOnSignup = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    // If there are errors, stop the submission
    if (Object.keys(formErrors).length > 0) return;

    try {
      // Log the data to verify it's correct
      // console.log("Sending data to server:", { name, email, password, phone });

      // Call the registerUser function from authServices to make the API request
      const response = await registerUser({ name, email, password, phone });
      toast.success("Signup successful!");

      // After successful sign-up, redirect to the homepage or a protected route
      navigate("/"); // Modify this route based on your requirement
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error(error?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-center text-xl font-semibold mb-4">
          CREATE ACCOUNT
        </h2>
        <div className="border-t-2 border-black mx-auto w-20 mb-6"></div>
        <form onSubmit={handleOnSignup}>
          {/* Name Input */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 text-gray-500">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-grow py-2 px-4 text-sm outline-none"
                required
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 text-gray-500">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow py-2 px-4 text-sm outline-none"
                required
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
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
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-grow py-2 px-4 text-sm outline-none"
                required
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
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>

          {/* Phone Number Input */}
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 text-gray-500">
                <i className="fas fa-phone"></i>
              </span>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-grow py-2 px-4 text-sm outline-none"
                required
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone}</p>
            )}
          </div>

          {/* Sign-Up Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
          >
            SIGN UP
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-4 text-gray-500">Or</div>

        {/* Social Media Signup */}
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
          Already have an account?{" "}
          <a
            onClick={handleGotoLogin}
            href="#"
            className="text-black font-semibold hover:underline transition"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
