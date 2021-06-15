import {
  BOOKING_MOVIE_PAGE_REQUEST,
  BOOKING_MOVIE_PAGE_SUCCESS,
  BOOKING_MOVIE_PAGE_FAILED,
} from "./constant";

import bookingApi from "../../../../API/bookingAPI";

const actBookingMoviePageRequest = () => {
  return {
    type: BOOKING_MOVIE_PAGE_REQUEST,
  };
};

const actBookingMoviePageSuccess = (data) => {
  return {
    type: BOOKING_MOVIE_PAGE_SUCCESS,
    data,
  };
};

const actBookingMoviePageFailed = (error) => {
  return {
    type: BOOKING_MOVIE_PAGE_FAILED,
    error,
  };
};

const actFetchBookingMoviePage = (maLichChieu) => {
  return async (dispatch) => {
    dispatch(actBookingMoviePageRequest());
    try {
      const resData = await bookingApi.getDanhSachPhongVe(maLichChieu);
      dispatch(actBookingMoviePageSuccess(resData));
    } catch (error) {
      dispatch(actBookingMoviePageFailed(error));
    }
  };
};

export { actFetchBookingMoviePage };
