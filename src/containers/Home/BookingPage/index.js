import React, { createContext, useReducer, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import BookingProgress from "./BookingProgress";
import { actFetchBookingMoviePage } from "./modules/action";
import clsx from "clsx";
import useMedia from "../../../Hook/useMedia";
import { MOBILE_MEDIA } from "../../../constants/config";

import BookingTheater from "../../../Components/BookingTheater";
import TimeWaiting from "../../../Components/TimeWaiting";
import Loading from "../../../Components/Loading";
import SeatRow from "../../../Components/SeatRow";
import NoteSeat from "../../../Components/NoteSeat";
import PaySection from "../../../Components/PaySection";
import ComboBox from "../../../Components/ComboBox";
import ConfirmStep from "./ConfirmStep";
import useTitle from "../../../Hook/useTitle";

const screen = require("../../../images/screen.png");

const reducer = (state, action) => {
  const { step, isOpen, amount, totalComboCost } = state;
  const { price, type } = action;

  switch (type) {
    case "add":
      return {
        ...state,
        amount: amount + 1,
        totalComboCost: totalComboCost + price,
      };
    case "remove":
      return {
        ...state,
        amount: amount - 1,
        totalComboCost: totalComboCost - price,
      };

    case "next":
      return {
        ...state,
        step: step + 1,
        isOpen: false,
      };
    case "check":
      return {
        ...state,
        check: false,
      };

    case "back":
      return {
        ...state,
        step: step - 1,
        isOpen: false,
      };
    case "open-combo":
      return {
        ...state,
        isOpen: true,
      };
    case "close-combo":
      return {
        ...state,
        isOpen: false,
      };
    case "toggle":
      return {
        ...state,
        isOpen: !isOpen,
      };

    default:
      break;
  }
};

const initialState = {
  step: 1,
  isOpen: false, //flag to check if user open combobox
  check: true,

  amount: 0,
  totalComboCost: 0,
};

export const BookingPageContext = createContext(null);

function BookingPage(props) {
  const { fetchMovieDetailPage, loading, isLoggedIn } = props;

  const maLichChieu = props.match.params.maLichChieu;

  useTitle("Đặt vé");
  useEffect(() => {
    fetchMovieDetailPage(maLichChieu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //desktop luôn luôn hiện, còn mobile thì xét theo step
  const isMobile = useMedia(MOBILE_MEDIA);
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  if (loading) return <Loading />;
  if (!isLoggedIn) return <Redirect to="/" />;

  return (
    <BookingPageContext.Provider value={contextValue}>
      {/* css width:75 height:80 */}
      <BookingProgress />
      <section className={clsx("row", !isMobile && "main-wrapper")}>
        <main
          className="seat__section col-12 col-md-9"
          style={{
            display: `${
              !isMobile ? "block" : state.step === 1 ? "block" : "none"
            }`,
          }}
        >
          <div className="header--space" />
          <div className="seat__section--top">
            <BookingTheater />

            <TimeWaiting />
          </div>
          <div className="seat__section--map">
            <div className="screen">
              <img src={screen} alt="screen" />
            </div>
            {/*  */}
            <div className="listseat">
              <SeatRow />
            </div>

            {/*  */}

            <div className="noteseat">
              <NoteSeat type="normal" info="Ghế thường" />
              <NoteSeat type="vip" info="Ghế VIP" />
              <NoteSeat type="current" info="Ghế đang chọn" />
              <NoteSeat type="taken" info="Ghế đã có người chọn" />
            </div>
          </div>
        </main>
        <aside
          id="pay-section"
          className="col-12 col-md-3"
          style={{
            display: `${
              !isMobile
                ? "block"
                : state.step === 2 && !state.isOpen
                ? "block"
                : "none"
            }`,
          }}
        >
          <PaySection />
        </aside>

        {isMobile && <ConfirmStep />}
      </section>

      {/* {isMobile ? (
        <>
          <MobileView />
          
          <ConfirmStep />
        </>
      ) : (
        <DesktopView />
      )} */}

      <section
        id="combo-section"
        className={state.isOpen ? "open" : ""}
        style={{
          display: `${!isMobile ? "block" : state.isOpen ? "block" : "none"}`,
        }}
      >
        <ComboBox />
      </section>
    </BookingPageContext.Provider>
  );
}

BookingPage.propTypes = {
  fetchMovieDetailPage: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    loading: state.bookingMoviePageReducer.loading,
    isLoggedIn: state.userLoginReducer.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovieDetailPage: (maLichChieu) => {
      dispatch(actFetchBookingMoviePage(maLichChieu));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingPage);
