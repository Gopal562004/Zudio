// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import { ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // import { AuthProvider } from "./component/auth/AuthContext"; // Import AuthProvider
// // import Header from "./component/shared/Header";
// // import Footer from "./component/shared/Footer";
// // import Home from "./component/home/HomeMain";
// // import Shop from "./component/shop/ShopMain";
// // import MainProductCard from "./component/shared/mainProductCard";
// // import Wishlist from "./component/user/Wishlist";
// // import Cart from "./component/user/Cart";
// // import Buy from "./component/user/Buy";
// // import AuthLayout from "./component/auth/AuthLayout";
// // import ProtectedRoute from "./component/auth/ProtectedRoute";
// // import ProfilePage from "./component/user/ProfilePage";

// // const App = () => {
// //   return (
// //     <AuthProvider>
// //       {" "}
// //       {/* Wrap the entire app with AuthProvider */}
// //       <Router>
// //         <ToastContainer /> {/* Move ToastContainer outside Routes */}
// //         <Routes>
// //           {/* Auth Routes (No Header/Footer) */}
// //           <Route path="/auth/*" element={<AuthLayout />} />

// //           {/* Main App Layout */}
// //           <Route
// //             path="/*"
// //             element={
// //               <>
// //                 <Header />
// //                 <Routes>
// //                   <Route path="/" element={<Home />} />
// //                   <Route path="/shop" element={<Shop />} />
// //                   <Route
// //                     path="/product/:productId"
// //                     element={<MainProductCard />}
// //                   />

// //                   {/* Protected Routes */}
// //                   <Route
// //                     path="/wishlist"
// //                     element={
// //                       <ProtectedRoute>
// //                         <Wishlist />
// //                       </ProtectedRoute>
// //                     }
// //                   />
// //                   <Route
// //                     path="/cart"
// //                     element={
// //                       <ProtectedRoute>
// //                         <Cart />
// //                       </ProtectedRoute>
// //                     }
// //                   />
// //                   <Route
// //                     path="/buy"
// //                     element={
// //                       <ProtectedRoute>
// //                         <Buy />
// //                       </ProtectedRoute>
// //                     }
// //                   />
// //                   <Route
// //                     path="/buy"
// //                     element={
// //                       <ProtectedRoute>
// //                         <ProfilePage />
// //                       </ProtectedRoute>
// //                     }
// //                   />
// //                 </Routes>
// //                 <Footer />
// //               </>
// //             }
// //           />
// //         </Routes>
// //       </Router>
// //     </AuthProvider>
// //   );
// // };

// // export default App;
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { AuthProvider, useAuth } from "./component/auth/AuthContext"; // Import useAuth hook
// import Header from "./component/shared/Header";
// import Footer from "./component/shared/Footer";
// import Home from "./component/home/HomeMain";
// import Shop from "./component/shop/ShopMain";
// import MainProductCard from "./component/shared/mainProductCard";
// import Wishlist from "./component/user/Wishlist";
// import Cart from "./component/user/Cart";
// import Buy from "./component/user/Buy";
// import AuthLayout from "./component/auth/AuthLayout";
// import ProfilePage from "./component/user/ProfileLayout";

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <ToastContainer />
//         <Routes>
//           {/* Auth Routes (No Header/Footer) */}
//           <Route path="/auth/*" element={<AuthLayout />} />

//           {/* Main App Layout */}
//           <Route
//             path="/*"
//             element={
//               <>
//                 <Header />
//                 <Routes>
//                   <Route path="/" element={<Home />} />
//                   <Route path="/shop" element={<Shop />} />
//                   <Route
//                     path="/product/:productId"
//                     element={<MainProductCard />}
//                   />

//                   {/* Protected Routes */}
//                   <Route
//                     path="/wishlist"
//                     element={<ProtectedRoute element={<Wishlist />} />}
//                   />
//                   <Route
//                     path="/cart"
//                     element={<ProtectedRoute element={<Cart />} />}
//                   />
//                   <Route
//                     path="/buy"
//                     element={<ProtectedRoute element={<Buy />} />}
//                   />
//                   <Route
//                     path="/profile"
//                     element={<ProtectedRoute element={<ProfilePage />} />}
//                   />
//                 </Routes>
//                 <Footer />
//               </>
//             }
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// // ProtectedRoute component with AuthContext check
// const ProtectedRoute = ({ element }) => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/auth/login" replace />;
//   }

//   return element;
// };

// export default App;
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

                  {/* Profile Section with Sidebar */}
                  <Route
                    path="/profile/*"
                    element={<ProtectedRoute element={<ProfileLayout />} />}
                  >
                    <Route index element={<Profile />} />
                    {/* <Route path="myorders" element={<MyOrders />} /> */}
                    <Route path="wishlist" element={<Wishlist />} />
                    {/* <Route
                      path="recently-viewed"
                      element={<RecentlyViewed />}
                    />
                    <Route path="store-credits" element={<StoreCredits />} /> */}
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

// ProtectedRoute component with AuthContext check
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return element;
};

export default App;
