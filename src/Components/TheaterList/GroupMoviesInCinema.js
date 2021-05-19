import React from "react";
import PropTypes from "prop-types";
import TabPanel from "../TabPanel";
import useMedia from "../../Hook/useMedia";
import DetailMovieItem from "./DetailMovieItem";
import { MOBILE_MEDIA, TODAY } from "../../constants/config";

/* 
  Lấy 10 lịch chiếu trong ngày 01-01-2019
*/
const getToDayListTime = (lstLichChieu = []) => {
  if (lstLichChieu && lstLichChieu.length > 0) {
    return lstLichChieu.filter((lichChieu) => {
      return lichChieu.ngayChieuGioChieu.slice(0, 10) === TODAY;
    });
  }
};
/**
 * Nếu có bất kì phim nào trong cumRap có lịch chiếu vào ngày hôm nay thì thì đưa cumRap đó vào mảng cinemaToday
 */

const findMovieHasShowToday = (cumRap = {}) => {
  let cinemaToday = [];
  cumRap.danhSachPhim.forEach((movie) => {
    //console.log(movie);

    let todayList = [];
    todayList = getToDayListTime(movie.lstLichChieuTheoPhim);
    if (todayList.length > 0) {
      // cinemaToday.push(cumRap);
      cinemaToday = [...cinemaToday, cumRap];
    }
  });

  // filter (remove) duplicate
  // cinemaToday = cinemaToday.reduce(
  //   (items, item) =>
  //     items.find((x) => x.maCumRap === item.maCumRap)
  //       ? [...items]
  //       : [...items, item],
  //   []
  // );
  //console.log(cinemaToday);

  return cinemaToday;
};

const renderListMovie = (cumRap) => {
  if (cumRap.danhSachPhim && cumRap.danhSachPhim.length > 0) {
    return cumRap.danhSachPhim.map((movie) => {
      const todayListTime = getToDayListTime(movie.lstLichChieuTheoPhim);
      //phim có thời gian chiếu trong hôm nay mới render ra
      return (
        todayListTime.length > 0 && (
          <DetailMovieItem
            key={movie.maPhim}
            movie={movie}
            maCumRap={cumRap.maCumRap}
            todayListTime={todayListTime}
          />
        )
      );
    });
  }
};

const checkCinemaHasShowToday = (cinemaToday = [], maCumRap) => {
  return cinemaToday.some((item) => item.maCumRap === maCumRap);
};

function GroupMoviesInCinema(props) {
  const { cumRap, index, j } = props;
  //console.log(cumRap);

  const cinemaToday = findMovieHasShowToday(cumRap);
  //console.log(cinemaToday);

  const isMobile = useMedia(MOBILE_MEDIA);

  const settings = isMobile
    ? {
        className: "collapse GroupMoviesInCinema MOBILE",
        id: cumRap.maCumRap.trim(),
      }
    : {
        className: `tab-pane fade ${
          index === 0 && j === 0 ? "show active" : ""
        }`,
        id: cumRap.maCumRap.trim(),
      };

  let isCinemaHasMovieToday = checkCinemaHasShowToday(
    cinemaToday,
    cumRap.maCumRap
  );

  return (
    <TabPanel settings={settings}>
      {isCinemaHasMovieToday ? (
        renderListMovie(cumRap)
      ) : (
        <div className="alert alert-danger">
          Cụm rạp này hôm nay không có phim
        </div>
      )}
    </TabPanel>
  );
}
/**
 // 1.kiểm tra xem cụm rạp đó có phim nào lịch chiếu hôm nay không
 * Nếu có thì render ra, không thì thông báo
 */

GroupMoviesInCinema.propTypes = {
  cumRap: PropTypes.object.isRequired,
  index: PropTypes.number,
  j: PropTypes.number,
};
GroupMoviesInCinema.defaultProps = {
  cumRap: {},
  index: 0,
  j: 0,
};

export default GroupMoviesInCinema;
