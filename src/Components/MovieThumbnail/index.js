import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { prefixHttp } from "../../utils/movie";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "reactjs-popup/dist/index";

const play = require("../../images/play.png");

function MovieThumbnail(props) {
  const { movie } = props;
  const { renderDate } = props;

  const urlHinhAnh = useMemo(() => prefixHttp(movie.hinhAnh), [movie.hinhAnh]);

  return (
    <div className="movieThumbnail__img">
      <Link
        to={`/phim/${movie.maPhim}-${movie.biDanh}`}
        className="img__link"
        style={{
          background: `url(${urlHinhAnh}) no-repeat scroll center center/cover`,
        }}
      >
        {/* <img src={movie.hinhAnh} alt /> */}
      </Link>

      <div className="publich_Date">{renderDate}</div>
      {/* <span className={renderAge[0]}>{renderAge[1]}</span> */}
      {/* <div className="public__Point">
        <p>{movie.danhGia}</p>
        <div className="star ">{renderStar}</div>
      </div> */}
      <Popup
        className="btn_overlay"
        modal
        trigger={
          <button className="play_overlay">
            <img src={play} alt="play" />
          </button>
        }
      >
        <iframe
          className="play_popup_trailer_overlay"
          title="trailer"
          src={movie.trailer}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen="allowFullScreen"
        ></iframe>
      </Popup>
    </div>
  );
}

export default MovieThumbnail;
