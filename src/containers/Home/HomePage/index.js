import React, { useEffect } from "react";
import { connect } from "react-redux";
//import Loading from "../../../Components/Loading";
import Carousel from "../../../Components/Carousel";
import AppMobile from "../../../Components/AppMobile";
import ListMovie from "../../../Components/ListMovie";
import News from "../../../Components/News";
import TheaterList from "../../../Components/TheaterList";
import { actFetchListMoive } from "./modules/action";
import SeperateSection from "../../../Components/SeperateSection";
import {
  actFetchListHeThongRap,
  actFetchThongTinLichChieu,
} from "../../../Components/TheaterList/modules/action";

function HomePage(props) {
  const { fetchListMovie, fetchListHeThongRap, fetchThongTinLichChieu } = props;
  //console.log(props);

  useEffect(() => {
    fetchListMovie();
    fetchListHeThongRap();
    fetchThongTinLichChieu();
  });

  return (
    <div>
      <Carousel />
      <ListMovie />
      <SeperateSection />

      <TheaterList />
      <SeperateSection />
      <News />
      <SeperateSection />
      <AppMobile />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListMovie: () => {
      dispatch(actFetchListMoive());
    },
    fetchListHeThongRap: () => {
      dispatch(actFetchListHeThongRap());
    },
    fetchThongTinLichChieu: () => {
      dispatch(actFetchThongTinLichChieu());
    },
  };
};

export default connect(null, mapDispatchToProps)(HomePage);
