
import React, { useState } from "react";
import { sendContactForm } from "../../mongo/authServices";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const response = await sendContactForm(formData);
      setResponseMsg(response.message || "Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setResponseMsg(error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  const contactItems = [
    {
      icon: "📍",
      title: "Store Address",
      text: "Virar, Maharashtra 401303, India",
    },
    {
      icon: "📞",
      title: "Call Us",
      text: "+91 8237742040",
    },
    {
      icon: "✉️",
      title: "Email Us",
      text: "zudioclothing.info@gmail.com",
    },
    {
      icon: "⏰",
      title: "Working Hours",
      text: "Mon - Fri: 9 AM - 6 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-6 py-8 md:py-12 lg:px-8">
      {/* Animated Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center mb-8"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
          Contact Us
        </h1>
        <nav className="flex items-center justify-center space-x-1 text-xs sm:text-sm">
          <Link to="/" className="text-gray-500 hover:text-black transition">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <span className="text-black font-sm">Contact Us</span>
        </nav>
      </motion.div>

      {/* Animated Contact Details */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center mb-12"
      >
        {contactItems.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            whileHover={{
              y: -5,
              transition: { type: "spring", stiffness: 300, damping: 15 },
            }}
            className="p-3 sm:p-4"
          >
            <motion.div
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-black text-white flex items-center justify-center rounded-full mx-auto text-xl sm:text-2xl"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {item.icon}
            </motion.div>
            <h3 className="font-bold text-sm sm:text-base mt-3">
              {item.title}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">{item.text}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Contact Form & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
        {/* Form Section with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-4 sm:p-6 shadow rounded-lg"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left">
            Get In Touch
          </h2>

          {responseMsg && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`mb-3 text-sm text-center ${
                responseMsg.includes("success")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {responseMsg}
            </motion.p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {["name", "email", "subject"].map((field, index) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={`Your ${
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }`}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2.5 text-sm rounded bg-transparent outline-none focus:ring-1 focus:ring-black transition"
                  required
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <textarea
                name="message"
                placeholder="Your message (optional)"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 text-sm rounded bg-transparent outline-none focus:ring-1 focus:ring-black min-h-[100px] transition"
              ></textarea>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-black text-white px-4 py-3 text-sm font-medium hover:bg-gray-900 transition rounded relative overflow-hidden"
              >
                {loading ? (
                  <motion.div
                    className="flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Sending...
                  </motion.div>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Map Section with Animation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full h-full"
          >
            <iframe
              className="w-full h-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.941146549551!2d72.80820531538556!3d19.25303308699584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0e57647569d%3A0xc0b5f3f3c6f5b1fa!2sVirar%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1647854325000!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              title="Google Map - Virar"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
