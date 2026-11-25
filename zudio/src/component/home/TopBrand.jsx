import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { motion, useAnimation } from "framer-motion";

const brandItems = [
  { img: "/topbrands/b1.png", label: "Zudio Studio", link: "/shop?category=Women" },
  { img: "/topbrands/b2.png", label: "Zudio Street", link: "/shop?category=Hoodies" },
  { img: "/topbrands/b3.png", label: "Zudio Urban", link: "/shop?category=Jackets" },
  { img: "/topbrands/b4.png", label: "Zudio Denim", link: "/shop?category=Men" },
  { img: "/topbrands/b5.png", label: "Zudio Essentials", link: "/shop?category=Sweatshirts" },
  { img: "/topbrands/b6.png", label: "Zudio Tees", link: "/shop?category=Tshirts" },
  { img: "/topbrands/b7.png", label: "Zudio Carry", link: "/shop?category=Bags" },
  { img: "/topbrands/b8.png", label: "Zudio New", link: "/shop?tags=New" },
];

const TopBrand = () => {
  const [inView, setInView] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [inView, controls]);

  return (
    <section className="my-12 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        transition={{ duration: 0.7 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-xs text-neutral-500 uppercase tracking-[0.2em] mb-2">
            Featured Labels
          </h2>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Shop by Brand Line
          </h1>
        </div>

        <Swiper
          spaceBetween={16}
          slidesPerView={2}
          navigation
          loop
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          modules={[Autoplay, Navigation]}
          speed={700}
          className="relative swiper-container"
        >
          {brandItems.map((brand, index) => (
            <SwiperSlide key={index}>
              <button
                onClick={() => navigate(brand.link)}
                className="w-full h-24 border border-neutral-200 hover:border-black bg-white rounded-none flex items-center justify-center p-4 transition-colors cursor-pointer group"
                title={brand.label}
              >
                <img
                  src={brand.img}
                  alt={brand.label}
                  className="max-h-12 w-auto object-contain opacity-75 group-hover:opacity-100 transition-opacity"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default TopBrand;
