import React, { useState, useRef, useEffect } from "react";
import {
  X,
  ChevronDown,
  ChevronUp,
  Filter,
  Tag,
  DollarSign,
  Palette,
  Ruler,
  Hash,
  Check,
} from "lucide-react";

// Helper to toggle items in an array
const toggleArrayItem = (array, item) =>
  array.includes(item) ? array.filter((v) => v !== item) : [...array, item];

const MobileShopSideBar = ({ isOpen, onClose, onFilterChange }) => {
  const sidebarRef = useRef(null);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  // Collapse states
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    color: true,
    size: true,
    tags: true,
  });

  // Filter data
  const filterData = {
    categories: [
      { name: "Bags", count: 4 },
      { name: "Hoodies", count: 5 },
      { name: "Jackets", count: 25 },
      { name: "Men", count: 23 },
      { name: "Sweatshirts", count: 10 },
      { name: "Tshirts", count: 15 },
      { name: "Women", count: 24 },
    ],
    prices: [
      "$1-$50",
      "$50-$100",
      "$100-$150",
      "$150-$200",
      "$200-$250",
      "$250-$300",
    ],
    colors: [
      { name: "Blue", color: "bg-blue-500", count: 46 },
      { name: "Gray", color: "bg-gray-500", count: 46 },
      { name: "Green", color: "bg-green-500", count: 46 },
      { name: "Red", color: "bg-red-500", count: 46 },
      { name: "Yellow", color: "bg-yellow-500", count: 46 },
    ],
    sizes: [
      { name: "Small", value: "S", count: 46 },
      { name: "Medium", value: "M", count: 46 },
      { name: "Large", value: "L", count: 46 },
      { name: "XL", value: "XL", count: 46 },
    ],
    tags: [
      "Clothing",
      "Etc",
      "Fashion",
      "M11",
      "M12",
      "M31",
      "M32",
      "M41",
      "M71",
      "M72",
      "M81",
      "Men",
      "Products",
      "Women",
    ],
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Toggle a filter selection
  const toggleFilter = (value, type, state, setState) => {
    const updated = toggleArrayItem(state, value);
    setState(updated);

    // Build payload for backend
    const payload = {
      category:
        type === "category" ? updated.join(",") : selectedCategories.join(","),
      color: type === "color" ? updated.join(",") : selectedColors.join(","),
      size: type === "size" ? updated.join(",") : selectedSizes.join(","),
      tags: type === "tags" ? updated.join(",") : selectedTags.join(","),
    };

    // Handle price separately
    if (type === "price" && updated.length > 0) {
      const [min, max] = updated[0].replace(/\$/g, "").split("-");
      payload.minPrice = Number(min);
      payload.maxPrice = Number(max);
    } else if (type === "price") {
      payload.minPrice = "";
      payload.maxPrice = "";
    }

    if (onFilterChange) onFilterChange(payload);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPrices([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedTags([]);

    if (onFilterChange) {
      onFilterChange({
        category: "",
        color: "",
        size: "",
        tags: "",
        minPrice: "",
        maxPrice: "",
      });
    }
  };

  // Apply filters and close
  const applyFilters = () => {
    onClose();
  };

  // Render filter section
  const renderFilterSection = (
    title,
    items,
    type,
    state,
    setState,
    icon,
    isColor = false,
    isTag = false
  ) => (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() =>
          setOpenSections((prev) => ({ ...prev, [type]: !prev[type] }))
        }
        className="flex justify-between items-center w-full py-3 px-1 text-sm font-medium"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
          {state.length > 0 && (
            <span className="w-5 h-5 text-xs bg-black text-white rounded-full flex items-center justify-center">
              {state.length}
            </span>
          )}
        </div>
        {openSections[type] ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {openSections[type] && (
        <div
          className={`pb-3 px-1 ${
            isTag ? "flex flex-wrap gap-1.5" : "space-y-1.5"
          }`}
        >
          {items.map((item) => {
            const value = item.name || item.value || item;
            const displayName = item.name || item.value || item;
            const count = item.count;
            const colorClass = item.color;

            return (
              <button
                key={value}
                onClick={() => toggleFilter(value, type, state, setState)}
                className={`
                  ${
                    isTag
                      ? "text-xs px-2 py-1.5 rounded border"
                      : "flex items-center justify-between w-full text-xs py-1.5 px-2 rounded"
                  }
                  transition ${isColor ? "items-center gap-2" : ""}
                  ${
                    state.includes(value)
                      ? "bg-black text-white border-black"
                      : isTag
                      ? "border-gray-300 hover:border-black"
                      : "hover:bg-gray-100"
                  }
                `}
              >
                {isColor && (
                  <div className={`w-4 h-4 rounded-full ${colorClass}`} />
                )}
                <span className="flex-1 text-left">{displayName}</span>
                {count && (
                  <span
                    className={`text-xs ${
                      state.includes(value) ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    ({count})
                  </span>
                )}
                {!isTag && state.includes(value) && (
                  <Check className="w-3 h-3 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-72 sm:w-80 bg-white z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <h2 className="text-sm font-semibold">Filters</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active Filters */}
        {(selectedCategories.length > 0 ||
          selectedPrices.length > 0 ||
          selectedColors.length > 0 ||
          selectedSizes.length > 0 ||
          selectedTags.length > 0) && (
          <div className="p-3 border-b border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-medium">Active Filters</p>
              <button
                onClick={clearAllFilters}
                className="text-xs text-gray-600 hover:text-black transition"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                ...selectedCategories.map((c) => ({
                  type: "category",
                  value: c,
                })),
                ...selectedPrices.map((p) => ({ type: "price", value: p })),
                ...selectedColors.map((c) => ({ type: "color", value: c })),
                ...selectedSizes.map((s) => ({ type: "size", value: s })),
                ...selectedTags.map((t) => ({ type: "tag", value: t })),
              ].map((filter) => (
                <span
                  key={`${filter.type}-${filter.value}`}
                  className="inline-flex items-center gap-1 bg-gray-100 text-xs px-2 py-1 rounded"
                >
                  {filter.value}
                  <button
                    onClick={() => {
                      const setterMap = {
                        category: setSelectedCategories,
                        price: setSelectedPrices,
                        color: setSelectedColors,
                        size: setSelectedSizes,
                        tags: setSelectedTags,
                      };
                      toggleFilter(
                        filter.value,
                        filter.type,
                        filter.type === "category"
                          ? selectedCategories
                          : filter.type === "price"
                          ? selectedPrices
                          : filter.type === "color"
                          ? selectedColors
                          : filter.type === "size"
                          ? selectedSizes
                          : selectedTags,
                        setterMap[filter.type]
                      );
                    }}
                    className="ml-1 hover:text-black"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Filter Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {renderFilterSection(
            "Categories",
            filterData.categories,
            "category",
            selectedCategories,
            setSelectedCategories,
            <Tag className="w-4 h-4" />
          )}

          {renderFilterSection(
            "Price Range",
            filterData.prices,
            "price",
            selectedPrices,
            setSelectedPrices,
            <DollarSign className="w-4 h-4" />
          )}

          {renderFilterSection(
            "Colors",
            filterData.colors,
            "color",
            selectedColors,
            setSelectedColors,
            <Palette className="w-4 h-4" />,
            true
          )}

          {renderFilterSection(
            "Sizes",
            filterData.sizes,
            "size",
            selectedSizes,
            setSelectedSizes,
            <Ruler className="w-4 h-4" />
          )}

          {renderFilterSection(
            "Tags",
            filterData.tags,
            "tags",
            selectedTags,
            setSelectedTags,
            <Hash className="w-4 h-4" />,
            false,
            true
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-600">
              <span className="font-medium">
                {selectedCategories.length +
                  selectedPrices.length +
                  selectedColors.length +
                  selectedSizes.length +
                  selectedTags.length}
              </span>{" "}
              filter(s) selected
            </div>
          </div>
          <button
            onClick={applyFilters}
            className="w-full bg-black text-white text-sm font-medium py-3 rounded hover:bg-gray-900 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileShopSideBar;

