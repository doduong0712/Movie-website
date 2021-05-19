import React, { useMemo, memo } from "react";
import { prefixHttp } from "../../utils/movie";
import PropTypes from "prop-types";

function LogoHeThong(props) {
  const { heThong, hasLabel } = props;
  const urlHinhAnh = useMemo(() => prefixHttp(heThong.logo), [heThong.logo]);

  return (
    <div className="logo__detail">
      <img
        className="theaterList__img"
        src={urlHinhAnh}
        alt={heThong.tenHeThongRap}
      />
      {hasLabel && (
        <>
          <span className="tenHeThong">{heThong.tenHeThongRap}</span>
          <span className="arrow"></span>
        </>
      )}
    </div>
  );
}

LogoHeThong.propTypes = {
  hasLabel: PropTypes.bool.isRequired,
  heThong: PropTypes.object.isRequired,
};

LogoHeThong.defaultProps = {
  hasLabel: false,
  heThong: {},
};

export default memo(LogoHeThong);
