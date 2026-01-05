import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./component/auth/AuthContext";
import Header from "./component/shared/Header";
import Footer from "./component/shared/Footer";
import Home from "./component/home/HomeMain";
import Shop from "./component/shop/ShopMain";
import MainProductCard from "./component/shared/mainProductCard";
import Wishlist from "./component/user/Wishlist";
import Cart from "./component/user/Cart";
import Buy from "./component/user/Buy";
import AuthLayout from "./component/auth/AuthLayout";
import ProfileLayout from "./component/user/ProfileLayout";
import Profile from "./component/user/Profile";
import ContactUs from "./component/contactUs/ContactUs";
import Blog from "./component/blog/Blog";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* ✅ Analytics should be here */}
        <Analytics />

        <ToastContainer />
        <Toaster position="top-right" />

        <Routes>
          {/* Auth Routes */}
          <Route path="/auth/*" element={<AuthLayout />} />

          {/* Main App Layout */}
          <Route
            path="/*"
            element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route
                    path="/product/:productId"
                    element={<MainProductCard />}
                  />
                  <Route path="/products" element={<Shop />} />

                  {/* Protected Routes */}
                  <Route
                    path="/wishlist"
                    element={<ProtectedRoute element={<Wishlist />} />}
                  />
                  <Route
                    path="/cart"
                    element={<ProtectedRoute element={<Cart />} />}
                  />
                  <Route
                    path="/buy"
                    element={<ProtectedRoute element={<Buy />} />}
                  />

                  {/* Profile Section */}
                  <Route
                    path="/profile/*"
                    element={<ProtectedRoute element={<ProfileLayout />} />}
                  >
                    <Route index element={<Profile />} />
                    <Route path="wishlist" element={<Wishlist />} />
                  </Route>
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// ProtectedRoute
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return element;
};

export default App;
