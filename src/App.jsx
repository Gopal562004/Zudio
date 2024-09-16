import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./component/shared/Header";
import Footer from "./component/shared/Footer";
import Home from "./component/home/HomeMain"; // Import Home component
import Shop from "./component/shop/ShopMain"; // Import Shop component

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/shop" element={<Shop />} /> {/* Shop route */}
        {/* Add other routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
