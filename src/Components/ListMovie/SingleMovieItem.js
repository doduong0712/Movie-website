import React from "react";
import DetailMovieStyle from "../../HOC/DetailMovieStyle";
import { Link } from "react-router-dom";
import MovieThumbnail from "../MovieThumbnail";

function SingleMovieItem(props) {
  const { movie } = props;

  const { renderAge, renderDate, renderStar, stylePoint } = props;

  return (
    <div className="movieThumbnail col-6 col-sm-4 col-md-3">
      <MovieThumbnail movie={movie} renderDate={renderDate()} />
      <div className="listmovie_info mt-2">
        <span className={renderAge[0]}>{renderAge[1]}</span>
        <span>{movie.tenPhim}</span>
        <div className="play_overlay btnContainer">
          <Link
            className="btnBuyTicket"
            to={`/phim/${movie.maPhim}-${movie.biDanh}`}
          >
            MUA VÉ
          </Link>
        </div>
      </div>
      <div className="showing__point">
        {/*  <div className="publich_Date">{renderDate(5)}</div> */}
        <span className={renderAge[0]}>{renderAge[1]}</span>
        <div className="public__Point">
          <p>{stylePoint(movie.danhGia)}</p>
          <div className="star ">{renderStar(movie.danhGia)}</div>
        </div>
      </div>
    </div>
  );
}
export default DetailMovieStyle(SingleMovieItem, "movie");
