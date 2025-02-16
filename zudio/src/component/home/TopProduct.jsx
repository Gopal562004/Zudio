import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion, useAnimation } from "framer-motion";

const swiperParams = {
  autoplay: {
    delay: 5000, // Auto slide every 5 seconds
    disableOnInteraction: false, // Continue autoplay after user interaction
  },
  // pagination: {
  //   clickable: true, // Enable clickable pagination
  // },
  navigation: true, // Add navigation arrows
  loop: true, // Loop through slides
  speed: 1000, // Transition speed (1000ms)
  breakpoints: {
    // Adjust slides per view based on screen size
    640: {
      slidesPerView: 1, // 1 slide per view on mobile
    },
    768: {
      slidesPerView: 2, // 2 slides per view on tablet
    },
    1024: {
      slidesPerView: 3, // 3 slides per view on desktop
    },
    1280: {
      slidesPerView: 4, // 4 slides per view on larger screens
    },
  },
  modules: [Autoplay, Pagination, Navigation],
};

const TopProduct = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const controls = useAnimation();

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
    <div ref={ref} className="w-full px-4 max-w-screen-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 1 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-sm text-gray-500 uppercase tracking-wider">
            Top Product
          </h2>
          <h1 className="text-4xl font-medium">Best Seller</h1>
        </div>

        <Swiper
          {...swiperParams}
          className="custom-swiper relative swiper-container"
        >
          <SwiperSlide>
            <div className="relative h-[400px] mx-1">
              <img
                src="https://ik.imagekit.io/projects052004/zudio/top_products/c1.png?updatedAt=1739705861486"
                alt="Beige Sweater"
                className="w-full h-[80%] object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-white bg-opacity-75">
                <div className="text-left">
                  <p className="text-sm leading-3">Sweater</p>
                  <p className="text-sm font-medium leading-7">
                    Beige Knit Sweater
                  </p>
                  <p className="text-sm">$45.90</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-[400px] mx-1">
              <img
                src="https://ik.imagekit.io/projects052004/zudio/top_products/c2.png?updatedAt=1739705861425"
                alt="Gray Hoodie"
                className="w-full h-[80%] object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-white bg-opacity-75">
                <div className="text-left">
                  <p className="text-sm leading-3">Hoodie</p>
                  <p className="text-sm font-medium leading-7">
                    Gray Oversized Hoodie
                  </p>
                  <p className="text-sm">$45.90</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-[400px] mx-1">
              <img
                src="https://ik.imagekit.io/projects052004/zudio/top_products/c3.png?updatedAt=1739705861465"
                alt="Black Windbreaker"
                className="w-full h-[80%] object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-white bg-opacity-75">
                <div className="text-left">
                  <p className="text-sm leading-3">Jacket</p>
                  <p className="text-sm font-medium leading-7">
                    Black Windbreaker
                  </p>
                  <p className="text-sm">$45.90</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-[400px] mx-1">
              <img
                src="https://ik.imagekit.io/projects052004/zudio/top_products/c4.png?updatedAt=1739705861494"
                alt="Denim Jacket"
                className="w-full h-[80%] object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-white bg-opacity-75">
                <div className="text-left">
                  <p className="text-sm leading-3">Jacket</p>
                  <p className="text-sm font-medium leading-7">
                    Classic Denim Jacket
                  </p>
                  <p className="text-sm">$45.90</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-[400px] mx-1">
              <img
                src="https://ik.imagekit.io/projects052004/zudio/top_products/c6.png?updatedAt=1739705861728"
                alt="Striped Sweater"
                className="w-full h-[80%] object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-white bg-opacity-75">
                <div className="text-left">
                  <p className="text-sm leading-3">Sweater</p>
                  <p className="text-sm font-medium leading-7">
                    Striped Knit Sweater
                  </p>
                  <p className="text-sm">$45.90</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </motion.div>

      <div className="min-h-[80vh] mt-16">
        <div className="flex flex-col lg:flex-row items-center justify-between p-8 lg:p-16">
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-start">
            <div className="relative">
              <img
                src="https://ik.imagekit.io/projects052004/zudio/top_products/videoimg.png?updatedAt=1739705861749"
                alt="Model Image"
                className="w-full h-auto object-cover lg:max-w-sm rounded-lg"
              />
              <a
                href="https://www.youtube.com/watch?v=wII9bv2P9c8"
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-white p-2 rounded-full shadow-lg">
                  <svg
                    className="w-8 h-8 text-gray-800"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.5 12l-12 6V6l12 6z" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 w-full text-center lg:text-left mt-8 lg:mt-0 flex flex-col items-center lg:items-center">
            <p className="text-gray-500 text-sm uppercase text-center">
              Up to 60% Off
            </p>
            <h2 className="text-3xl lg:text-5xl font-semibold mt-4 text-center">
              Unleash Your Style Potential with Our Spectacular Clothing Sale
            </h2>
            <p className="text-gray-600 mt-4 text-center text-sm">
              Feel free to customize these titles to fit the tone and theme of
              your clothing sale and to convey the excitement of the discounts
              being offered.
            </p>
            <div className="flex justify-center lg:justify-center space-x-4 mt-8 text-center">
              <div className="text-center">
                <div className="text-2xl font-semibold">89</div>
                <div className="text-sm text-gray-500">Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">06</div>
                <div className="text-sm text-gray-500">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">51</div>
                <div className="text-sm text-gray-500">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">49</div>
                <div className="text-sm text-gray-500">Seconds</div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-center mt-8">
              <a
                href="#"
                className="bg-gray-900 text-white px-6 py-3 rounded-md text-sm uppercase font-medium hover:bg-gray-700"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProduct;
