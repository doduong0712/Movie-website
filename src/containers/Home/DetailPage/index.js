import React, { useEffect } from "react";
import { connect } from "react-redux";
import Carousel from "../../../Components/Carousel";
import Loading from "../../../Components/Loading";
import CarouselItem from "../../../Components/Carousel/CarouselItem";
import MovieThumbnail from "../../../Components/MovieThumbnail";
import SingleShowTimeDetail from "../../../Components/SingleShowTimeDetail";
import MovieInfo from "../../../Components/MovieInfo";
import DiscussSection from "../../../Components/DiscussSection";
import { MOBILE_MEDIA } from "../../../constants/config";

import DetailMovieStyle from "../../../HOC/DetailMovieStyle";
import MainTitleDesktop from "./MainTitleDesktop";
import MainTitleMobile from "./MainTitleMobile";
import NavigationTab from "../../../Components/NavigationTab";
import useMedia from "../../../Hook/useMedia";
import CirclePoint from "../../../Components/CirclePoint";

import { actFetchListHeThongRap } from "../../../Components/TheaterList/modules/action";
import { actGetReviews } from "../../../Components/DiscussSection/modules/action";
import { actFetchDetailMovie } from "./modules/action";

const MainTitleDesktopStyle = DetailMovieStyle(MainTitleDesktop, "detailMovie");

const MainTitleMobileStyle = DetailMovieStyle(MainTitleMobile, "detailMovie");

const items = {
  lichChieu: "Lịch chiếu",
  thongTin: "Thông tin",
  danhGia: "Đánh giá",
};

function DetailPage(props) {
  const isMobile = useMedia(MOBILE_MEDIA);

  const {
    detailMovie,
    fetchDetailMovie,
    fetchReviewsPost,
    fetchListHeThongRap,
    listHeThongRap,
    loadingReview,
    loadingDetaiMovie,
  } = props;

  useEffect(() => {
    const slug = props.match.params.slug; //1132-ted-part-2
    const maPhim = slug.slice(0, slug.indexOf("-"));

    fetchDetailMovie(maPhim);
    fetchReviewsPost();
    //nếu chưa có trên store thì fetch về
    if (!listHeThongRap || listHeThongRap.length === 0) {
      fetchListHeThongRap();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingReview || loadingDetaiMovie) return <Loading />;
  return (
    <>
      <div style={{ marginTop: 60 }} />
      {/* CAROUSEL/ HERO */}
      <Carousel isHero>
        <CarouselItem detailMovie={detailMovie} isHero />
        {/* Hero banner for detailPage */}
        {!isMobile && (
          <div className="hero-detail myContainer">
            <div className="row align-items-center">
              <div className="movieThumbnail col-3">
                <MovieThumbnail movie={detailMovie} />
              </div>
              {/* main detail title*/}
              <div className="col-6">
                <MainTitleDesktopStyle detailMovie={detailMovie} />
              </div>
              {/* danh gia/ points */}
              <div className="hero__detail--pointgruop d-flex flex-column align-items-center col-3 mx-auto">
                {<CirclePoint movie={detailMovie} />}
              </div>
            </div>
          </div>
        )}
      </Carousel>
      {/* Title on moblie view */}
      {isMobile && (
        <section className="mobile-main-title myContainer">
          <div className="myContainer">
            <MainTitleMobileStyle detailMovie={detailMovie} />
          </div>
        </section>
      )}
      <section className="main" id="main">
        <div className="myContainer">
          <NavigationTab items={items} />
          <div className="tab-content">
            {/* Lịch chiếu*/}
            <div
              className="tab-pane fade show active"
              id="lichChieu"
              role="tabpanel"
              aria-labelledby="lichChieu-tab"
            >
              <SingleShowTimeDetail />
            </div>
            {/* Thông tin*/}
            <div
              className="tab-pane fade  "
              id="thongTin"
              role="tabpanel"
              aria-labelledby="thongTin-tab"
            >
              <MovieInfo movie={detailMovie} />
            </div>
            {/* Đánh giá */}
            <div
              className=" tab-pane fade"
              id="danhGia"
              style={{ background: "transparent" }}
              role="tabpanel"
              aria-labelledby="danhGia-tab"
            >
              <DiscussSection />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    listHeThongRap: state.listHeThongRapReducer.listHeThongRap,
    detailMovie: state.detailMovieReduver.detailMovie,
    loadingReview: state.reviewsReducer.loading,
    loadingDetaiMovie: state.detailMovieReduver.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //lay id de goi API hien thong tin chi tiet cua phim
    fetchDetailMovie: (maPhim) => {
      dispatch(actFetchDetailMovie(maPhim));
    },
    //lay danh sach heThongRap (maHeThongRap,logo,...)
    fetchListHeThongRap: () => {
      dispatch(actFetchListHeThongRap());
    },
    //lay danh sach reviews
    fetchReviewsPost: () => {
      dispatch(actGetReviews());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
