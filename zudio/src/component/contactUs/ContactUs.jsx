import React, { useState } from "react";
import { sendContactForm } from "../../mongo/authServices";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const contactItems = [
  {
    icon: MapPin,
    title: "Flagship Studio",
    text: "123 Fashion Avenue, Studio District, India",
  },
  {
    icon: Phone,
    title: "Customer Care",
    text: "+91 00000 00000",
  },
  {
    icon: Mail,
    title: "Email Support",
    text: "support@zudio-demo.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    text: "Mon - Sat: 10 AM - 8 PM",
  },
];

const quickTopics = [
  "Order Status",
  "Returns & Exchange",
  "Size & Fit",
  "Bulk / Styling",
];

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Standard orders ship within 24 hours and arrive in 2–5 business days across India. Free shipping applies on orders over ₹999.",
  },
  {
    q: "What is your return & exchange policy?",
    a: "Unworn items with original tags can be returned or exchanged within 14 days of delivery.",
  },
  {
    q: "How do I track my order?",
    a: "Visit your Profile page after signing in to view live order updates and tracking details.",
  },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");
    setIsError(false);

    try {
      const response = await sendContactForm(formData);
      setResponseMsg(
        response?.message || "Thank you! Our team will respond within 24 hours."
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setIsError(true);
      setResponseMsg(
        typeof error === "string"
          ? error
          : error?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Editorial Header */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <nav className="flex items-center space-x-1.5 text-xs uppercase tracking-wider text-neutral-500 mb-3">
            <Link to="/" className="hover:text-black transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-black font-medium">Contact Us</span>
          </nav>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Customer Concierge
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mt-1">
            Get in Touch
          </h1>
          <p className="text-sm text-neutral-600 mt-2 max-w-xl">
            Questions about sizing, orders, or styling? Reach out to our team
            and we’ll get back to you promptly.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-12">
        {/* 4 Sharp Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="border border-neutral-200 hover:border-black p-5 bg-white transition-colors rounded-none flex flex-col justify-between"
              >
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-none mb-4">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form + Concierge / FAQ Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 border border-neutral-200 p-6 sm:p-8 bg-white rounded-none">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Send a Message
            </h2>
            <p className="text-xs text-neutral-500 mt-1 mb-5">
              Choose a topic or write your own inquiry below.
            </p>

            {/* Quick Topic Chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {quickTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, subject: topic }))
                  }
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider border rounded-none transition-colors cursor-pointer ${
                    formData.subject === topic
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-black"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {responseMsg && (
              <div
                className={`mb-5 p-3 border text-xs sm:text-sm flex items-center gap-2 rounded-none ${
                  isError
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-emerald-50 border-emerald-200 text-emerald-800"
                }`}
              >
                {isError ? (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                )}
                <span>{responseMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-neutral-600 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm rounded-none bg-white outline-none focus:border-black transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-neutral-600 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm rounded-none bg-white outline-none focus:border-black transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-medium text-neutral-600 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm rounded-none bg-white outline-none focus:border-black transition"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-medium text-neutral-600 mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm rounded-none bg-white outline-none focus:border-black min-h-[120px] transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white px-6 py-3.5 text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition rounded-none inline-flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>

          {/* Right: Editorial Studio Card + Interactive FAQs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative h-56 overflow-hidden border border-neutral-200 rounded-none">
              <img
                src="/images/col-sale.jpg"
                alt="Zudio Flagship Studio"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-300">
                  Zudio Studio
                </span>
                <p className="text-lg font-semibold mt-0.5">
                  Need instant answers?
                </p>
              </div>
            </div>

            <div className="border border-neutral-200 bg-white rounded-none divide-y divide-neutral-200">
              <div className="px-5 py-3.5 bg-neutral-50">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900">
                  Frequently Asked Questions
                </h3>
              </div>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="px-5 py-3.5">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between text-left gap-3 cursor-pointer"
                    >
                      <span className="text-sm font-medium text-neutral-900">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 flex-shrink-0 text-neutral-500 transition-transform ${
                          isOpen ? "rotate-180 text-black" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
