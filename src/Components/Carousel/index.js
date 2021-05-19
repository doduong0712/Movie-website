import React from "react";
import PropTypes from "prop-types";
import carouselData from "../../constants/carouselData";
import CarouselItem from "./CarouselItem";
import SliderSlick from "../SliderSlick";

function Carousel(props) {
  const { isHero } = props;

  const renderCarousel = () => {
    return carouselData.map((item, index) => {
      return <CarouselItem key={index} detailMovie={item} />;
    });
  };

  return (
    <section className={`carousel edit_carousel ${isHero ? "hero" : ""}`}>
      {!isHero && (
        <SliderSlick>
          {/* map here */}
          {renderCarousel()}
        </SliderSlick>
      )}
      {props.children}
    </section>
  );
}

Carousel.propsTypes = {
  isHero: PropTypes.bool,
};
Carousel.defaultProps = {
  isHero: false,
};

export default Carousel;
