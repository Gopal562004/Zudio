import React, { useState, useEffect } from "react";

const slides = [
  {
    image: {
      desktop:
        "https://ik.imagekit.io/projects052004/zudio/cothing2.avif?updatedAt=1739705963926", // Desktop image
      mobile:
        "https://ik.imagekit.io/projects052004/zudio/clothingmobile1_cleanup.jpg?updatedAt=1739705964233", // Mobile image
    },
    title: "Whimsy Blossoms",
    subtitle: "Embrace Playful Sophistication",
  },
  {
    image: {
      desktop:
        "https://ik.imagekit.io/projects052004/zudio/clothing1.jpg?updatedAt=1739705963830", // Desktop image
      mobile:
        "https://ik.imagekit.io/projects052004/zudio/clothingmobile2.jpg?updatedAt=1739705964195", // Mobile image
    },
    title: "Chic Reverie",
    subtitle: "Fashioning Dreams into Reality",
  },
];
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textClass, setTextClass] = useState("translate-y-10 opacity-0");
  const [shopNowClass, setShopNowClass] = useState("translate-y-10 opacity-0");

  useEffect(() => {
    setTimeout(() => {
      setTextClass(
        "translate-y-0 opacity-100 transition-all duration-1000 ease-out"
      );
    }, 500);
  }, [currentSlide]);

  useEffect(() => {
    setTimeout(() => {
      setShopNowClass(
        "translate-y-0 opacity-100 transition-all duration-1000 ease-out"
      );
    }, 1000);
  }, [currentSlide]);

  const handleNextSlide = () => {
    setTextClass("translate-y-10 opacity-0");
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 500);
  };

  const handlePrevSlide = () => {
    setTextClass("translate-y-10 opacity-0");
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, 500);
  };

  return (
    <div className="relative w-full h-screen bg-gray-100">
      <div className="absolute inset-0">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet={slides[currentSlide].image.mobile}
          />
          <img
            src={slides[currentSlide].image.desktop}
            alt="Slide"
            className="w-full h-full object-cover"
          />
        </picture>
      </div>
      <div
        className={`absolute left-10 bottom-16 text-left ${textClass}`}
        style={{
          transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
        }}
      >
        <h2 className="text-xl md:text-4xl lg:text-6xl font-semibold text-gray-900">
          {slides[currentSlide].title}
        </h2>
        <p className="text-sm md:text-2xl lg:text-4xl font-light text-gray-700 mt-2 md:mt-4">
          {slides[currentSlide].subtitle}
        </p>
        <button
          className={`mt-4 md:mt-8 px-4 md:px-6 py-2 bg-black text-white rounded ${shopNowClass}`}
          style={{
            transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
          }}
        >
          Shop Now
        </button>
      </div>
      <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
        <button
          onClick={handlePrevSlide}
          className="bg-white p-3 rounded-full shadow-lg"
        >
          <span className="sr-only">Previous</span>
          &#10094;
        </button>
      </div>
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
        <button
          onClick={handleNextSlide}
          className="bg-white p-3 rounded-full shadow-lg"
        >
          <span className="sr-only">Next</span>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
