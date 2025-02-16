import React, { useState, useEffect } from "react";

const CustomSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      src: "sweater.jpg",
      alt: "Soft knit sweater",
      description: "Soft knit sweater",
      price: "$45.90",
    },
    {
      src: "hoodie.jpg",
      alt: "Printed graphic hoodie",
      description: "Printed graphic hoodie",
      price: "$45.90",
    },
    {
      src: "tshirt.jpg",
      alt: "Short sleeve mushrooms T-shirt",
      description: "Short sleeve mushrooms T-shirt",
      price: "$27.90",
    },
    {
      src: "denim-jacket.jpg",
      alt: "Drop-shoulder denim jacket",
      description: "Drop-shoulder denim jacket",
      price: "$39.90",
      oldPrice: "$49.90",
    },
    // Add more items as needed
  ];

  const visibleSlides = 4; // Number of slides visible at a time

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - visibleSlides ? 0 : prevIndex + 1
      );
    }, 5000); // Slide every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - visibleSlides : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - visibleSlides ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
        }}
      >
        {images.map((image, index) => (
          <div className="w-1/4 flex-shrink-0 p-2" key={index}>
            <img src={image.src} alt={image.alt} className="w-full h-auto" />
            <div className="text-center mt-4">
              <p>{image.description}</p>
              <p>
                {image.oldPrice && (
                  <span className="line-through text-gray-500 mr-2">
                    {image.oldPrice}
                  </span>
                )}
                {image.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Prev/Next buttons */}
      <button
        onClick={handlePrevClick}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1"
      >
        &#8249;
      </button>
      <button
        onClick={handleNextClick}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1"
      >
        &#8250;
      </button>
    </div>
  );
};

export default CustomSwiper;
