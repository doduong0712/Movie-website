import React from "react";
import Interact from "../../Components/Interact";

//const imglike = require("../../images/like.png");
//const imgcm = require("../../images/comment.png");

const isBigNews = (indexShow, index) => {
  //console.log(indexShow);
  //console.log(index);

  const bigIdx = [
    8 * indexShow + 5,
    8 * indexShow + 6,
    8 * indexShow + 7,
    8 * indexShow + 8,
  ];

  //index từ 0 nên phải +1
  const isBigIdx = bigIdx.some((idx) => idx === index + 1);

  //console.log(isBigIdx);
  if (!isBigIdx) {
    return true;
  } else {
    return false;
  }
};

function NewsItems(props) {
  const { post, index, indexShow } = props;
  const { hinhAnh, link, tieuDe, noiDung, like, comment } = post;

  return (
    <div className="newsblock_items">
      <div className="img__items">
        <span>
          <a href={link}>
            <img
              src={hinhAnh}
              alt="khuyenmai"
              style={
                !isBigNews(indexShow, index)
                  ? { height: 50, objectFit: "cover" }
                  : {}
              }
            />
          </a>
        </span>
      </div>
      <div className="info__items">
        <h3 className="info__items--title">
          <span>
            <a href={link}>{tieuDe}</a>
          </span>
        </h3>
        {isBigNews(indexShow, index) && (
          <p className="info__items--detail">{noiDung}</p>
        )}
      </div>
      {/* <div className="interact__wapper">
        <div className="interact__items">
          <span>
            <img src={imglike} alt="khuyenmai" />
            <span className="like__num">{like}</span>
          </span>
        </div>
        <div className="interact__items">
          <span>
            <img src={imgcm} alt="khuyenmai" />
            <span className="comment__num">{comment}</span>
          </span>
        </div> 
      </div> */}
      {isBigNews(indexShow, index) && (
        <Interact like={like} comment={comment} />
      )}
    </div>
  );
}

export default NewsItems;
