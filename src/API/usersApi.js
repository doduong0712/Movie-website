import axiosClient from "./axiosClient";

const usersApi = {
  postLogIn: (user) => {
    const uri = "/QuanLyNguoiDung/DangNhap";
    return axiosClient.post(uri, user);
  },
  postSignUp: (user) => {
    const uri = "/QuanLyNguoiDung/DangKy";
    return axiosClient.post(uri, user);
  },
};

export default usersApi;
