import React from "react";
import BannerBackground from "../../assets/home-banner-background.png";
import BannerImage from "../../assets/snapedit_1708460140364-removebg-preview.png";
import './all.css'

import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading" >
          Empower,
</h1>
            <h1 className="primary-heading">  Your Shelf Optimization
          </h1>
          <p className="primary-text">
          Transform your retail strategy with our ShelfOptimize tool. Analyze product placement, optimize inventory, and enhance consumer experience.
          </p>
          <Link to ='/login'>
          <button className="secondary-button">
          Let's Optimize<FiArrowRight />{" "}
            </button>
            </Link>
        </div>
        <div className="home-image-section">
  <img src={BannerImage} alt="" style={{ width: '70%', top:'0px' }} />
</div>

      </div>
    </div>
  );
};

export default Home;
