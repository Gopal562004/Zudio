import React from "react";
import HeroSection from "./HeroSection";
import PopularCollection from "./PopularCollection";
import TopProduct from "./TopProduct";
import LatestProduct from "./LatestProduct";
import TopBrand from "./TopBrand";
import LatestPost from "./LatestPost";

const HomeMain = () => {
  return (
    <div>
      <HeroSection />
      <PopularCollection />
      <TopProduct />
      <LatestProduct />
      <TopBrand />
      <LatestPost />
    </div>
  );
};

export default HomeMain;
