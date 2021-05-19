import React from "react";
import withMainTitleDetail from "./HOC/withMainTitleDetail";

function MainTitleMobile(props) {
  return (
    <>
      <h6 className="title">
        <span className={props.renderAge[0]}>{props.renderAge[1]}</span>
        {props.detailMovie.tenPhim}
      </h6>
    </>
  );
}

export default withMainTitleDetail(MainTitleMobile);
