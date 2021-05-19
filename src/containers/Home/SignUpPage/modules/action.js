import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILED } from "./constant";
import usersApi from "../../../../API/usersApi";
import Swal from "sweetalert2";

const actFetchSignUp = (user, history) => {
  //console.log(history);
  //console.log(user);
  return async (dispatch) => {
    dispatch(actSignUpRequest());
    try {
      const resData = await usersApi.postSignUp(user);

      dispatch(actSignUpSuccess(resData));

      Swal.fire(
        "Đã đăng kí thành công",
        "Cám ơn bạn đã sử dụng Tix.",
        "success"
      );
      history.push("/login");
    } catch (error) {
      dispatch(actSignUpFailed(error));
      console.log(error.response?.data);
    }
  };
};

const actSignUpRequest = () => {
  return {
    type: SIGN_UP_REQUEST,
  };
};

const actSignUpSuccess = (user) => {
  return {
    type: SIGN_UP_SUCCESS,
    user,
  };
};

const actSignUpFailed = (error) => {
  return {
    type: SIGN_UP_FAILED,
    error,
  };
};

export { actFetchSignUp };
