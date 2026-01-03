// // AuthLayout.js
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Login from "./Login";
// import Signup from "./Signup";
// import ForgotPassword from "./ForgotPassword";

// const AuthLayout = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//       </Routes>
//     </div>
//   );
// };

// export default AuthLayout;
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-8">
      <div className="w-full max-w-lg">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Your Brand. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
