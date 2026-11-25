import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const collections = [
  {
    id: "women",
    eyebrow: "Chasing Urban Allure",
    title: "Effortless Style for the Modern Woman",
    image: "/images/col-women.jpg",
    link: "/shop?category=Women",
    spanClass: "col-span-1 md:col-span-2 h-72 sm:h-80 md:h-96",
    alignClass: "items-start justify-end",
  },
  {
    id: "kids",
    eyebrow: "Youth & Street",
    title: "Everyday Essentials & Hoodies",
    image: "/images/col-kids.jpg",
    link: "/shop?category=Hoodies",
    spanClass: "row-span-1 md:row-span-2 h-80 sm:h-96 md:h-auto md:min-h-[340px]",
    alignClass: "items-start justify-end",
  },
  {
    id: "men",
    eyebrow: "Urban Elegance",
    title: "Elevate Your Look",
    image: "/images/col-men.jpg",
    link: "/shop?category=Men",
    spanClass: "h-64 sm:h-72 md:h-80",
    alignClass: "items-start justify-end",
  },
  {
    id: "sale",
    eyebrow: "Seasonal Edit",
    title: "Up to 50% Off",
    image: "/images/col-sale.jpg",
    link: "/shop?sort=price_asc",
    spanClass: "h-64 sm:h-72 md:h-80",
    alignClass: "items-start justify-end",
  },
];

const PopularCollection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3 border-b border-neutral-200 pb-4">
        <div>
          <p className="text-xs text-neutral-500 uppercase tracking-[0.2em]">
            Curated Edits
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mt-1">
            Popular Collections
          </h2>
        </div>
        <button
          onClick={() => navigate("/shop")}
          className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:underline cursor-pointer self-start sm:self-auto"
        >
          View All Collections
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Sharp Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
        {collections.map((item) => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => navigate(item.link)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate(item.link);
              }
            }}
            className={`${item.spanClass} relative overflow-hidden bg-neutral-200 rounded-none group cursor-pointer flex ${item.alignClass} p-6`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/85" />

            <div className="relative z-10 text-white flex flex-col items-start">
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-200">
                {item.eyebrow}
              </span>
              <h3 className="text-xl md:text-2xl font-semibold mt-1 leading-snug max-w-xs">
                {item.title}
              </h3>
              <span className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black text-xs uppercase tracking-wider font-semibold rounded-none transition-colors duration-200 group-hover:bg-black group-hover:text-white border border-white">
                Shop Now
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCollection;
