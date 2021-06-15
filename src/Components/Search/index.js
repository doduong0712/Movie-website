import React from "react";
import { connect } from "react-redux";

/**
 * đưa tất cả các cụm rạp của tất cả các hệ thống thành 1 mảng để xử lý
 */
const getAllListCumRap = (heThongRapChieu = []) => {
  if (heThongRapChieu && heThongRapChieu.length > 0) {
    return heThongRapChieu.reduce(
      (acc, item) => acc.concat(item.cumRapChieu),
      []
    );
  }
  return [];
};

const initialState = {
  // state thay đổi khi handleChange
};

function Search() {
  return <div></div>;
}

export default connect(Search);
