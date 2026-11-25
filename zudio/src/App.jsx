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
import Checkout from "./component/user/Checkout";
import AuthLayout from "./component/auth/AuthLayout";
import ProfileLayout from "./component/user/ProfileLayout";
import Profile from "./component/user/Profile";
import MyOrders from "./component/user/MyOrders";
import Settings from "./component/user/Settings";
import ContactUs from "./component/contactUs/ContactUs";
import Blog from "./component/blog/Blog";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* ✅ Analytics should be here */}
        <Analytics />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          toastClassName="!rounded-none !bg-white !text-neutral-900 !border !border-neutral-900 !shadow-lg !text-xs !font-medium !tracking-wide"
          progressClassName="!bg-black"
        />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "0px",
              background: "#111111",
              color: "#ffffff",
              border: "1px solid #262626",
              fontSize: "12px",
              padding: "10px 14px",
            },
          }}
        />

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
                  <Route
                    path="/checkout"
                    element={<ProtectedRoute element={<Checkout />} />}
                  />

                  {/* Profile Section */}
                  <Route
                    path="/profile/*"
                    element={<ProtectedRoute element={<ProfileLayout />} />}
                  >
                    <Route index element={<Profile />} />
                    <Route path="myorders" element={<MyOrders />} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="setting" element={<Settings />} />
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
