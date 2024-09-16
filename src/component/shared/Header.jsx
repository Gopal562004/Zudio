import React, { useState } from "react";
import { CiUser, CiSearch, CiHeart, CiShoppingCart } from "react-icons/ci";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Hamburger and Close icons

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 bg-white z-50 flex justify-between items-center p-4 border-b border-gray-300 ">
      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>
      {/* Logo Section */}
      <div className="text-2xl md:text-4xl font-serif lg:pl-5">Zudio</div>

      {/* Navigation Links (Hidden on Mobile) */}
      <div className="hidden md:flex space-x-8 text-sm font-normal">
        <a href="#" className="hover:text-gray-600">
          HOME
        </a>
        <a href="#" className="hover:text-gray-600">
          SHOP
        </a>
        <a href="#" className="hover:text-gray-600">
          PAGES
        </a>
        <a href="#" className="hover:text-gray-600">
          BLOG
        </a>
        <a href="#" className="hover:text-gray-600">
          CONTACT US
        </a>
      </div>

      {/* Icon Links */}
      <div className="flex space-x-6 text-2xl">
        <CiUser className="hover:text-gray-600" />
        <CiSearch className="hover:text-gray-600" />
        <CiHeart className="hover:text-gray-600" />
        <div className="relative">
          <CiShoppingCart className="hover:text-gray-600" />
          <span className="absolute top-0 right-0 w-4 h-4 text-xs bg-black text-white rounded-full flex items-center justify-center">
            0
          </span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-white md:hidden text-sm`}
      >
        <a href="#" className="block py-2 px-4 hover:text-gray-600">
          HOME
        </a>
        <a href="#" className="block py-2 px-4 hover:text-gray-600">
          SHOP
        </a>
        <a href="#" className="block py-2 px-4 hover:text-gray-600">
          PAGES
        </a>
        <a href="#" className="block py-2 px-4 hover:text-gray-600">
          BLOG
        </a>
        <a href="#" className="block py-2 px-4 hover:text-gray-600">
          CONTACT US
        </a>
      </div>
    </div>
  );
};

export default Header;
