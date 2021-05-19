import React, { useMemo } from "react";
import { prefixHttp } from "../../utils/movie";
import PropTypes from "prop-types";
import Carouselplay from "./Carouselplay";

function CarouselItem(props) {
  const { detailMovie, isHero } = props;
  const urlHinhAnh = useMemo(() => prefixHttp(detailMovie.hinhAnh), [
    detailMovie.hinhAnh,
  ]);

  if (!detailMovie) return null;
  return (
    <div className="carousel__item">
      <div className="carousel__img">
        <img className="img_bg" src={urlHinhAnh} alt={detailMovie.tenPhim} />
      </div>
      {/* extra content on detail page */}
      {isHero && <div className="blur__overlay" />}
      {/* end extra content on detail page */}
      <div className="play_overlay">
        <Carouselplay detailMovie={detailMovie} />
      </div>
    </div>
  );
}

CarouselItem.proptotypes = {
  detailMovie: PropTypes.object.isRequired,
  isHero: PropTypes.bool,
};
CarouselItem.defaultProps = {
  isHero: false,
};

export default CarouselItem;
