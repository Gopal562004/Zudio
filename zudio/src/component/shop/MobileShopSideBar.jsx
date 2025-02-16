import React, { useState, useRef, useEffect } from "react";

const MobileShopSideBar = ({ isOpen, onClose }) => {
  const sidebarRef = useRef(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isTagsOpen, setIsTagsOpen] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 w-60 h-full bg-white p-4 shadow-lg transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-50`}
    >
      <button onClick={onClose} className="mb-4">
        Close
      </button>

      <div className="max-h-[80vh] overflow-y-auto">
        {" "}
        {/* Added scroll functionality */}
        {/* Product Categories */}
        <div>
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex justify-between w-full text-base font-semibold text-left py-2 px-3 border"
          >
            Product Categories
            <span
              className={`transform transition-transform pl-3 ${
                isCategoryOpen ? "rotate-180" : ""
              }`}
            >
              ⯆
            </span>
          </button>
          {isCategoryOpen && (
            <div className="py-5 pl-4 space-y-1 border">
              <p>
                Bags <span className="text-gray-500">(4)</span>
              </p>
              <p>
                Hoodies <span className="text-gray-500">(5)</span>
              </p>
              <p>
                Jackets <span className="text-gray-500">(25)</span>
              </p>
              <p>
                Men <span className="text-gray-500">(23)</span>
              </p>
              <p>
                Sweatshirts <span className="text-gray-500">(10)</span>
              </p>
              <p>
                Tshirts <span className="text-gray-500">(15)</span>
              </p>
              <p>
                Women <span className="text-gray-500">(24)</span>
              </p>
            </div>
          )}
        </div>
        {/* Price */}
        <div>
          <button
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            className="flex justify-between w-full text-base font-semibold text-left py-2 px-3 border"
          >
            Price
            <span
              className={`pl-3 transform transition-transform ${
                isPriceOpen ? "rotate-180" : ""
              }`}
            >
              ⯆
            </span>
          </button>
          {isPriceOpen && (
            <div className="py-5 pl-4 space-y-1 border">
              <p>$50-$100</p>
              <p>$100-$150</p>
              <p>$150-$200</p>
              <p>$200-$250</p>
              <p>$250-$300</p>
              <p>$1-$50</p>
            </div>
          )}
        </div>
        {/* Color */}
        <div>
          <button
            onClick={() => setIsColorOpen(!isColorOpen)}
            className="flex justify-between w-full text-base font-semibold text-left py-2 px-3 border"
          >
            Color
            <span
              className={`pl-3 transform transition-transform ${
                isColorOpen ? "rotate-180" : ""
              }`}
            >
              ⯆
            </span>
          </button>
          {isColorOpen && (
            <div className="py-5 pl-4 space-y-1 border">
              <p>
                <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                Blue <span className="text-gray-500">(46)</span>
              </p>
              <p>
                <span className="inline-block w-3 h-3 rounded-full bg-gray-500 mr-2"></span>
                Gray <span className="text-gray-500">(46)</span>
              </p>
              <p>
                <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                Green <span className="text-gray-500">(46)</span>
              </p>
              <p>
                <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                Red <span className="text-gray-500">(46)</span>
              </p>
              <p>
                <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                Yellow <span className="text-gray-500">(46)</span>
              </p>
            </div>
          )}
        </div>
        {/* Size */}
        <div>
          <button
            onClick={() => setIsSizeOpen(!isSizeOpen)}
            className="flex justify-between w-full text-base font-semibold text-left py-2 px-3 border"
          >
            Size
            <span
              className={`pl-3 transform transition-transform ${
                isSizeOpen ? "rotate-180" : ""
              }`}
            >
              ⯆
            </span>
          </button>
          {isSizeOpen && (
            <div className="py-5 pl-4 space-y-1 border">
              <p>
                Large <span className="text-gray-500">(46)</span>
              </p>
              <p>
                Medium <span className="text-gray-500">(46)</span>
              </p>
              <p>
                Small <span className="text-gray-500">(46)</span>
              </p>
            </div>
          )}
        </div>
        {/* Tags */}
        <div>
          <button
            onClick={() => setIsTagsOpen(!isTagsOpen)}
            className="flex justify-between w-full text-base font-semibold text-left py-2 px-3 border"
          >
            Tags
            <span
              className={`pl-3 transform transition-transform ${
                isTagsOpen ? "rotate-180" : ""
              }`}
            >
              ⯆
            </span>
          </button>
          {isTagsOpen && (
            <div className="flex flex-wrap pl-4 space-x-2 space-y-2 py-5 w-full border">
              <span className="px-2 py-1 text-sm bg-gray-200 rounded">
                Clothing
              </span>
              <span className="px-2 py-1 text-sm bg-gray-200 rounded">Etc</span>
              <span className="px-2 py-1 text-sm bg-gray-200 rounded">
                Fashion
              </span>
              <span className="px-2 py-1 text-sm bg-gray-200 rounded">M11</span>
              <span className="px-2 py-1 text-sm bg-gray-200 rounded">M12</span>
              <span className="px-2 py-1 text-sm bg-gray-200 rounded">M31</span>
              <span className="px-2 py-1 text-sm bg-gray-200 rounded">M32</span>
              <span className="px-2 py-1 text-sm bg-gray-200 rounded">M41</span>
              <span className="px-2 py-1 text-sm bg-gray-200 rounded">M71</span>
              <span className="px-2 py-1 text-sm bg-gray-200 rounded">M72</span>
              <span className="px-2 py-1 text-sm bg-gray-200 rounded">M81</span>
              <span className="px-2 py-1 text-sm bg-gray-200 rounded">Men</span>
              <span className="px-2 py-1 text-sm bg-gray-200 rounded">
                Products
              </span>
              <span className="px-2 py-1 text-sm bg-gray-200 rounded">
                Women
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileShopSideBar;
