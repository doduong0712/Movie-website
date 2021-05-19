import React from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
import "reactjs-popup/dist/index.css";
import "reactjs-popup/dist/index";
const play = require("../../images/play.png");

export default function Carouselplay(props) {
  const { detailMovie } = props;
  return (
    <Popup
      className="btn-play"
      modal
      trigger={
        <button className="edit_play">
          <img src={play} alt="play" />
        </button>
      }
    >
      <iframe
        className="play_popup_trailer"
        title="trailer"
        src={detailMovie.trailer}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen="allowFullScreen"
      ></iframe>
    </Popup>
  );
}

Carouselplay.proptotypes = {
  detailMovie: PropTypes.object.isRequired,
};
