import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../mongo/authServices";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight } from "lucide-react";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const formErrors = {};
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
        "Min 8 chars with uppercase, lowercase, number, and special character.";
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
      const data = await registerUser({ name, email, password, phone });
      if (data?.token) {
        login(data.token);
      }
      toast.success("Account created successfully!");
      navigate(data?.token ? "/" : "/auth/login");
    } catch (error) {
      toast.error(error?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white border border-neutral-200 p-6 sm:p-8 rounded-none">
      <div className="mb-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
          Join Zudio
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 mt-1">
          Create Account
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Sign up for faster checkout and order tracking
        </p>
      </div>

      <form onSubmit={handleOnSignup} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-medium text-neutral-600 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <User
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-none outline-none transition-colors bg-white ${
                errors.name
                  ? "border-red-500"
                  : "border-neutral-300 focus:border-black"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-medium text-neutral-600 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              size={16}
            />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-none outline-none transition-colors bg-white ${
                errors.email
                  ? "border-red-500"
                  : "border-neutral-300 focus:border-black"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-medium text-neutral-600 mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <Phone
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              size={16}
            />
            <input
              type="tel"
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-none outline-none transition-colors bg-white ${
                errors.phone
                  ? "border-red-500"
                  : "border-neutral-300 focus:border-black"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-medium text-neutral-600 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              size={16}
            />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-10 pr-10 py-2.5 text-sm border rounded-none outline-none transition-colors bg-white ${
                errors.password
                  ? "border-red-500"
                  : "border-neutral-300 focus:border-black"
              }`}
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              aria-label={passwordVisible ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black cursor-pointer"
            >
              {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-600 mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-3 rounded-none text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating Account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight size={15} />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-neutral-200 text-center space-y-2">
        <p className="text-xs text-neutral-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/auth/login")}
            className="text-black font-semibold hover:underline cursor-pointer"
          >
            Sign In
          </button>
        </p>
        <p className="text-[11px] text-neutral-400">
          By signing up, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Signup;
