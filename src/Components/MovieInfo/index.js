import React, { memo } from "react";
import DetailMovieStyle from "../../HOC/DetailMovieStyle";

function MovieInfo(props) {
  const { movie, renderDate } = props;

  return (
    <section className="movie__info">
      <div className="myContainer row">
        <div className="col-12 col-md-6">
          {/* ngày công chiếu */}
          <div className="rowInfo">
            <div className="titleInfor">Ngày công chiếu</div>
            <div className="contentInfo">{renderDate(0)}</div>
          </div>
          {/*đạo diễn  */}
          <div className="rowInfo">
            <div className="titleInfor">Đạo diễn</div>
            <div className="contentInfo">Steven Spielberg ,Peter Jackson</div>
          </div>
          {/* Diễn viên */}
          <div className="rowInfo">
            <div className="titleInfor">Diễn viên</div>
            <div className="contentInfo">Brad Pitt,Angelina Jolie</div>
          </div>
          {/* Thể loại */}
          <div className="rowInfo">
            <div className="titleInfor">Thể loại</div>
            <div className="contentInfo">action movie,horror</div>
          </div>
          {/* Định dạng */}
          <div className="rowInfo">
            <div className="titleInfor">Định dạng</div>
            <div className="contentInfo">2D/Digital</div>
          </div>
          {/* Quốc gia */}
          <div className="rowInfo">
            <div className="titleInfor">Ngôn Ngữ</div>
            <div className="contentInfo">Tiếng Việt,Vietsub</div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="rowInfo">Nội dung</div>
          <p className="description contentInfo">{movie.moTa}</p>
        </div>
      </div>
    </section>
  );
}

export default memo(DetailMovieStyle(MovieInfo, "movie"));
