import React from "react";
import PropTypes from "prop-types";
import theaterImagesData from "../../constants/theaterImagesData";
import LabelContent from "../LabelContent";

const getLogo = (maHeThong) => {
  //console.log(maHeThong);

  let foundCumRap = theaterImagesData.find((item) => {
    return item.maHeThongRap === maHeThong;
  });
  return foundCumRap.logo;
};

function CinemaDetailItem(props) {
  const { system, cinema } = props;
  //console.log(cinema);

  return (
    <div className="cinema__details--item">
      <img
        className="theaterList__img"
        src={getLogo(system.maHeThongRap)}
        alt={system.tenHeThongRap}
      />
      <LabelContent cinema={cinema} />
    </div>
  );
}

CinemaDetailItem.propTypes = {
  system: PropTypes.object,
  cinema: PropTypes.object,
};
CinemaDetailItem.defaultProps = {
  system: {},
  cinema: {},
};

export default CinemaDetailItem;
