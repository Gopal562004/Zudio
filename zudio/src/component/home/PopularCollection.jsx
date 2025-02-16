import React, { useEffect, useState, useRef } from "react";

const PopularCollection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(sectionRef.current); // Stop observing once the element is in view
        }
      },
      { threshold: 0.2 } // Trigger when 10% of the element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`w-full h-full md:p-28 p-5 ${
        isVisible ? "animate-slideUp" : "opacity-0"
      }`}
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-sm text-gray-500 uppercase tracking-wider">
          Top Collections
        </h2>
        <h1 className="text-4xl font-medium">Popular Collections</h1>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
        {/* Large Image Section */}
        <div className="col-span-1 md:col-span-2 bg-gray-300 p-4 flex items-center justify-start relative h-96 overflow-hidden group">
          <img
            src="https://ik.imagekit.io/projects052004/zudio/topCollections/top1.jpg?updatedAt=1739707882429" // Replace with your image URL
            alt="Effortless Style for the Modern Woman"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
          />
          <div className="relative z-10 text-black p-6 flex flex-col items-start justify-center h-full">
            <h3 className="text-lg font-semibold">Chasing Urban Allure</h3>
            <h2 className="text-2xl font-bold">
              Effortless Style for <br /> the Modern Woman
            </h2>
            <button className="mt-4 px-4 py-2 bg-white text-black text-sm md:px-6 md:py-2 md:text-base transition-transform duration-2000 ease-in-out group-hover:text-white group-hover:bg-black">
              Shop Now
            </button>
          </div>
          <div className="absolute inset-0 bg-black opacity-10 transition-opacity duration-500 ease-in-out group-hover:opacity-30"></div>
        </div>

        {/* Tall Image Section */}
        <div className="row-span-1 md:row-span-2 bg-gray-400 p-4 flex items-center justify-start relative overflow-hidden group">
          <img
            src="https://ik.imagekit.io/projects052004/zudio/topCollections/top3.jpg?updatedAt=1739707882609" // Replace with your image URL
            alt="Everyday Cuteness for Kids"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
          />
          <div className="relative z-10 text-white p-6 flex flex-col items-start justify-center">
            <h3 className="text-lg font-semibold">Adorable Essentials</h3>
            <h2 className="text-2xl font-bold">
              Everyday Cuteness
              <br /> for Kids
            </h2>
            <button className="mt-4 px-4 py-2 bg-white text-black text-sm md:px-6 md:py-2 md:text-base transition-transform duration-2000 ease-in-out group-hover:text-white group-hover:bg-black">
              Shop Now
            </button>
          </div>
          <div className="absolute inset-0 bg-black opacity-10 transition-opacity duration-500 ease-in-out group-hover:opacity-30"></div>
        </div>

        {/* Small Image Sections */}
        <div className="bg-gray-500 p-4 flex items-center justify-end relative overflow-hidden group">
          <img
            src="https://ik.imagekit.io/projects052004/zudio/topCollections/top2.jpg?updatedAt=1739707882428" // Replace with your image URL
            alt="Elevate Your Look"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
          />
          <div className="relative z-10 text-white p-6 flex flex-col items-end justify-center">
            <h3 className="text-lg font-semibold">Urban Elegance</h3>
            <h2 className="text-2xl font-bold">Elevate Your Look</h2>
            <button className="mt-4 px-4 py-2 bg-white text-black text-sm md:px-6 md:py-2 md:text-base transition-transform duration-2000 ease-in-out group-hover:text-white group-hover:bg-black">
              Shop Now
            </button>
          </div>
          <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-30"></div>
        </div>

        <div className="bg-customBrown p-4 flex items-end justify-start relative overflow-hidden group">
          <img
            src="https://ik.imagekit.io/projects052004/zudio/topCollections/off50.jpg?updatedAt=1739707863777" // Replace with your image URL
            alt="Mastering the Art of Menswear"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
          />
          <div className="relative z-10 text-white p-6 flex flex-col items-start justify-end">
            <h3 className="text-lg font-semibold">
              Mastering the Art of Menswear
            </h3>
            <h2 className="text-2xl font-bold">50% Off</h2>
            <button className="mt-4 px-4 py-2 bg-white text-black text-sm md:px-6 md:py-2 md:text-base transition-transform duration-2000 ease-in-out group-hover:text-white group-hover:bg-black">
              Shop Now
            </button>
          </div>
          <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

export default PopularCollection;
