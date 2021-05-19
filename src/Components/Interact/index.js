import React from "react";
import PropTypes from "prop-types";

const imglike = require("../../images/like.png");
const imgcm = require("../../images/comment.png");

function Interact(props) {
  const { like, comment, hasLabel } = props;

  return (
    <div className="interact__wapper">
      <div className="interact__items">
        <span className="interact__items--group">
          <img src={imglike} alt="khuyenmai" />
          <span className="like__num">{like}</span>
          {hasLabel && <span className="label">Thích</span>}
        </span>
      </div>

      {comment !== "undefined" && (
        <div className="interact__items">
          <span className="interact__items--group">
            <img src={imgcm} alt="khuyenmai" />
            <span className="comment__num">{comment}</span>
            {hasLabel && <span className="label">Bình luận</span>}
          </span>
        </div>
      )}
    </div>
  );
}

Interact.propTypes = {
  like: PropTypes.number,
  comment: PropTypes.number,
  hasLabel: PropTypes.bool,
};

Interact.defaultProps = {
  hasLabel: false,
};

export default Interact;
