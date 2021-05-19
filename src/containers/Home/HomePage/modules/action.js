import {
  LIST_MOVIE_REQUEST,
  LIST_MOVIE_SUCCESS,
  LIST_MOVIE_FAILED,
} from "./constant";
import moviesAPI from "../../../../API/moviesAPI";

const actFetchListMoive = () => {
  return async (dispatch) => {
    dispatch(actListMovieRequest());
    try {
      const resData = await moviesAPI.getDanhSachPhim();
      dispatch(actListMovieSuccess(resData));
    } catch (error) {
      dispatch(actListMovieFailed(error));
    }
  };
};

const actListMovieRequest = () => {
  return {
    type: LIST_MOVIE_REQUEST,
  };
};

const actListMovieSuccess = (data) => {
  return {
    type: LIST_MOVIE_SUCCESS,
    data,
  };
};
const actListMovieFailed = (error) => {
  return {
    type: LIST_MOVIE_FAILED,
    error,
  };
};

export { actFetchListMoive };
