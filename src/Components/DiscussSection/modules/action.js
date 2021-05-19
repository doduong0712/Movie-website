import newsAPI from "../../../API/newsAPI";
import {
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILED,
} from "./constant";

const actGetReviews = () => {
  return async (dispatch) => {
    dispatch(request());
    try {
      const resData = await newsAPI.getDiscussPost();

      dispatch(success(resData.data));
    } catch (err) {
      dispatch(failed(err));
      console.log(err);
    }
  };
  function request() {
    return {
      type: GET_REVIEWS_REQUEST,
    };
  }
  function success(data) {
    return {
      type: GET_REVIEWS_SUCCESS,
      data,
    };
  }
  function failed(err) {
    return {
      type: GET_REVIEWS_FAILED,
      err,
    };
  }
};

export { actGetReviews };
