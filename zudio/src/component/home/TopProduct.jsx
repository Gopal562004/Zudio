import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight, Play, X } from "lucide-react";
import { getProducts } from "../../mongo/productServices";

const fallbackBestSellers = [
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
    name: "Structured Buckle Crossbody Bag",
    category: "Bags",
    price: 54.0,
    images: ["/images/prod-crossbody-bag.jpg"],
  },
];

const swiperParams = {
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  navigation: true,
  loop: true,
  speed: 700,
  spaceBetween: 16,
  breakpoints: {
    320: { slidesPerView: 1.2 },
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 4 },
  },
  modules: [Autoplay, Navigation],
};

const TopProduct = () => {
  const [products, setProducts] = useState(fallbackBestSellers);
  const [inView, setInView] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 12,
    hours: 6,
    minutes: 51,
    seconds: 49,
  });
  const ref = useRef(null);
  const controls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTopProducts = async () => {
      try {
        const data = await getProducts(
          1,
          8,
          "price_desc",
          "",
          "",
          0,
          10000,
          "",
          "",
          "Popular"
        );
        if (data?.products?.length > 0) {
          setProducts(data.products);
        }
      } catch {
        // Keep fallback items if backend is unavailable
      }
    };
    loadTopProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return { days: 12, hours: 6, minutes: 51, seconds: 49 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
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

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section ref={ref} className="w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        transition={{ duration: 0.7 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-neutral-200 pb-4 gap-3">
          <div>
            <h2 className="text-xs text-neutral-500 uppercase tracking-[0.2em]">
              Top Product
            </h2>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-1">
              Best Sellers
            </h1>
          </div>
          <button
            onClick={() => navigate("/shop?tags=Popular")}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:underline cursor-pointer self-start sm:self-auto"
          >
            Shop Best Sellers
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <Swiper {...swiperParams} className="custom-swiper relative swiper-container">
          {products.map((product, idx) => (
            <SwiperSlide key={product._id || idx}>
              <div
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
                    View Product
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
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Interactive Lookbook & Live Sale Countdown */}
      <div className="mt-20 border border-neutral-200 bg-neutral-50">
        <div className="flex flex-col lg:flex-row items-center justify-between p-6 sm:p-10 lg:p-14 gap-10">
          <div className="lg:w-5/12 w-full flex justify-center">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setVideoModalOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setVideoModalOpen(true);
                }
              }}
              className="relative w-full max-w-sm overflow-hidden rounded-none group cursor-pointer border border-neutral-200"
            >
              <img
                src="/images/col-women.jpg"
                alt="Zudio Seasonal Lookbook"
                className="w-full h-80 sm:h-[400px] lg:h-[420px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="bg-white text-black px-4 py-3 rounded-none flex items-center gap-2 text-xs uppercase tracking-wider font-semibold shadow-md group-hover:bg-black group-hover:text-white transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                  Watch Lookbook
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-7/12 w-full text-center lg:text-left flex flex-col items-center lg:items-start">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold">
              Limited Time — Up to 60% Off
            </span>
            <h2 className="text-3xl lg:text-5xl font-semibold mt-3 tracking-tight text-neutral-900">
              Unleash Your Style with the Zudio Season Drop
            </h2>
            <p className="text-neutral-600 mt-4 text-sm max-w-xl leading-relaxed">
              Curated outerwear, heavyweight hoodies, and minimalist daily
              essentials at seasonal archive pricing.
            </p>

            {/* Live Ticking Countdown */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-8 w-full max-w-md">
              {[
                { label: "Days", value: pad(countdown.days) },
                { label: "Hours", value: pad(countdown.hours) },
                { label: "Minutes", value: pad(countdown.minutes) },
                { label: "Seconds", value: pad(countdown.seconds) },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="bg-white border border-neutral-200 px-2 py-2.5 sm:px-4 sm:py-3 text-center rounded-none"
                >
                  <div className="text-lg sm:text-2xl font-semibold font-mono text-neutral-900">
                    {unit.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-500 mt-0.5">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/shop?tags=Limited")}
                className="inline-flex items-center gap-2 bg-black text-white px-7 py-3.5 rounded-none text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Shop Limited Drop
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate("/shop")}
                className="inline-flex items-center gap-2 bg-white text-black border border-black px-7 py-3.5 rounded-none text-xs uppercase tracking-wider font-semibold hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Browse All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lookbook Video Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-black border border-neutral-700 rounded-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              aria-label="Close lookbook video"
              className="absolute -top-10 right-0 text-white hover:text-neutral-300 flex items-center gap-1 text-xs uppercase tracking-wider cursor-pointer"
            >
              Close <X className="w-4 h-4" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/wII9bv2P9c8?autoplay=1"
                title="Zudio Lookbook"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TopProduct;
