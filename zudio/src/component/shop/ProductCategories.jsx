import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCategories = ({ products }) => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    console.log(product);
    // Navigate to the product details page with the product data
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <div>
      {/* Product Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product._id} // Use product._id for the key
            onClick={() => handleProductClick(product)}
            className="cursor-pointer"
          >
            <div className="overflow-hidden relative">
              {/* Show first image by default */}
              <img
                src={product.images[0]} // First image
                alt={product.name}
                className="w-full h-64 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
              />

              {/* Show second image on hover */}
              <img
                src={product.images[1]} // Second image
                alt={product.name}
                className="absolute inset-0 w-full h-64 object-cover opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100"
              />
            </div>
            <div className="p-2">
              <div className="font-bold text-sm">{product.name}</div>
              <div className="text-gray-600 text-sm">{product.category}</div>
              <div className="font-semibold text-sm mt-2">${product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
