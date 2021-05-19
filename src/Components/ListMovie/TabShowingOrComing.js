import React, { useMemo } from "react";
import SliderSlick from "../SliderSlick";
import PanelContainer from "./PanelContainer";

const chunkArray = (myArray = [], chunkySize) => {
  let result = [];

  while (myArray.length) {
    result.push(myArray.splice(0, chunkySize));
  }
  return result;
};

const customSlick = {
  dots: false,
  autoplay: false,
};

function TabShowingOrComing(props) {
  const { movie } = props;

  const chunkedArrs = useMemo(() => chunkArray(movie, 8), [movie]);

  return (
    <SliderSlick customSlick={customSlick}>
      {chunkedArrs.map((arr, index) => (
        <PanelContainer key={index} movie={arr} />
      ))}
    </SliderSlick>
  );
}

export default TabShowingOrComing;
