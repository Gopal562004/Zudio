// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import { loginUser } from "../../mongo/authServices"; // Import the loginUser function
// import { toast } from "react-toastify"; // For displaying notifications

// const Login = () => {
//   const [email, setEmail] = useState(""); // State for username input
//   const [password, setPassword] = useState(""); // State for password input
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [errors, setErrors] = useState({}); // Store validation errors
//   const navigate = useNavigate(); // Initialize navigate

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const handleSignUpRedirect = () => {
//     navigate("/auth/signup");
//   };

//   const handleForgotPassword = () => {
//     navigate("/auth/forgot-password");
//   };

//   // Validation function for login form
//   const validateForm = () => {
//     const newErrors = {};

//     // Email validation (basic format check)
//     if (!email) {
//       newErrors.email = "Email is required.";
//     } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
//       newErrors.email = "Please enter a valid email.";
//     }

//     // Password validation
//     if (!password) {
//       newErrors.password = "Password is required.";
//     } else if (password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters long.";
//     } else {
//       // Enhanced password validation for a-z, A-Z, special character, and number
//       const passwordRegex =
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//       if (!passwordRegex.test(password)) {
//         newErrors.password =
//           "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // Return true if no errors
//   };

//   // Handle form submission
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Perform client-side validation
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const response = await loginUser({ email, password });
//       toast.success("Login successful!");
//        setTimeout(() => {
//          navigate("/"); // Navigate to Home page after the Toast
//        }, 1000);  // Redirect to a protected route
//     } catch (error) {
//       toast.error(error.message || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-50">
//       <div className="bg-white rounded-lg shadow-lg w-96 p-6">
//         <h2 className="text-center text-xl font-semibold mb-4 text-black">
//           CUSTOMER LOGIN
//         </h2>
//         <div className="border-t-2 border-black mx-auto w-20 mb-6"></div>
//         <form onSubmit={handleLogin}>
//           {/* Email Input */}
//           <div className="mb-4">
//             <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//               <span className="px-3 text-gray-500">
//                 <i className="fas fa-user"></i>
//               </span>
//               <input
//                 type="email"
//                 placeholder="Enter Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={`flex-grow py-2 px-4 text-sm outline-none bg-transparent ${
//                   errors.email ? "border-red-500" : ""
//                 }`}
//               />
//             </div>
//             {errors.email && (
//               <span className="text-sm text-red-500">{errors.email}</span>
//             )}
//           </div>

//           {/* Password Input */}
//           <div className="mb-4 relative">
//             <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//               <span className="px-3 text-gray-500">
//                 <i className="fas fa-lock"></i>
//               </span>
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 placeholder="Enter Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={`flex-grow py-2 px-4 text-sm outline-none bg-transparent ${
//                   errors.password ? "border-red-500" : ""
//                 }`}
//               />
//               <span
//                 onClick={togglePasswordVisibility}
//                 className="px-3 text-gray-500 cursor-pointer"
//               >
//                 <i
//                   className={
//                     passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"
//                   }
//                 ></i>
//               </span>
//             </div>
//             {errors.password && (
//               <span className="text-sm text-red-500">{errors.password}</span>
//             )}
//           </div>

//           {/* Forgot Password */}
//           <div className="text-right mb-4">
//             <a
//               onClick={handleForgotPassword}
//               href="#"
//               className="text-sm text-gray-500 hover:text-black transition"
//             >
//               Forgot Password?
//             </a>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-black text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
//           >
//             LOGIN
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="text-center my-4 text-gray-500">Or</div>

//         {/* Social Media Login */}
//         <div className="flex justify-center gap-4 mb-4">
//           <a href="#" className="text-blue-600 text-xl">
//             <i className="fab fa-facebook"></i>
//           </a>
//           <a href="#" className="text-sky-400 text-xl">
//             <i className="fab fa-twitter"></i>
//           </a>
//           <a href="#" className="text-red-500 text-xl">
//             <i className="fab fa-google"></i>
//           </a>
//         </div>

//         {/* Footer */}
//         <div className="text-center text-sm text-gray-500">
//           Don’t have an account?{" "}
//           <span
//             onClick={handleSignUpRedirect}
//             className="text-black font-semibold hover:underline cursor-pointer transition"
//           >
//             Sign Up
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../mongo/authServices";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus, Key } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const handleSignUpRedirect = () => navigate("/auth/signup");
  const handleForgotPassword = () => navigate("/auth/forgot-password");

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await loginUser({ email, password });
      toast.success("Login successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md border border-gray-200">
      {/* Header */}
      <div className="text-center p-6 pb-4">
        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center shadow-sm">
          <Key className="text-white" size={22} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-xs text-gray-500 mt-1">Sign in to your account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4 px-6">
        {/* Email */}
        <div>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={16}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg outline-none transition-colors bg-gray-50
                ${
                  errors.email
                    ? "border-red-300 bg-red-50/50"
                    : "border-gray-300 focus:border-gray-400 focus:bg-white"
                }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={16}
            />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-10 pr-10 py-2.5 text-sm border rounded-lg outline-none transition-colors bg-gray-50
                ${
                  errors.password
                    ? "border-red-300 bg-red-50/50"
                    : "border-gray-300 focus:border-gray-400 focus:bg-white"
                }`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errors.password}</p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-xs text-gray-500 hover:text-gray-700 hover:underline transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-2.5 rounded-lg text-sm font-medium hover:from-black hover:to-gray-900 transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn size={16} />
              Sign In
            </>
          )}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="mt-6 pt-5 border-t border-gray-100 px-6 pb-6">
        <p className="text-xs text-gray-500 text-center">
          Don't have an account?{" "}
          <button
            onClick={handleSignUpRedirect}
            className="text-gray-700 font-medium hover:text-black hover:underline transition-colors inline-flex items-center gap-1"
          >
            Sign up
            <UserPlus size={12} />
          </button>
        </p>
      </div>

      {/* Security Note */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100/80 rounded-lg border border-gray-200 p-3">
          <p className="text-xs text-gray-600 text-center">
            🔒 Your login information is encrypted and secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
