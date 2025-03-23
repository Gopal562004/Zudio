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
    <div className="min-h-screen bg-white text-black px-6 py-16 mx-36">
      {/* Contact Info Section */}
      <div className="text-center space-y-2 m-24 mb-36">
        <h1 className="text-5xl font-semibold">Contact Us</h1>
        <p className="text-sm text-gray-500 cursor-pointer">
          <Link to="/" className="font-medium text-gray-800">Home</Link> / Contact Us
        </p>
      </div>
      <div className="text-center mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Address */}
          <div>
            <div className="w-20 h-20 bg-black text-white flex items-center justify-center rounded-full mx-auto text-2xl">
              📍
            </div>
            <h3 className="font-bold text-lg mt-4">Store Address</h3>
            <p className="text-gray-600">
              PO Box 16122 Collins Street West, Victoria 8007 Australia
            </p>
          </div>

          {/* Call Info */}
          <div>
            <div className="w-20 h-20 bg-black text-white flex items-center justify-center rounded-full mx-auto text-2xl">
              📞
            </div>
            <h3 className="font-bold text-lg mt-4">Call Us</h3>
            <p className="text-gray-600">+123 456 7890</p>
          </div>

          {/* Email */}
          <div>
            <div className="w-20 h-20 bg-black text-white flex items-center justify-center rounded-full mx-auto text-2xl">
              ✉️
            </div>
            <h3 className="font-bold text-lg mt-4">Email Us</h3>
            <p className="text-gray-600">zudioclothing.info@gmail.com</p>
          </div>

          {/* Working Hours */}
          <div>
            <div className="w-20 h-20 bg-black text-white flex items-center justify-center rounded-full mx-auto text-2xl">
              ⏰
            </div>
            <h3 className="font-bold text-lg mt-4">Working Hours</h3>
            <p className="text-gray-600">Mon - Fri: 9 AM - 6 PM</p>
          </div>
        </div>
        </div>
      {/* Contact Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mt-36">
        <div className="bg-white p-8">
          <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
          {responseMsg && <p className="mb-4 text-green-600">{responseMsg}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-b border-black p-2 bg-transparent outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-black p-2 bg-transparent outline-none"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border-b border-black p-2 bg-transparent outline-none"
              required
            />
            <textarea
              name="message"
              placeholder="Your message (optional)"
              value={formData.message}
              onChange={handleChange}
              className="w-full border-b border-black p-2 bg-transparent outline-none"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white px-6 py-3 font-semibold uppercase hover:bg-gray-900 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Map */}
        <div className="w-full h-96 mt-16">
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
