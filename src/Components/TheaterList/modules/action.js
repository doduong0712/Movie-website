import {
  LIST_HE_THONG_RAP_REQUEST,
  LIST_HE_THONG_RAP_SUCCESS,
  LIST_HE_THONG_RAP_FAILED,
  LAY_THONG_TIN_LICH_CHIEU_REQUEST,
  LAY_THONG_TIN_LICH_CHIEU_SUCCESS,
  LAY_THONG_TIN_LICH_CHIEU_FAILED,
} from "./constant";
import "../../../API/theatersAPI";
import theatersAPI from "../../../API/theatersAPI";

const actFetchListHeThongRap = () => {
  return async (dispatch) => {
    dispatch(actListHeThongRapRequest());

    try {
      const resData = await theatersAPI.getThongTinHeThongRap();
      dispatch(actListHeThongRapSucces(resData));
      //console.log(resData);
    } catch (error) {
      dispatch(actListHeThongRapFailed(error));
    }
  };
};

const actFetchThongTinLichChieu = () => {
  return async (dispatch) => {
    dispatch(actThongTinLichChieuRequest());
    try {
      const resData = await theatersAPI.getThongTinLichChieuHeThongRap();
      dispatch(actThongTinLichChieuSucces(resData));
      //console.log(resData);
    } catch (error) {
      dispatch(actThongTinLichChieuFailed(error));
    }
  };
};

const actListHeThongRapRequest = () => {
  return {
    type: LIST_HE_THONG_RAP_REQUEST,
  };
};

const actListHeThongRapSucces = (data) => {
  return {
    type: LIST_HE_THONG_RAP_SUCCESS,
    data,
  };
};

const actListHeThongRapFailed = (error) => {
  return {
    type: LIST_HE_THONG_RAP_FAILED,
    error,
  };
};

const actThongTinLichChieuRequest = () => {
  return {
    type: LAY_THONG_TIN_LICH_CHIEU_REQUEST,
  };
};

const actThongTinLichChieuSucces = (data) => {
  return {
    type: LAY_THONG_TIN_LICH_CHIEU_SUCCESS,
    data,
  };
};

const actThongTinLichChieuFailed = (error) => {
  return {
    type: LAY_THONG_TIN_LICH_CHIEU_FAILED,
    error,
  };
};

export { actFetchListHeThongRap, actFetchThongTinLichChieu };
