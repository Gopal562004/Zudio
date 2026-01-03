// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../../mongo/authServices";
// import { toast } from "react-toastify"; // For displaying notifications

// const Signup = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [name, setName] = useState("");
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const handleGotoLogin = () => {
//     navigate("/auth/login");
//   };

//   const validateForm = () => {
//     let formErrors = {};
//     const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
//     const phoneRegex = /^\d{10}$/;
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     if (!name || name.length < 3 || name.length > 50) {
//       formErrors.name = "Name must be between 3 and 50 characters.";
//     }

//     if (!email || !emailRegex.test(email)) {
//       formErrors.email = "Please enter a valid email.";
//     }

//     if (!password || !passwordRegex.test(password)) {
//       formErrors.password =
//         "Password must be at least 8 characters, include an uppercase letter, a number, and a special character.";
//     }

//     if (!phone || !phoneRegex.test(phone)) {
//       formErrors.phone = "Please enter a valid 10-digit phone number.";
//     }

//     return formErrors;
//   };

//   const handleOnSignup = async (e) => {
//     e.preventDefault();
//     const formErrors = validateForm();
//     setErrors(formErrors);

//     // If there are errors, stop the submission
//     if (Object.keys(formErrors).length > 0) return;

//     try {
//       // Log the data to verify it's correct
//       // console.log("Sending data to server:", { name, email, password, phone });

//       // Call the registerUser function from authServices to make the API request
//       const response = await registerUser({ name, email, password, phone });
//       toast.success("Signup successful!");

//       // After successful sign-up, redirect to the homepage or a protected route
//       navigate("/"); // Modify this route based on your requirement
//     } catch (error) {
//       console.error("Signup failed:", error);
//       toast.error(error?.message || "Signup failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-50">
//       <div className="bg-white rounded-lg shadow-lg w-96 p-6">
//         <h2 className="text-center text-xl font-semibold mb-4">
//           CREATE ACCOUNT
//         </h2>
//         <div className="border-t-2 border-black mx-auto w-20 mb-6"></div>
//         <form onSubmit={handleOnSignup}>
//           {/* Name Input */}
//           <div className="mb-4">
//             <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//               <span className="px-3 text-gray-500">
//                 <i className="fas fa-user"></i>
//               </span>
//               <input
//                 type="text"
//                 placeholder="Enter your Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="flex-grow py-2 px-4 text-sm outline-none"
//                 required
//               />
//             </div>
//             {errors.name && (
//               <p className="text-red-500 text-xs">{errors.name}</p>
//             )}
//           </div>

//           {/* Email Input */}
//           <div className="mb-4">
//             <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//               <span className="px-3 text-gray-500">
//                 <i className="fas fa-envelope"></i>
//               </span>
//               <input
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="flex-grow py-2 px-4 text-sm outline-none"
//                 required
//               />
//             </div>
//             {errors.email && (
//               <p className="text-red-500 text-xs">{errors.email}</p>
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
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="flex-grow py-2 px-4 text-sm outline-none"
//                 required
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
//               <p className="text-red-500 text-xs">{errors.password}</p>
//             )}
//           </div>

//           {/* Phone Number Input */}
//           <div className="mb-4">
//             <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//               <span className="px-3 text-gray-500">
//                 <i className="fas fa-phone"></i>
//               </span>
//               <input
//                 type="tel"
//                 placeholder="Enter phone number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="flex-grow py-2 px-4 text-sm outline-none"
//                 required
//               />
//             </div>
//             {errors.phone && (
//               <p className="text-red-500 text-xs">{errors.phone}</p>
//             )}
//           </div>

//           {/* Sign-Up Button */}
//           <button
//             type="submit"
//             className="w-full bg-black text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
//           >
//             SIGN UP
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="text-center my-4 text-gray-500">Or</div>

//         {/* Social Media Signup */}
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
//           Already have an account?{" "}
//           <a
//             onClick={handleGotoLogin}
//             href="#"
//             className="text-black font-semibold hover:underline transition"
//           >
//             Login
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../mongo/authServices";
import { toast } from "react-toastify";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  UserPlus,
  ArrowLeft,
} from "lucide-react";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
    }

    if (!phone || !phoneRegex.test(phone)) {
      formErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleOnSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await registerUser({ name, email, password, phone });
      toast.success("Signup successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error(error?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md border border-gray-200">
      {/* Header */}
      <div className="text-center p-6 pb-4">
        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center shadow-sm">
          <UserPlus className="text-white" size={22} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Create Account</h2>
        <p className="text-xs text-gray-500 mt-1">Sign up to get started</p>
      </div>

      {/* Form */}
      <form onSubmit={handleOnSignup} className="px-6 space-y-4">
        {/* Name Input */}
        <div>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={16}
            />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg outline-none transition-colors bg-gray-50
                ${
                  errors.name
                    ? "border-red-300 bg-red-50/50"
                    : "border-gray-300 focus:border-gray-400 focus:bg-white"
                }`}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>
          )}
        </div>

        {/* Email Input */}
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

        {/* Password Input */}
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

        {/* Phone Input */}
        <div>
          <div className="relative">
            <Phone
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={16}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg outline-none transition-colors bg-gray-50
                ${
                  errors.phone
                    ? "border-red-300 bg-red-50/50"
                    : "border-gray-300 focus:border-gray-400 focus:bg-white"
                }`}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errors.phone}</p>
          )}
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-2.5 rounded-lg text-sm font-medium hover:from-black hover:to-gray-900 transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating Account...
            </>
          ) : (
            <>
              <UserPlus size={16} />
              Sign Up
            </>
          )}
        </button>
      </form>

      {/* Login Link */}
      <div className="mt-6 pt-5 border-t border-gray-100 px-6 pb-6">
        <button
          onClick={handleGotoLogin}
          className="text-xs text-gray-500 hover:text-gray-700 transition-colors inline-flex items-center gap-1 w-full justify-center"
        >
          <ArrowLeft size={12} />
          Back to Login
        </button>
      </div>

      {/* Terms Note */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100/80 rounded-lg border border-gray-200 p-3">
          <p className="text-xs text-gray-600 text-center">
            By signing up, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
