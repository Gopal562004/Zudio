import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion, useAnimation } from "framer-motion";

const LatestPost = () => {
  const posts = [
    {
      image:
        "https://ik.imagekit.io/projects052004/zudio/blog/post2.png?updatedAt=1739705918539",
      title: "Dress to Impress: A Guide to Power Dressing for Success",
      date: "December 19, 2023",
      author: "admin",
    },
    {
      image:
        "https://ik.imagekit.io/projects052004/zudio/blog/post3.png?updatedAt=1739705918512",
      title: "Fashion Forward: Emerging Trends You Need to Know",
      date: "December 19, 2023",
      author: "admin",
    },
    {
      image:
        "https://ik.imagekit.io/projects052004/zudio/blog/post1.png?updatedAt=1739705918187",
      title: "Unveiling Elegance: Timeless Fashion Trends for Women",
      date: "December 19, 2023",
      author: "admin",
    },
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
      { threshold: 0.3 } // Adjust the threshold as needed
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
    <div className="bg-customGray1 p-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }} // Start with hidden and shifted down
        animate={controls}
        transition={{ duration: 1 }} // Duration of the animation
        className="my-16 px-4 max-w-screen-xl mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-sm text-gray-500 uppercase tracking-wider my-4">
            Latest posts
          </h2>
          <h1 className="text-4xl font-medium">Blog & Insights</h1>
        </div>

        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Autoplay, Pagination, Navigation]}
          breakpoints={{
            768: { slidesPerView: 2 }, // For tablets and up
            1024: { slidesPerView: 3 }, // For desktops and up
          }}
        >
          {posts.map((post, index) => (
            <SwiperSlide
              key={index}
              className="relative overflow-hidden opacity-1 animate-slideUp group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="p-4 bg-opacity-70">
                <p className="text-sm text-gray-500 mb-2">
                  By {post.author} • {post.date}
                </p>
                <h3 className="text-lg font-semibold">{post.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
};

export default LatestPost;
