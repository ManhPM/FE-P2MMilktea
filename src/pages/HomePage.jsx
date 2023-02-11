import React from "react";

import Slider from "../components/Slider/MainSlider";
import BannerList from "../components/Banner/BannerList";
import Advertise from "../components/Advertise/Advertise";
import HomePageFoods from "../components/HomePageFoods/HomePageFoods";
import MenuList from "../components/Menu/MenuList";
import HealthyAd from "../components/Healthy/HealthyAd";
import SubSlider from "../components/SubSliderAndAdver/SubSlider";
import Footer from "../components/UI/Footer";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <BannerList />
      <Advertise />
      <HomePageFoods />
      <MenuList />
      <HealthyAd />
      <SubSlider />
      <Footer/>
    </div>
  );
};

export default HomePage;
