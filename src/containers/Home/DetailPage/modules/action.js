import {
  DETAIL_MOVIE_REQUEST,
  DETAIL_MOVIE_SUCCESS,
  DETAIL_MOVIE_FAILED,
  SELECT_DAY,
} from "./constant";

import theatersAPI from "../../../../API/theatersAPI";
import moviesAPI from "../../../../API/moviesAPI";
// import { callAPI } from "../../../../callAPI";
// import { requests } from "../../../../requests";

const actDetailMovieRequest = () => {
  return {
    type: DETAIL_MOVIE_REQUEST,
  };
};

const actDetailMovieSuccess = (data) => {
  return {
    type: DETAIL_MOVIE_SUCCESS,
    data,
  };
};

const actDetailMovieFailed = (error) => {
  return {
    type: DETAIL_MOVIE_FAILED,
    error,
  };
};
const actSelectDay = (selectDay) => {
  return {
    type: SELECT_DAY,
    selectDay,
  };
};

// const fetchThongTinPhim = async (dispatch, maPhim) => {
//   try {
//     const data = await callAPI(
//       requests(null, null, maPhim).layThongTinLichChieuPhim,
//       "GET"
//     );
//     const result = await callAPI(
//       requests(null, null, maPhim).layThongTinPhim,
//       "GET"
//     );
//     dispatch(actDetailMovieSuccess({ ...data.data, ...result.data }));
//   } catch (error) {
//     dispatch(actDetailMovieFailed(error));
//   }
// };

const actFetchDetailMovie = (maPhim) => {
  return async (dispatch) => {
    dispatch(actDetailMovieRequest());
    try {
      // const result = await
      const resLichChieu = await theatersAPI.getThongTinLichChieuPhim(maPhim);
      const resThongTin = await moviesAPI.getThongTinPHim(maPhim);
      dispatch(actDetailMovieSuccess({ ...resLichChieu, ...resThongTin }));
    } catch (error) {
      dispatch(actDetailMovieFailed(error));
    }
  };
};

export { actFetchDetailMovie, actSelectDay };
