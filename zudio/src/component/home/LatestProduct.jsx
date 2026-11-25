import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getProducts } from "../../mongo/productServices";

const categories = [
  "All",
  "Women",
  "Men",
  "Hoodies",
  "Jackets",
  "Tshirts",
  "Bags",
];

const fallbackProducts = [
  {
    name: "Beige Ribbed Knit Sweater",
    category: "Sweatshirts",
    price: 45.9,
    images: ["/images/prod-knit-sweater.jpg"],
  },
  {
    name: "Charcoal Oversized Hoodie",
    category: "Hoodies",
    price: 49.99,
    images: ["/images/prod-hoodie.jpg"],
  },
  {
    name: "Matte Black Technical Windbreaker",
    category: "Jackets",
    price: 64.9,
    images: ["/images/prod-windbreaker.jpg"],
  },
  {
    name: "Classic Washed Denim Jacket",
    category: "Jackets",
    price: 74.5,
    images: ["/images/prod-denim-jacket.jpg"],
  },
  {
    name: "Striped Relaxed Poplin Shirt",
    category: "Men",
    price: 39.9,
    images: ["/images/prod-striped-shirt.jpg"],
  },
  {
    name: "Minimalist Geometric Boxy Tee",
    category: "Tshirts",
    price: 24.99,
    images: ["/images/prod-graphic-tee.jpg"],
  },
  {
    name: "Structured Buckle Crossbody Bag",
    category: "Bags",
    price: 54.0,
    images: ["/images/prod-crossbody-bag.jpg"],
  },
  {
    name: "Tailored Ivory Linen Overshirt",
    category: "Women",
    price: 52.0,
    images: ["/images/col-women.jpg"],
  },
];

const LatestProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(false);
  const [inView, setInView] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLatest = async () => {
      setLoading(true);
      try {
        const categoryParam =
          selectedCategory === "All" ? "" : selectedCategory;
        const data = await getProducts(1, 8, "newest", categoryParam);
        if (data?.products?.length > 0) {
          setProducts(data.products);
        } else if (selectedCategory === "All") {
          setProducts(fallbackProducts);
        } else {
          setProducts(
            fallbackProducts.filter((p) => p.category === selectedCategory)
          );
        }
      } catch {
        setProducts(
          selectedCategory === "All"
            ? fallbackProducts
            : fallbackProducts.filter((p) => p.category === selectedCategory)
        );
      } finally {
        setLoading(false);
      }
    };
    loadLatest();
  }, [selectedCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [inView, controls]);

  const handleProductClick = (product) => {
    if (product._id) {
      navigate(`/product/${product._id}`, { state: { product } });
    } else {
      navigate(`/shop?query=${encodeURIComponent(product.name)}`);
    }
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      transition={{ duration: 0.7 }}
      className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col"
    >
      {/* Title & Interactive Category Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-4 mb-8">
        <div>
          <h2 className="text-xs text-neutral-500 uppercase tracking-[0.2em]">
            Latest Product
          </h2>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-1">
            New Arrivals
          </h1>
        </div>

        <div className="flex overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium rounded-none border transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
                selectedCategory === cat
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] bg-neutral-100 animate-pulse border border-neutral-200"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {products.map((product, index) => (
            <div
              key={product._id || index}
              role="button"
              tabIndex={0}
              onClick={() => handleProductClick(product)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleProductClick(product);
                }
              }}
              className="group border border-neutral-200 bg-white rounded-none overflow-hidden cursor-pointer hover:border-black transition-colors duration-200"
            >
              <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
                <img
                  src={product.images?.[0] || "/images/prod-knit-sweater.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/85 text-white text-xs uppercase tracking-wider text-center py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  Quick View
                </span>
              </div>
              <div className="p-4">
                <p className="text-[11px] uppercase tracking-wider text-neutral-500">
                  {product.category}
                </p>
                <p className="text-sm font-medium text-neutral-900 truncate mt-1">
                  {product.name}
                </p>
                <p className="text-sm font-semibold text-neutral-900 mt-1">
                  ${Number(product.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Show More Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() =>
            navigate(
              selectedCategory === "All"
                ? "/shop"
                : `/shop?category=${encodeURIComponent(selectedCategory)}`
            )
          }
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold border border-black bg-white text-black hover:bg-black hover:text-white px-7 py-3.5 rounded-none transition-colors duration-200 cursor-pointer"
        >
          Show More Products
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.section>
  );
};

export default LatestProduct;
