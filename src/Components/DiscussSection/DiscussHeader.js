import React from "react";
import PropTypes from "prop-types";

const star2 = require("../../images/star2.png");
const star1 = require("../../images/star1.png");

const covertData = (jsDate = "") => {
  return new Date(jsDate).toLocaleString("en-GB", {
    //timeZone:"UTC"
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const renderStar = (danhGia) => {
  let starArr = [];

  while (parseInt(danhGia) > 2) {
    starArr.push(star1);
    danhGia = danhGia - 2;
  }
  //còn dư 0 hoặc 1,5 hoặc 0,5 ..v.v, loại trường hợp -0 thì ko thêm sao vào
  if (danhGia > 0 && Math.round(danhGia) > 1) {
    starArr.push(star1);
  } else {
    starArr.push(star2);
  }

  return starArr.map((item, idx) => <img src={item} key={idx} alt="star" />);
};

function DiscussHeader(props) {
  const { hasInfo, src, post } = props;

  return (
    <div className="row discuss__item--header">
      <div className="text-center avatar">
        <img className="avatar-img" alt="avatar" src={src} />
      </div>
      <div className="col pl-1 middle">
        {hasInfo ? (
          <>
            <p className="thinking font-weight-bold">{post.username}</p>
            <p className="time__post">{covertData(post.createdAt)}</p>
          </>
        ) : (
          <p className="thinking">Bạn nghĩ gì về phim này?</p>
        )}
      </div>
      <div className="text-right start__group">
        {/* {renderStar} */}
        {hasInfo ? (
          <div className="start__group--comment stack">
            <span className="danhGia">{post.point}</span>
            <div className="star">{renderStar(post.point)}</div>
          </div>
        ) : (
          <div className="start__group--default">
            <i className="fa fa-star icon-star" />
            <i className="fa fa-star icon-star" />
            <i className="fa fa-star icon-star" />
            <i className="fa fa-star icon-star" />
            <i className="fa fa-star icon-star" />
          </div>
        )}
      </div>
    </div>
  );
}

DiscussHeader.propTypes = {
  src: PropTypes.string.isRequired,
  hasInfo: PropTypes.bool.isRequired,
};
DiscussHeader.defaultProps = {
  hasInfo: true,
};

export default DiscussHeader;
