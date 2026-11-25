import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: {
      desktop: "/images/hero-1.jpg",
      mobile: "/images/hero-1.jpg",
    },
    eyebrow: "ZUDIO STUDIO — AW EDITION",
    title: "Minimalist Urban Layers",
    subtitle: "Elevated knitwear, relaxed denim & everyday essentials",
    ctaText: "Shop New Arrivals",
    ctaLink: "/shop?tags=New",
    secondaryText: "Explore Women",
    secondaryLink: "/shop?category=Women",
  },
  {
    image: {
      desktop: "/images/hero-2.jpg",
      mobile: "/images/hero-2.jpg",
    },
    eyebrow: "ZUDIO STREET — UTILITY DROP",
    title: "Structured Streetwear",
    subtitle: "Crisp overshirts, boxy tees & wide-leg cargos built to move",
    ctaText: "Shop Streetwear",
    ctaLink: "/shop?category=Jackets",
    secondaryText: "Explore Men",
    secondaryLink: "/shop?category=Men",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const active = slides[currentSlide];

  return (
    <section
      className="relative w-full h-[68vh] min-h-[440px] sm:h-[78vh] md:h-[85vh] md:min-h-[540px] bg-neutral-900 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <picture>
          <source media="(max-width: 768px)" srcSet={active.image.mobile} />
          <img
            key={active.image.desktop}
            src={active.image.desktop}
            alt={active.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 scale-100"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent md:bg-gradient-to-r md:from-black/75 md:via-black/40 md:to-transparent" />
      </div>

      {/* Editorial Content */}
      <div className="relative z-10 h-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col justify-end pb-10 sm:pb-16 md:pb-24">
        <span className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-neutral-300 mb-2 sm:mb-3 font-medium">
          {active.eyebrow}
        </span>
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-semibold text-white tracking-tight max-w-2xl leading-tight">
          {active.title}
        </h1>
        <p className="text-xs sm:text-base lg:text-xl font-light text-neutral-200 mt-2 sm:mt-3 max-w-xl">
          {active.subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-5 sm:mt-7">
          <button
            onClick={() => navigate(active.ctaLink)}
            className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-white text-black text-[11px] sm:text-sm uppercase tracking-wider font-semibold rounded-none hover:bg-black hover:text-white border border-white transition-colors duration-200 cursor-pointer"
          >
            {active.ctaText}
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => navigate(active.secondaryLink)}
            className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-transparent text-white text-[11px] sm:text-sm uppercase tracking-wider font-medium rounded-none border border-white/60 hover:border-white hover:bg-white/10 transition-colors duration-200 cursor-pointer"
          >
            {active.secondaryText}
          </button>
        </div>

        {/* Slide Progress Indicators & Mobile Prev/Next */}
        <div className="flex items-center justify-between mt-6 sm:mt-10">
          <div className="flex items-center gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-0.5 transition-all duration-300 cursor-pointer ${
                  idx === currentSlide
                    ? "w-10 sm:w-12 bg-white"
                    : "w-5 sm:w-6 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
            <span className="text-xs text-neutral-300 ml-1 font-mono">
              0{currentSlide + 1} / 0{slides.length}
            </span>
          </div>

          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={handlePrevSlide}
              aria-label="Previous slide"
              className="bg-white/90 hover:bg-black text-black hover:text-white p-2 rounded-none border border-black/10 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextSlide}
              aria-label="Next slide"
              className="bg-white/90 hover:bg-black text-black hover:text-white p-2 rounded-none border border-black/10 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Prev / Next Controls */}
      <button
        onClick={handlePrevSlide}
        aria-label="Previous slide"
        className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-black text-black hover:text-white p-2.5 rounded-none border border-black/10 transition-colors duration-200 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={handleNextSlide}
        aria-label="Next slide"
        className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-black text-black hover:text-white p-2.5 rounded-none border border-black/10 transition-colors duration-200 cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </section>
  );
};

export default HeroSection;
