import axiosClient from "./axiosClient";
const moviesAPI = {
  //lấy thông tin toàn bộ danh sách phim
  getDanhSachPhim: () => {
    //Lấy thông tin danh sách phim
    const uri = "/QuanLyPhim/LayDanhSachPhim?maNhom=GP09";
    return axiosClient.get(uri);
  },

  //lấy thông tin của 1 phim, bao gồm 1 mảng lichChieu<obj> không phân biệt cụm rạp
  getThongTinPHim: (maPhim) => {
    const uri = `/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`;
    return axiosClient.get(uri);
  },
};

export default moviesAPI;
