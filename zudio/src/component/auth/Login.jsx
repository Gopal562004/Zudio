import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../mongo/authServices";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
      const data = await loginUser({ email, password });
      if (data?.token) {
        login(data.token);
      }
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white border border-neutral-200 p-6 sm:p-8 rounded-none">
      <div className="mb-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
          Member Access
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 mt-1">
          Welcome Back
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Sign in to your Zudio account
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
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

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-[11px] uppercase tracking-wider font-medium text-neutral-600">
              Password
            </label>
            <button
              type="button"
              onClick={() => navigate("/auth/forgot-password")}
              className="text-xs text-neutral-500 hover:text-black hover:underline transition-colors cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              size={16}
            />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
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
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight size={15} />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-neutral-200 text-center">
        <p className="text-xs text-neutral-500">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/auth/signup")}
            className="text-black font-semibold hover:underline cursor-pointer"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
