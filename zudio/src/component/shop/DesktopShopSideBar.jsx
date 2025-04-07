// import React, { useState } from "react";

// const ShopSideBar = ({ onFilterChange }) => {
//   const [isCategoryOpen, setIsCategoryOpen] = useState(true);
//   const [isPriceOpen, setIsPriceOpen] = useState(true);
//   const [isColorOpen, setIsColorOpen] = useState(true);
//   const [isSizeOpen, setIsSizeOpen] = useState(true);
//   const [isTagsOpen, setIsTagsOpen] = useState(true);

//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedPrices, setSelectedPrices] = useState([]);
//   const [selectedColors, setSelectedColors] = useState([]);
//   const [selectedSizes, setSelectedSizes] = useState([]);
//   const [selectedTags, setSelectedTags] = useState([]);

// const handleFilterChange = () => {
//   const filters = {
//     category: selectedCategories.join(","),
//     priceRange: selectedPrices,
//     color: selectedColors.join(","),
//     size: selectedSizes.join(","),
//     tags: selectedTags.join(","),
//   };

//   if (onFilterChange) onFilterChange(filters);
// };


// const toggleSelection = (value, selectedValues, setSelectedValues) => {
//   let updatedValues;

//   if (selectedValues.includes(value)) {
//     updatedValues = selectedValues.filter((item) => item !== value);
//   } else {
//     updatedValues = [...selectedValues, value];
//   }

//   setSelectedValues(updatedValues); // Update state

//   // Call the parent handler to update filters
//   handleFilterChange(updatedValues);
// };


//   return (
//     <div className="space-y-4 w-full md:w-60 p-4 bg-white rounded-md">
//       {/* Product Categories */}
//       <div>
//         <button
//           onClick={() => setIsCategoryOpen(!isCategoryOpen)}
//           className="flex justify-between w-full text-base font-semibold text-left py-2 px-3 border"
//         >
//           Product Categories
//           <span
//             className={`transform transition-transform pl-3 ${
//               isCategoryOpen ? "rotate-180" : ""
//             }`}
//           >
//             ⯆
//           </span>
//         </button>
//         {isCategoryOpen && (
//           <div className="py-5 pl-4 space-y-1 border">
//             {[
//               "Bags",
//               "Hoodies",
//               "Jackets",
//               "Men",
//               "Sweatshirts",
//               "Tshirts",
//               "Women",
//             ].map((category) => (
//               <p
//                 key={category}
//                 onClick={() =>
//                   toggleSelection(
//                     category,
//                     selectedCategories,
//                     setSelectedCategories
//                   )
//                 }
//                 className={`cursor-pointer ${
//                   selectedCategories.includes(category)
//                     ? "font-bold text-blue-500"
//                     : ""
//                 }`}
//               >
//                 {category}
//               </p>
//             ))}
//           </div>
//         )}
//       </div>
//       {/* Price */}
//       <div>
//         <button
//           onClick={() => setIsPriceOpen(!isPriceOpen)}
//           className="flex justify-between w-full text-base font-semibold text-left py-2 px-3 border"
//         >
//           Price
//           <span
//             className={`pl-3 transform transition-transform ${
//               isPriceOpen ? "rotate-180" : ""
//             }`}
//           >
//             ⯆
//           </span>
//         </button>
//         {isPriceOpen && (
//           <div className="py-5 pl-4 space-y-1 border">
//             {[
//               "$50-$100",
//               "$100-$150",
//               "$150-$200",
//               "$200-$250",
//               "$250-$300",
//               "$1-$50",
//             ].map((price) => (
//               <p
//                 key={price}
//                 onClick={() =>
//                   toggleSelection(price, selectedPrices, setSelectedPrices)
//                 }
//                 className={`cursor-pointer ${
//                   selectedPrices.includes(price)
//                     ? "font-bold text-blue-500"
//                     : ""
//                 }`}
//               >
//                 {price}
//               </p>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Color */}
//       <div>
//         <button
//           onClick={() => setIsColorOpen(!isColorOpen)}
//           className="flex justify-between w-full text-base font-semibold text-left py-2 px-3 border"
//         >
//           Color
//           <span
//             className={`pl-3 transform transition-transform ${
//               isColorOpen ? "rotate-180" : ""
//             }`}
//           >
//             ⯆
//           </span>
//         </button>
//         {isColorOpen && (
//           <div className="py-5 pl-4 space-y-1 border">
//             {["Blue", "Gray", "Green", "Red", "Yellow"].map((color) => (
//               <p
//                 key={color}
//                 onClick={() =>
//                   toggleSelection(color, selectedColors, setSelectedColors)
//                 }
//                 className={`cursor-pointer ${
//                   selectedColors.includes(color)
//                     ? "font-bold text-blue-500"
//                     : ""
//                 }`}
//               >
//                 {color}
//               </p>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Size */}
//       <div>
//         <button
//           onClick={() => setIsSizeOpen(!isSizeOpen)}
//           className="flex justify-between w-full text-base font-semibold text-left py-2 px-3 border"
//         >
//           Size
//           <span
//             className={`pl-3 transform transition-transform ${
//               isSizeOpen ? "rotate-180" : ""
//             }`}
//           >
//             ⯆
//           </span>
//         </button>
//         {isSizeOpen && (
//           <div className="py-5 pl-4 space-y-1 border">
//             {["Large", "Medium", "Small"].map((size) => (
//               <p
//                 key={size}
//                 onClick={() =>
//                   toggleSelection(size, selectedSizes, setSelectedSizes)
//                 }
//                 className={`cursor-pointer ${
//                   selectedSizes.includes(size) ? "font-bold text-blue-500" : ""
//                 }`}
//               >
//                 {size}
//               </p>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Tags */}
//       <div>
//         <button
//           onClick={() => setIsTagsOpen(!isTagsOpen)}
//           className="flex justify-between w-full text-base font-semibold text-left py-2 px-3 border"
//         >
//           Tags
//           <span
//             className={`pl-3 transform transition-transform ${
//               isTagsOpen ? "rotate-180" : ""
//             }`}
//           >
//             ⯆
//           </span>
//         </button>
//         {isTagsOpen && (
//           <div className="py-5 pl-4 space-y-1 border">
//             {["Clothing", "Fashion", "Men", "Women", "Products"].map((tag) => (
//               <p
//                 key={tag}
//                 onClick={() =>
//                   toggleSelection(tag, selectedTags, setSelectedTags)
//                 }
//                 className={`cursor-pointer ${
//                   selectedTags.includes(tag) ? "font-bold text-blue-500" : ""
//                 }`}
//               >
//                 {tag}
//               </p>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ShopSideBar;
import React, { useState } from "react";

