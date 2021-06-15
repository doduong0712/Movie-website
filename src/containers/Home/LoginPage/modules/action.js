import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOG_OUT,
} from "./constant";
import usersApi from "../../../../API/usersApi";
import { USER_KEY } from "../../../../constants/config";
import Swal from "sweetalert2";

const actLogout = (e) => {
  return (dispatch) => {
    Swal.fire({
      title: "Bạn có chắc muốn đăng xuất?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đăng Xuât",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Đã Đăng Xuất", "Cám ơn bạn đã sử dụng Tix.", "success");
        dispatch({ type: LOG_OUT });
      } else {
        e.preventDefault();
      }
    });
  };
};

const findPrevPathname = (history = {}) => {
  if (history.location?.state?.from) {
    //console.log(history.location.state.from.pathname);
    return history.location.state.from.pathname;
  }
  return "/";
};

// resData = {
//   "taiKhoan": "dpnguyen",
//   "hoTen": "Nguyen",
//   "email": "dpnguyen@gmail.com",
//   "soDT": "0938564278",
//   "maNhom": "GP01",
//   "maLoaiNguoiDung": "QuanTri",
//   "accessToken": "eyJhbG...."
// }

const actFetchUserLogin = (user, history) => {
  //console.log(history);

  return async (dispatch) => {
    dispatch(actLoginRequest());
    try {
      const resData = await usersApi.postLogIn(user);
      dispatch(actLoginSuccess(resData));

      if (resData.maLoaiNguoiDung === "KhachHang") {
        localStorage.setItem(USER_KEY, JSON.stringify(resData));
        //console.log(history);

        history.push(`${findPrevPathname(history)}`);
      } else {
        alert("Không thể đăng nhập bằng tài khoản này");
      }
    } catch (error) {
      dispatch(actLoginFailed(error));
    }
  };
};

const actLoginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const actLoginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};

const actLoginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    error,
  };
};

/* const actLogout = () => {

} */

export { actFetchUserLogin, actLogout };
