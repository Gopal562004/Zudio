import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const productData = [
  {
    name: "T-shirt with contrasting slogan",
    category: "Jacket",
    price: "$45.90",
    img: "https://ik.imagekit.io/projects052004/zudio/latest_product/c7.png?updatedAt=1739705882480",
  },
  {
    name: "Dirty-effect denim overshirt",
    category: "T-Shirt",
    price: "$79.99",
    img: "https://ik.imagekit.io/projects052004/zudio/latest_product/c3.png?updatedAt=1739705882164",
  },
  {
    name: "Plaid box pleat mini skirt",
    category: "Woman",
    price: "$25.50",
    img: "https://ik.imagekit.io/projects052004/zudio/latest_product/c4.png?updatedAt=1739705882638",
  },
  {
    name: "Shoulder bag with buckle",
    category: "Bags",
    price: "$59.90",
    img: "https://ik.imagekit.io/projects052004/zudio/latest_product/c8.png?updatedAt=1739705882566",
  },
  {
    name: "Halter waistcoat with a tie at the back",
    category: "Woman",
    price: "$30.00",
    img: "https://ik.imagekit.io/projects052004/zudio/latest_product/c2.png?updatedAt=1739705882468",
  },
  {
    name: "Retro sneakers",
    category: "Footwear",
    price: "$69.99",
    img: "https://ik.imagekit.io/projects052004/zudio/latest_product/c6.png?updatedAt=1739705882405",
  },
  {
    name: "Striped poplin shirt with pocket detail",
    category: "Shirt",
    price: "$120.00",
    img: "https://ik.imagekit.io/projects052004/zudio/latest_product/c1.png?updatedAt=1739705882119",
  },
  {
    name: "Bear graphic T-shirt",
    category: "T-Shirt",
    price: "$99.99",
    img: "https://ik.imagekit.io/projects052004/zudio/latest_product/c5.png?updatedAt=1739705882642",
  },
];

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
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 1 }}
      className="p-4 mx-4 sm:mx-12 lg:mx-28 flex flex-col"
    >
      <div className="text-center mb-8">
        <h2 className="text-sm text-gray-500 uppercase tracking-wider">
          Latest Product
        </h2>
        <h1 className="text-4xl font-medium">New Arrivals</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-1 gap-y-5">
        {productData.map((product, index) => (
          <motion.div
            key={index}
            className="relative w-full sm:w-[90%] md:w-[80%] lg:w-full h-[400px] transition-opacity duration-1000 mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-[80%] object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-white bg-opacity-75">
              <div className="text-left">
                <p className="text-sm leading-3">{product.category}</p>
                <p className="text-sm font-medium leading-7">{product.name}</p>
                <p className="text-sm">{product.price}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <motion.div
          className="text-center text-sm border-black bg-white hover:text-white hover:bg-black border p-2 cursor-pointer rounded-md transition-colors duration-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Show more products
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LatestProduct;
