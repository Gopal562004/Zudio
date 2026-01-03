
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Star, 
  Heart, 
  ShoppingBag,
  Eye,
  Check
} from "lucide-react";

const ProductCategories = ({ products, viewMode = "grid" }) => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  if (viewMode === "list") {
    return (
      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => handleProductClick(product)}
            className="flex flex-col sm:flex-row gap-4 p-3 border border-gray-100 hover:border-gray-300 transition cursor-pointer group"
          >
            <div className="relative aspect-square w-full sm:w-40 flex-shrink-0 overflow-hidden bg-gray-50">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.images[1] && (
                <img
                  src={product.images[1]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              )}
              {product.stock < 10 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                  Low Stock
                </span>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-sm sm:text-base truncate">{product.name}</h3>
                <span className="text-sm sm:text-base font-bold">${product.price}</span>
              </div>
              
              <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
              
              <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                {product.description || "No description available"}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.avgRating || 0)
                            ? "fill-black stroke-black"
                            : "stroke-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.numReviews || 0})
                  </span>
                </div>
                
                <span className="text-xs text-gray-500">
                  <Check className="w-3 h-3 inline mr-1" />
                  {product.stock} in stock
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default grid view
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {products.map((product) => (
        <div
          key={product._id}
          onClick={() => handleProductClick(product)}
          className="group cursor-pointer"
        >
          <div className="relative overflow-hidden bg-gray-50 aspect-square mb-3">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {product.images[1] && (
              <img
                src={product.images[1]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
            
            <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-xs hover:shadow-sm transition opacity-0 group-hover:opacity-100">
              <Heart className="w-4 h-4 stroke-gray-400" />
            </button>
            
            {product.stock < 10 && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                Low Stock
              </span>
            )}
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium truncate">{product.name}</h3>
            <p className="text-xs text-gray-500 truncate">{product.brand}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">${product.price}</span>
              <div className="flex items-center">
                <Star className="w-3 h-3 fill-gray-300 stroke-gray-300" />
                <span className="text-xs text-gray-500 ml-0.5">
                  {product.avgRating?.toFixed(1) || '0.0'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCategories;
