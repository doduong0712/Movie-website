import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CinemaDetailItem from "../CinemaDetailItem";
import LinkButton from "../LinkButton";

const styleTime = (ngayChieuGioChieu) => {
  let d = new Date(ngayChieuGioChieu);
  // console.log(d);
  const startTime = d.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
  // console.log(startTime); //10:10
  d.setHours(d.getHours() + 2);
  const endTime = d.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
  // console.log(endTime); //12:10
  return [startTime, endTime];
};

const chechPassStartTime = (startTime) => {
  let d = new Date();
  let currentTime = d.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (startTime > currentTime) {
    return false;
  }
  return true;
};

const renderBtnTime = (listTimes = []) => {
  if (listTimes && listTimes.length > 0) {
    return listTimes.map((item, intex) => {
      const [startTime, endTime] = styleTime(item.ngayChieuGioChieu);
      return (
        <LinkButton
          key={item.maLichChieu}
          to={`/booking/${item.maLichChieu}`}
          className="btn btn-time"
          disabled={chechPassStartTime(startTime)}
        >
          <span className="startTime">{startTime}</span> ~ {endTime}
        </LinkButton>
      );
    });
  }
};

//nếu hệ thống rạp có chiếu phim được truyền vào comp này nhưng vào ngày nhất định nào đó, TẤT CẢ cụm rạp trong hệ thống đó KHÔNG có lịch chiếu nào (every cumRap.lichChieuPhim.length === 0) thì hiển thị UI khác (if true)
const checkCumRapHasNothingToShow = (cumRapChieu = []) => {
  return cumRapChieu.every((cumRap) => cumRap.lichChieuPhim.length === 0);
};

function ShowList(props) {
  const { foundHeThongRap } = props;

  const { cumRapChieu } = foundHeThongRap;

  const renderCumRap = () => {
    const isCumRapHasNothingToShow = checkCumRapHasNothingToShow(cumRapChieu);
    if (isCumRapHasNothingToShow) {
      return (
        <div className="alert alert-danger">Ngày này không có lịch chiếu</div>
      );
    }

    return cumRapChieu.map((cumRap, index) => {
      const isCumRapShowOnday =
        cumRap.lichChieuPhim && cumRap.lichChieuPhim.length > 0;

      return (
        isCumRapShowOnday && (
          <div key={cumRap.maCumRap} className="wrapper__collapse ">
            <div
              className="main__collapse"
              data-toggle="collapse"
              data-target={`#${
                foundHeThongRap.maHeThongRap
              }_${cumRap.maCumRap.trim()}`}
            >
              <CinemaDetailItem system={foundHeThongRap} cinema={cumRap} />
            </div>
            <div
              className="collapse"
              id={`${foundHeThongRap.maHeThongRap}_${cumRap.maCumRap.trim()}`}
            >
              <div className="pt-3 row content_collapse stack">
                <div className="col-12 digital mb-2">2D Digital</div>
                <div className="col-12 ">
                  {/* {renderTimeList(cumRap.lichChieuPhim, selectDay)} */}
                  {renderBtnTime(cumRap.lichChieuPhim, cumRap)}
                </div>
              </div>
            </div>
          </div>
        )
      );
    });
  };

  return <>{renderCumRap()}</>;
}

const mapStateToProps = (state) => {
  return {
    selectDay: state.detailMovieReduver.selectDay,
  };
};

ShowList.propsTypes = {
  foundHeThongRap: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(ShowList);
