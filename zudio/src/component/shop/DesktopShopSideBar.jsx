

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  Tag,
  DollarSign,
  Palette,
  Ruler,
  Hash,
  X,
} from "lucide-react";

// Helper to parse price strings like "$1-$50" to { min: 1, max: 50 }
const parsePrice = (priceStr) => {
  const [min, max] = priceStr.replace(/\$/g, "").split("-");
  return { min: Number(min), max: Number(max) };
};

// Helper to toggle items in an array
const toggleArrayItem = (array, item) =>
  array.includes(item) ? array.filter((v) => v !== item) : [...array, item];

const ShopSideBar = ({ onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    color: true,
    size: true,
    tags: true,
  });

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
      const { min, max } = parsePrice(updated[0]);
      payload.minPrice = min;
      payload.maxPrice = max;
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

  // Section icon mapping
  const sectionIcons = {
    category: <Tag className="w-4 h-4" />,
    price: <DollarSign className="w-4 h-4" />,
    color: <Palette className="w-4 h-4" />,
    size: <Ruler className="w-4 h-4" />,
    tags: <Hash className="w-4 h-4" />,
  };

  // Render each collapsible section
  const renderSection = (title, items, type, state, setState) => (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        className="flex justify-between items-center w-full text-sm font-medium py-3 hover:bg-gray-50 px-1 transition"
        onClick={() =>
          setOpenSections((prev) => ({ ...prev, [type]: !prev[type] }))
        }
      >
        <div className="flex items-center gap-2">
          {sectionIcons[type]}
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
        <div className="pb-3 px-1 space-y-1.5">
          {items.map((item) => (
            <button
              key={item}
              onClick={() => toggleFilter(item, type, state, setState)}
              className={`flex items-center justify-between w-full text-xs py-1.5 px-2 rounded transition ${
                state.includes(item)
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <span>{item}</span>
              {state.includes(item) && <X className="w-3 h-3" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          <h3 className="text-sm font-semibold">Filters</h3>
        </div>
        {(selectedCategories.length > 0 ||
          selectedPrices.length > 0 ||
          selectedColors.length > 0 ||
          selectedSizes.length > 0 ||
          selectedTags.length > 0) && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-gray-600 hover:text-black transition flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {(selectedCategories.length > 0 ||
        selectedPrices.length > 0 ||
        selectedColors.length > 0 ||
        selectedSizes.length > 0 ||
        selectedTags.length > 0) && (
        <div className="mb-4 p-2 border border-gray-200 rounded">
          <p className="text-xs font-medium mb-2">Active Filters:</p>
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
            ].map((filter, index) => (
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
      <div className="space-y-2">
        {renderSection(
          "Categories",
          [
            "Bags",
            "Hoodies",
            "Jackets",
            "Men",
            "Sweatshirts",
            "Tshirts",
            "Women",
          ],
          "category",
          selectedCategories,
          setSelectedCategories
        )}

        {renderSection(
          "Price Range",
          [
            "$1-$50",
            "$50-$100",
            "$100-$150",
            "$150-$200",
            "$200-$250",
            "$250-$300",
          ],
          "price",
          selectedPrices,
          setSelectedPrices
        )}

        {renderSection(
          "Colors",
          ["Blue", "Gray", "Green", "Red", "Yellow"],
          "color",
          selectedColors,
          setSelectedColors
        )}

        {renderSection(
          "Sizes",
          ["S", "M", "L", "XL"],
          "size",
          selectedSizes,
          setSelectedSizes
        )}

        {renderSection(
          "Tags",
          ["New", "Popular", "Limited"],
          "tags",
          selectedTags,
          setSelectedTags
        )}
      </div>

      {/* Total selected filters */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-600">
          <span className="font-medium">
            {selectedCategories.length +
              selectedPrices.length +
              selectedColors.length +
              selectedSizes.length +
              selectedTags.length}
          </span>{" "}
          filter(s) applied
        </div>
      </div>
    </div>
  );
};

export default ShopSideBar;
