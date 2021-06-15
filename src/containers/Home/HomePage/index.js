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
import useTitle from "../../../Hook/useTitle";
import PropTypes from "prop-types";
import Loading from "../../../Components/Loading";
import {
  actFetchListHeThongRap,
  actFetchThongTinLichChieu,
} from "../../../Components/TheaterList/modules/action";

function HomePage(props) {
  const {
    loadingListMovie,
    loadingTheater,
    fetchListMovie,
    fetchListHeThongRap,
    fetchThongTinLichChieu,
  } = props;

  useTitle("Trang chủ");
  useEffect(() => {
    fetchListMovie();
    fetchListHeThongRap();
    fetchThongTinLichChieu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingListMovie || loadingTheater) return <Loading />;

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

HomePage.propTypes = {
  loadingListMovie: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    loadingListMovie: state.listMovieReducer.loading,
    loadingTheater: state.listHeThongRapReducer.loading,
  };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