const ShopSideBar = ({ onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleFilter = (value, type, state, setState) => {
    const updated = state.includes(value)
      ? state.filter((v) => v !== value)
      : [...state, value];
    setState(updated);

    const filterPayload = {
      category:
        type === "category" ? updated.join(",") : selectedCategories.join(","),
      priceRange: type === "price" ? updated : selectedPrices,
      color: type === "color" ? updated.join(",") : selectedColors.join(","),
      size: type === "size" ? updated.join(",") : selectedSizes.join(","),
      tags: type === "tags" ? updated.join(",") : selectedTags.join(","),
    };

    if (onFilterChange) onFilterChange(filterPayload);
  };

  const renderSection = (
    title,
    items,
    type,
    state,
    setState,
    isOpen = true
  ) => (
    <div>
      <button className="flex justify-between w-full text-base font-semibold text-left py-2 px-3 border rounded-md">
        {title}
        <span
          className={`pl-3 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ⯆
        </span>
      </button>

      {isOpen && (
        <div className="py-5 pl-4 space-y-1 border border-t-0 rounded-b-md">
          {items.map((item) => (
            <p
              key={item}
              onClick={() => toggleFilter(item, type, state, setState)}
              className={`cursor-pointer hover:font-semibold transition-colors ${
                state.includes(item) ? "font-bold text-blue-500" : ""
              }`}
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4 w-full md:w-60 p-4 bg-white rounded-md shadow">
      {renderSection(
        "Product Categories",
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
        "Price",
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
        "Color",
        ["Blue", "Gray", "Green", "Red", "Yellow"],
        "color",
        selectedColors,
        setSelectedColors
      )}
      {renderSection(
        "Size",
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
  );
};

export default ShopSideBar;
