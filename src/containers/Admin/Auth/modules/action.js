import {
  AUTH_ADMIN_REQUEST,
  AUTH_ADMIN_SUCCESS,
  AUTH_ADMIN_FAILED,
} from "./constant";

import { USER_KEY } from "../../../../constants/config";
import usersApi from "../../../../API/usersApi";

const actAuthRequest = () => {
  return {
    type: AUTH_ADMIN_REQUEST,
  };
};

const actAuthSuccess = (data) => {
  return {
    type: AUTH_ADMIN_SUCCESS,
    data,
  };
};

const actAuthFailed = (error) => {
  return {
    type: AUTH_ADMIN_FAILED,
    error,
  };
};

const actFetchAdminLogin = (user, history) => {
  return async (dispatch) => {
    //Promise
    dispatch(actAuthRequest());
    try {
      const resData = await usersApi.postLogIn(user);
      // console.log(resData);
      dispatch(actAuthSuccess(resData));

      //dua xuong localStorge
      if (resData.maLoaiNguoiDung === "QuanTri") {
        localStorage.setItem(USER_KEY, JSON.stringify(resData));

        //sau do, thanh cong thi chuyen huong sang trang dashboard
        history.push("/dashboard");
      }
    } catch (error) {
      dispatch(actAuthFailed(error));
      // console.log(error.response?.data);
    }
  };
};

export { actFetchAdminLogin };
