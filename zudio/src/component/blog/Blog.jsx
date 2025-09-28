import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Sample blog posts (replace with API data if available)
const blogPosts = [
  {
    image:
      "https://ik.imagekit.io/projects052004/zudio/blog/post1.png?updatedAt=1739705918187",
    title: "Unveiling Elegance: Timeless Fashion Trends for Women",
    date: "December 19, 2023",
    author: "Admin",
    excerpt:
      "Explore the top timeless fashion trends that every woman should know in 2023. Elevate your wardrobe and stay elegant.",
  },
  {
    image:
      "https://ik.imagekit.io/projects052004/zudio/blog/post2.png?updatedAt=1739705918539",
    title: "Dress to Impress: A Guide to Power Dressing for Success",
    date: "December 20, 2023",
    author: "Admin",
    excerpt:
      "Learn how to dress for success with our complete guide to power dressing. Make an impact wherever you go.",
  },
  {
    image:
      "https://ik.imagekit.io/projects052004/zudio/blog/post3.png?updatedAt=1739705918512",
    title: "Fashion Forward: Emerging Trends You Need to Know",
    date: "December 21, 2023",
    author: "Admin",
    excerpt:
      "Stay ahead of the curve with the latest fashion trends and elevate your style with these must-know insights.",
  },
  {
    image:
      "https://media.istockphoto.com/id/1007817424/photo/hipster-girl-in-gypsy-look-young-traveler-in-the-usa-desert.jpg?s=612x612&w=0&k=20&c=X02qEWjsq-2NA5KLGG24JyTKAbVEsBCfnxyRgil3LtM=",
    title: "Sustainable Fashion: Making Eco-Friendly Choices",
    date: "December 22, 2023",
    author: "Admin",
    excerpt:
      "Discover sustainable fashion tips and eco-friendly brands that help you make responsible clothing choices.",
  },
];

const Blog = () => {
  const [inView, setInView] = useState(false);
  const controls = useAnimation();
  const sectionRef = useRef(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [inView, controls]);

  return (
    <div className="min-h-screen bg-customGray1 py-12 px-4 md:px-16 lg:px-32">
      {/* Page Header */}
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-2">
          Blog & Insights
        </h2>
        <h1 className="text-4xl font-semibold">Latest Articles</h1>
      </motion.div>

      {/* Blog Post Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            className="bg-white  shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            whileHover={{ scale: 1.03 }}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-in-out hover:scale-110"
              />
            </div>
            <div className="p-6">
              <p className="text-xs text-gray-400 mb-2">
                By {post.author} • {post.date}
              </p>
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.excerpt}</p>
              <button className="mt-4 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors duration-300">
                Read More
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Optional Carousel for Featured Posts */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Featured Posts
        </h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {blogPosts.map((post, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-in-out hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-400 mb-1">
                    By {post.author} • {post.date}
                  </p>
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
};

export default Blog;
