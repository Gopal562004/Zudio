import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Instagram, Facebook, Twitter, Mail } from "lucide-react";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    setEmail("");
    toast.success("Subscribed! Use code ZUDIO10 for 10% off.");
  };

  return (
    <footer className="bg-black text-white border-t border-neutral-800">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Zudio Branding */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-serif tracking-wide text-white">
                Zudio
              </h2>
            </Link>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Whether you're a trendsetter, a minimalist, or an adventurer at
              heart, Zudio has something for everyone. Everyday fashion crafted
              for modern style.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <Link
                to="/shop"
                aria-label="Instagram"
                className="p-2 border border-neutral-800 text-neutral-400 hover:text-white hover:border-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                to="/shop"
                aria-label="Facebook"
                className="p-2 border border-neutral-800 text-neutral-400 hover:text-white hover:border-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                to="/blog"
                aria-label="Twitter"
                className="p-2 border border-neutral-800 text-neutral-400 hover:text-white hover:border-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                to="/contact-us"
                aria-label="Email Us"
                className="p-2 border border-neutral-800 text-neutral-400 hover:text-white hover:border-white transition-colors"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white mb-4">
              Shop
            </h3>
            <ul className="space-y-2 text-neutral-400 text-xs sm:text-sm">
              <li>
                <Link to="/shop?tags=New" className="hover:text-white transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Women" className="hover:text-white transition">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Men" className="hover:text-white transition">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Hoodies" className="hover:text-white transition">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Jackets" className="hover:text-white transition">
                  Jackets
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Bags" className="hover:text-white transition">
                  Bags & Carry
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore & Support */}
          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-neutral-400 text-xs sm:text-sm">
              <li>
                <Link to="/shop" className="hover:text-white transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop?tags=Popular" className="hover:text-white transition">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/shop?tags=Limited" className="hover:text-white transition">
                  Limited Drops
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition">
                  Style Blog
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white mb-4">
              Account
            </h3>
            <ul className="space-y-2 text-neutral-400 text-xs sm:text-sm">
              <li>
                <Link to="/profile" className="hover:text-white transition">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/profile/wishlist" className="hover:text-white transition">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="hover:text-white transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/auth/signup" className="hover:text-white transition">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white mb-4">
              Newsletter
            </h3>
            <p className="text-neutral-400 text-xs leading-relaxed mb-3">
              Sign up for early drop access and receive 10% off your first
              order.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 bg-neutral-900 border border-neutral-700 text-xs text-white">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Code: <strong className="font-mono">ZUDIO10</strong></span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address..."
                  className="w-full min-w-0 px-3 py-2 bg-neutral-900 border border-neutral-700 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-white rounded-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-3 py-2 bg-white text-black hover:bg-neutral-200 transition-colors rounded-none flex-shrink-0 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-neutral-500 text-center sm:text-left">
            © {new Date().getFullYear()} Zudio. All rights reserved.
          </p>

          {/* Clean Inline Payment Badges */}
          <div className="flex items-center gap-2">
            <svg role="img" aria-label="Visa" viewBox="0 0 48 30" className="h-5 w-auto">
              <rect width="48" height="30" rx="2" fill="#171717" stroke="#333" />
              <text x="24" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                VISA
              </text>
            </svg>
            <svg role="img" aria-label="Mastercard" viewBox="0 0 48 30" className="h-5 w-auto">
              <rect width="48" height="30" rx="2" fill="#171717" stroke="#333" />
              <circle cx="19" cy="15" r="7" fill="#EB001B" />
              <circle cx="29" cy="15" r="7" fill="#F79E1B" fillOpacity="0.9" />
            </svg>
            <svg role="img" aria-label="American Express" viewBox="0 0 48 30" className="h-5 w-auto">
              <rect width="48" height="30" rx="2" fill="#006FCF" />
              <text x="24" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                AMEX
              </text>
            </svg>
            <svg role="img" aria-label="UPI" viewBox="0 0 48 30" className="h-5 w-auto">
              <rect width="48" height="30" rx="2" fill="#171717" stroke="#333" />
              <text x="24" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                UPI
              </text>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
