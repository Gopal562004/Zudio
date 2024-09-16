import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const LatestProduct = () => {
  const [inView, setInView] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }} // Initial state: hidden and shifted down
      animate={controls} // Trigger animation when in view
      transition={{ duration: 1 }} // Animation duration
      className="p-4 mx-4 sm:mx-12 lg:mx-28 flex flex-col"
    >
      {/* Header section with animation */}
      <div className="text-center mb-8">
        <h2 className="text-sm text-gray-500 uppercase tracking-wider">
          Latest Product
        </h2>
        <h1 className="text-4xl font-medium">New Arrivals</h1>
      </div>

      {/* Product grid container with animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-1 gap-y-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={index}
            className="relative w-full sm:w-[90%] md:w-[80%] lg:w-full h-[400px] transition-opacity duration-1000 mx-auto"
            style={{ animation: `fadeIn 2s ease-out ${index * 0.3}s` }} // Slower fade-in with increased delay
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.2 }} // Staggered animation
          >
            <img
              src={`/public/latest_product/c${index + 1}.png`} // Adjust path if necessary
              alt={`Product ${index + 1}`}
              className="w-full h-[80%] object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-white bg-opacity-75">
              <div className="text-left">
                <p className="text-sm leading-3">Jacket</p>
                <p className="text-sm font-medium leading-7">
                  Drop-shoulder denim jacket
                </p>
                <p className="text-sm">$45.90</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show more products button with animation */}
      <div className="flex justify-center mt-8">
        <motion.div
          className="text-center text-sm border-black bg-white hover:text-white hover:bg-black border p-2 cursor-pointer rounded-md transition-colors duration-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }} // Delayed animation for the button
        >
          Show more products
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LatestProduct;
