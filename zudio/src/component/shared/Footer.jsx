import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="mx-4 md:mx-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            {/* Zudio Branding */}
            <div className="w-full lg:w-1/3 mb-6">
              <h2 className="text-lg md:text-xl font-bold mb-3">Zudio</h2>
              <p className="text-gray-400 text-xs md:text-sm mb-4">
                Whether you're a trendsetter, a minimalist, or an adventurer at
                heart, Zudio has something for everyone. Our diverse range of
                styles caters to various personas.
              </p>
              <div className="flex space-x-3">
                <a href="#" aria-label="Facebook" className="text-sm">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Twitter" className="text-sm">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram" className="text-sm">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="Pinterest" className="text-sm">
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>

            {/* Footer Links */}
            <div className="w-full lg:w-2/3 flex flex-wrap justify-between">
              {/* Column 1 */}
              <div className="w-1/2 md:w-1/4 mb-6">
                <h3 className="font-bold text-sm mb-3">About Us</h3>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>
                    <a href="#">Our Story</a>
                  </li>
                  <li>
                    <a href="#">Mission & Values</a>
                  </li>
                  <li>
                    <a href="#">Meet the Team</a>
                  </li>
                  <li>
                    <a href="#">Sustainability Efforts</a>
                  </li>
                  <li>
                    <a href="#">Brand Partnerships</a>
                  </li>
                  <li>
                    <a href="#">Influencer Collaborations</a>
                  </li>
                </ul>
              </div>

              {/* Column 2 */}
              <div className="w-1/2 md:w-1/4 mb-6">
                <h3 className="font-bold text-sm mb-3">Accessibility</h3>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>
                    <a href="#">Accessibility Statement</a>
                  </li>
                  <li>
                    <a href="#">Site Map</a>
                  </li>
                  <li>
                    <a href="#">Web Accessibility</a>
                  </li>
                  <li>
                    <a href="#">ADA Compliance</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Terms of Service</a>
                  </li>
                </ul>
              </div>

              {/* Column 3 */}
              <div className="w-1/2 md:w-1/4 mb-6">
                <h3 className="font-bold text-sm mb-3">Join Our Community</h3>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>
                    <a href="#">VIP Membership</a>
                  </li>
                  <li>
                    <a href="#">Loyalty Program</a>
                  </li>
                  <li>
                    <a href="#">Customer Reviews</a>
                  </li>
                  <li>
                    <a href="#">Style Forums</a>
                  </li>
                  <li>
                    <a href="#">Job Openings</a>
                  </li>
                  <li>
                    <a href="#">Culture and Values</a>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="w-full md:w-1/4 mb-6">
                <h3 className="font-bold text-sm mb-3">Let's get in touch</h3>
                <p className="text-gray-400 text-xs mb-3">
                  Sign up for our newsletter and receive 10% off your first
                  purchase.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    className="p-2 rounded-l bg-gray-700 text-white text-xs focus:outline-none"
                  />
                  <button className="p-2 bg-gray-600 rounded-r text-xs">
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 mt-6 pt-4 flex flex-col sm:flex-row justify-between items-center text-xs">
            <p className="text-gray-400 text-center sm:text-left mb-4 sm:mb-0">
              © 2024 Zudio. All rights reserved. Designed by Novaworks.
            </p>
            <div className="flex space-x-3 justify-center">
              <img src="/path/to/amazon.png" alt="Amazon" className="h-5" />
              <img
                src="/path/to/amex.png"
                alt="American Express"
                className="h-5"
              />
              <img src="/path/to/paypal.png" alt="PayPal" className="h-5" />
              <img src="/path/to/delivery.png" alt="Delivery" className="h-5" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
