import React from "react";

const star1 = require("../images/star1.png");
const star2 = require("../images/star2.png");

const DetailMovieStyle = (WrappedComponent, sourcePropsName) => {
  return function (props) {
    //console.log(props);

    const renderStar = (danhGia) => {
      let starArr = [];
      //cứ 2 điểm cho 1 star
      while (parseInt(danhGia) >= 2) {
        starArr.push(star1);
        danhGia = danhGia - 2;
      }
      //còn dư 1,5 hoặc 0,5 .... loại trường hợp -0 thì ko thêm sao vào
      if (danhGia > 0 && Math.round(danhGia) > 1) {
        starArr.push(star1);
      } else {
        starArr.push(star2);
      }
      return starArr.map((item, index) => (
        <img src={item} key={index} alt="star" />
      ));
    };

    const renderAge = () => {
      let danhGia = props[sourcePropsName].danhGia;

      if (danhGia <= 7) {
        return ["listmovie__age green", "P"];
      }
      return ["listmovie__age", "C13"];
    };

    const stylePoint = (point) => {
      // point.toFixed(1)
      return point < 10 ? `${point}.0` : point;
    };

    const renderDate = (startIndex) => {
      let date = props[sourcePropsName].ngayKhoiChieu;
      if (date) {
        date = date
          .slice(startIndex, 10) // "08-14"
          .split("-") // startIndex=0 => ["2020","08","14"] , =5 => ["08","14"]
          .reverse() //"14-08"
          .join("/");
        return date;
      }
    };

    return (
      <WrappedComponent
        renderDate={renderDate}
        stylePoint={stylePoint}
        renderAge={renderAge()}
        renderStar={renderStar}
        {...props}
      />
    );
  };
};

export default DetailMovieStyle;
