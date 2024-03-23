import React from "react";
import Carousel from "react-bootstrap/Carousel";
import image1 from "../../assets/images/header1.jpg";
import image2 from "../../assets/images/header-main2.jpg";
import image3 from "../../assets/images/header2.jpg";

const images = [image1, image2,image3];

const MainHeader = () => {
  return (
    <Carousel interval={2000} controls={false} indicators={false}>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <header className="header-banner" style={{ backgroundImage: `url(${image})` }}>
            <div className="overlay"></div>
            <div className="animated-texts overlay-content">
              <h1>
                Welcome to <span> QT Hotel</span>
              </h1>
              <h4>Experience the Best Hospitality in Town</h4>
            </div>
          </header>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MainHeader;