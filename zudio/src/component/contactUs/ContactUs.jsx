import React, { useState } from "react";
import { sendContactForm } from "../../mongo/authServices";
import { Link } from "react-router-dom";

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

  return (
    <div className="min-h-screen bg-white text-black px-6 py-12 md:py-16 lg:px-24">
      {/* Contact Info Section */}
      <div className="text-center space-y-3 mb-10">
        <h1 className="text-4xl md:text-5xl font-semibold">Contact Us</h1>
        <p className="text-sm text-gray-500">
          <Link to="/" className="font-medium text-gray-800">
            Home
          </Link>{" "}
          / Contact Us
        </p>
      </div>

      {/* Contact Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16">
        {[
          {
            icon: "📍",
            title: "Store Address",
            text: "PO Box 16122, Collins Street West, Victoria 8007, Australia",
          },
          { icon: "📞", title: "Call Us", text: "+123 456 7890" },
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
        ].map((item, index) => (
          <div key={index}>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-black text-white flex items-center justify-center rounded-full mx-auto text-2xl">
              {item.icon}
            </div>
            <h3 className="font-bold text-lg mt-4">{item.title}</h3>
            <p className="text-gray-600">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Contact Form & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Form Section */}
        <div className="bg-white p-6 sm:p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center lg:text-left">
            Get In Touch
          </h2>
          {responseMsg && (
            <p className="mb-4 text-green-600 text-center">{responseMsg}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email", "subject"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={`Your ${
                  field.charAt(0).toUpperCase() + field.slice(1)
                }`}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md bg-transparent outline-none focus:ring-2 focus:ring-black"
                required
              />
            ))}
            <textarea
              name="message"
              placeholder="Your message (optional)"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md bg-transparent outline-none focus:ring-2 focus:ring-black min-h-[120px]"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white px-6 py-3 font-semibold uppercase hover:bg-gray-900 transition rounded-md"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="w-full h-72 sm:h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093707!2d144.9537353153157!3d-37.81627997975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727b7eb16c69b1!2sCollins%20St%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sin!4v1633067603621!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
