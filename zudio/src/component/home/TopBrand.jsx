import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion, useAnimation } from "framer-motion";

const TopBrand = () => {
  const brands = [
    "/topbrands/b1.png",
    "/topbrands/b2.png",
    "/topbrands/b3.png",
    "/topbrands/b4.png",
    "/topbrands/b5.png",
    "/topbrands/b6.png",
    "/topbrands/b7.png",
    "/topbrands/b8.png",
  ];

  const [inView, setInView] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Stop observing after the component is in view
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
    <div className="my-16 px-4 max-w-screen-xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 1 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-4">
            Top Collections
          </h2>
          <h1 className="text-4xl font-medium">Popular Collections</h1>
        </div>

        <div className="relative">
          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            navigation
            //pagination={{ clickable: true }}
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 3 },
              640: { slidesPerView: 4 },
              768: { slidesPerView: 5 },
              1024: { slidesPerView: 6 },
            }}
            modules={[Autoplay, Pagination, Navigation]}
            speed={1000}
            className="relative swiper-container"
          >
            {brands.map((brand, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <img
                  src={brand}
                  alt={`Brand ${index + 1}`}
                  className="w-full h-auto object-contain md:w-[70%] md:h-[70%] lg:w-[60%] lg:h-[60%]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom pagination container */}
          <div className="swiper-pagination absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default TopBrand;
