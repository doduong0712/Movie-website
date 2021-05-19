import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOG_OUT,
} from "./constant";
import { USER_KEY } from "../../../../constants/config";

const user = localStorage.getItem(USER_KEY);
const initialState = {
  loading: false,
  user: null,
  error: null,
  isLoggedIn: JSON.parse(user)?.maLoaiNguoiDung === "KhachHang" ? true : false,
};

const userLoginReducer = (state = initialState, action) => {
  //console.log(initialState);

  switch (action.type) {
    case LOGIN_REQUEST:
      state.loading = true;
      state.user = null;
      state.error = null;
      state.isLoggedIn = false;
      return { ...state };

    case LOGIN_SUCCESS:
      state.loading = false;
      state.user = action.user;
      state.isLoggedIn = true;
      state.error = null;
      return { ...state };

    case LOGIN_FAILED:
      state.loading = false;
      state.user = null;
      state.error = action.error;
      state.isLoggedIn = false;

      return { ...state };

    case LOG_OUT:
      localStorage.removeItem(USER_KEY);
      return { ...initialState, isLoggedIn: false };

    default:
      return { ...state };
  }
};

export default userLoginReducer;
