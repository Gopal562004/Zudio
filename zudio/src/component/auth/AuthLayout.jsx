import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 grid grid-cols-1 lg:grid-cols-12">
      {/* Left Editorial Visual Panel (Desktop) */}
      <div className="hidden lg:flex lg:col-span-5 relative bg-neutral-900 overflow-hidden flex-col justify-between p-10 text-white">
        <img
          src="/images/col-women.jpg"
          alt="Zudio Editorial"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/40" />

        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/icons/homeicon.png" alt="Zudio" className="w-8 h-8 invert" />
            <span className="text-2xl font-serif tracking-wide">Zudio</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-3 max-w-md">
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-300">
            Zudio Studio
          </span>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight">
            Everyday fashion crafted for modern style.
          </h1>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Access your saved wishlist, track orders, and check out faster.
          </p>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="lg:col-span-7 flex flex-col justify-between px-4 sm:px-8 py-6 sm:py-10 bg-neutral-50">
        {/* Top Bar */}
        <div className="max-w-md w-full mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-neutral-600 hover:text-black transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </Link>

          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <img src="/icons/homeicon.png" alt="Zudio" className="w-6 h-6" />
            <span className="text-lg font-serif">Zudio</span>
          </Link>
        </div>

        {/* Auth Form Container */}
        <div className="w-full max-w-md mx-auto my-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>

        {/* Footer */}
        <div className="max-w-md w-full mx-auto text-center">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} Zudio. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
