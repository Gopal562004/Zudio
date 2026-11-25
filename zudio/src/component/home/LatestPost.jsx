import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { motion, useAnimation } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    image: "/images/hero-1.jpg",
    title: "Dress to Impress: Minimalist Layering for Everyday Style",
    date: "November 19, 2026",
    author: "Zudio Editorial",
  },
  {
    image: "/images/col-men.jpg",
    title: "Fashion Forward: Utility Overshirts & Boxy Fits",
    date: "November 12, 2026",
    author: "Zudio Editorial",
  },
  {
    image: "/images/col-women.jpg",
    title: "Unveiling Elegance: Timeless Neutral Wardrobe Essentials",
    date: "November 05, 2026",
    author: "Zudio Editorial",
  },
];

const LatestPost = () => {
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
    <section className="bg-neutral-50 border-t border-neutral-200 py-16">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        transition={{ duration: 0.7 }}
        className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-neutral-200 pb-4 gap-3">
          <div>
            <h2 className="text-xs text-neutral-500 uppercase tracking-[0.2em]">
              Latest Posts
            </h2>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-1">
              Blog & Insights
            </h1>
          </div>
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:underline cursor-pointer self-start sm:self-auto"
          >
            Read All Articles
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          navigation
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {posts.map((post, index) => (
            <SwiperSlide key={index}>
              <article
                role="button"
                tabIndex={0}
                onClick={() => navigate("/blog")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate("/blog");
                  }
                }}
                className="group bg-white border border-neutral-200 hover:border-black rounded-none overflow-hidden cursor-pointer transition-colors"
              >
                <div className="relative overflow-hidden h-56 sm:h-64">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
                    By {post.author} • {post.date}
                  </p>
                  <h3 className="text-base font-semibold text-neutral-900 leading-snug group-hover:underline">
                    {post.title}
                  </h3>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default LatestPost;
