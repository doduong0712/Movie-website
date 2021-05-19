import React from "react";
import PropTypes from "prop-types";

function DiscussHeader(props) {
  const { hasInfo, src } = props;

  return (
    <div className="row discuss__item--header">
      <div className="text-center avatar">
        <img className="avatar-img" alt="avatar" src={src} />
      </div>
      <div className="col pl-1 middle">
        {hasInfo ? " " : <p className="thinking">Bạn nghĩ gì về phim này?</p>}
      </div>
      <div className="text-right start__group">
        {/* {renderStar} */}
        {hasInfo ? (
          " "
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
