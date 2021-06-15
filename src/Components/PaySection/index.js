import React, {
  useMemo,
  useContext,
  //useReducer
} from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import useMedia from "../../Hook/useMedia";
import { MOBILE_MEDIA, USER_KEY } from "../../constants/config";
import Swal from "sweetalert2";
import payData from "../../constants/payData";
import { BookingPageContext } from "../../containers/Home/BookingPage";
import {
  renderGheDangChon,
  renderTenCumRap,
  renderGiaTien,
} from "../../utils/movie";
import { actBuyTicket, actRefreshBuyTicket } from "../Seat/modules/action";

const popcorn = require("../../images/popcorn.jpg");

const styleGiaTien = (numPrice) => {
  return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const totalPay = (ticketCost = 0, comboCost = 0) => {
  let checkType = [ticketCost, comboCost];

  const regex = /,/gi;
  let convertedTypes = checkType.map((item) => {
    if (isNaN(item)) {
      //Kiểm tra xem một giá trị có phải là NaN hay không:
      return item.replace(regex, ""); // Bỏ đi dấu  , trước phần ngàn
    }
    return item;
  });

  let total = parseFloat(convertedTypes[0]) + parseFloat(convertedTypes[1]);

  return styleGiaTien(total);
};

//0989634306 doduong7122000@gmail.com

/* const checkedReducer = (state, action) => {
  switch (action.type) {
    case "checked":
      return { ...state, isChecked: false };
  }
}; */

/* const initialState = {
  isChecked: true,
}; */

function PaySection(props) {
  const { danhSachVe, buyTicket, refreshSeatState } = props;

  const { thongTinPhim } = props.bookingMovie;

  //const [state, dispatch] = useReducer(checkedReducer, initialState);
  //const { isChecked } = state;

  const history = useHistory();
  const params = useParams();
  const isMobile = useMedia(MOBILE_MEDIA);

  const { state, dispatch } = useContext(BookingPageContext);
  const { check, totalComboCost } = state;

  const tenCumRap = useMemo(() => renderTenCumRap(thongTinPhim), [
    thongTinPhim,
  ]);

  const totalTicketCost = useMemo(
    () => renderGiaTien(danhSachVe),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [danhSachVe.length]
  );

  const handleBuyTicked = (e) => {
    e.persist(); // khi sử dụng các sự kiện tổng hợp React bên trong một hàm gọi lại không đồng bộ
    e.preventDefault(); //hủy sự kiện nếu nó có thể hủy được
    const user = localStorage.getItem(USER_KEY);
    const data = {
      maLichChieu: parseInt(params.maLichChieu),
      taiKhoanNguoiDung: JSON.parse(user).taiKhoan,
      danhSachVe,
    };
    Swal.fire({
      title: "Thông tin đặt vé sẽ được gửi qua email",
      text: "Hãy kiểm tra thông tin trước khi xác nhận!",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Đồng ý!",
      cancelButtonText: "Hủy",
    }).then((res) => {
      if (res.value) {
        buyTicket(data);
        Swal.fire({
          icon: "success",
          text: "Đặt vé thành công",
          width: "400px",
          padding: "0 0 20px 0",
        })
          .then(() => refreshSeatState())
          .then(() => history.push("/"));
      } else {
        e.preventDefault();
      }
    });
  };

  const handleOpenCombo = () => {
    //desktop view thì toggle mở đóng
    if (!isMobile) {
      dispatch({ type: "toggle" });
    } else {
      //mobile view thì toggle sang step 3
      dispatch({ type: "open-combo" });
    }
  };

  const renderPay = () => {
    return payData.map((item, index) => {
      return (
        <div key={index} className="radio__item">
          <input
            className="radio__item--input"
            type="radio"
            name={item.name}
            id={item.value}
            defaultValue={item.value}
            onClick={() => dispatch({ type: "check" })}
          />
          <label className="radio__item--label label__ATM" htmlFor={item.value}>
            <div className="pay__figure">
              <img src={item.img} alt={item.value} />
            </div>
            <p className="pay__text">{item.description}</p>
          </label>
        </div>
      );
    });
  };

  if (!thongTinPhim) return null;
  return (
    <>
      <div className="pay-wrapper">
        <div className="header--space" />
        <div className="pay__item--wrapper">
          <div className="total">
            <span id="totalMoney">
              {totalPay(totalTicketCost, totalComboCost)} đ
            </span>
          </div>
        </div>
        <div className="pay__item--wrapper">
          <div className="film__name font-weight-bold">
            <span id="filmname">{thongTinPhim.tenPhim}</span>
          </div>
        </div>
        <div className="pay__item--wrapper">
          <div className="showday row">
            <div className="col-6">Ngày giờ chiếu:</div>
            <div className="col-6 text-right font-weight-bold">
              <span id="date">{thongTinPhim.ngayChieu}</span> -{" "}
              <span id="time">{thongTinPhim.gioChieu}</span>
            </div>
          </div>
        </div>
        <div className="pay__item--wrapper">
          <div className="rap row">
            <div className="col-4">Cụm rạp:</div>
            <div className="col-8 text-right">
              <span id="cumrap">{tenCumRap[0]}</span> -
              <span id="chinhanh">{tenCumRap[1]}</span>
            </div>
          </div>
        </div>
        <div className="pay__item--wrapper">
          <div className="rap row">
            <div className="col-4">Rạp:</div>
            <div className="col-8 text-right">
              <span id="rapnumber">{thongTinPhim.tenRap}</span>
            </div>
          </div>
        </div>
        <div className="pay__item--wrapper">
          <div className="seatchosen row">
            <div className="col-8 myseat">
              {danhSachVe && danhSachVe.length > 0 && (
                <span className="mr-1">Ghế</span>
              )}
              <span id="myseat">{renderGheDangChon(danhSachVe)}</span>
            </div>
            <div className="demoMoney col-4 text-right font-weight-bold">
              {totalTicketCost} đ
            </div>
          </div>
        </div>
        <div
          className="pay__item--wrapper combo-click"
          onClick={handleOpenCombo}
        >
          <div className="seatchosen row">
            <div className="col-8 myseat " style={{ display: "flex" }}>
              <span>
                <img className="img-popcorn" src={popcorn} alt="popcorn" />
              </span>
              <span className="text ">Chọn Combo</span>
            </div>
            <div className="demoMoney col-4 text-right font-weight-bold">
              {styleGiaTien(totalComboCost)} đ
            </div>
          </div>
        </div>
        <div className="pay__item--wrapper">
          <div className="discountsection row">
            <div className="col-6">Ưu đãi:</div>
            <div className="col-6 text-right">
              <span id="coupon">0%</span>
            </div>
          </div>
        </div>
        <div className="pay__item--wrapper">
          <div className="howtopay">
            {check ? (
              <p className="text-danger"> Chọn phương thức thanh toán </p>
            ) : (
              <p>Hình thức thanh toán</p>
            )}
            <div className="radio-selection">{renderPay()}</div>
          </div>
        </div>
      </div>

      {!isMobile && (
        <div className="confirm__group">
          <div className="confirm__item">
            <button
              className="btn-confirm"
              onClick={handleBuyTicked}
              disabled={(danhSachVe && danhSachVe.length === 0) || check}
            >
              Thanh Toán
            </button>
          </div>
        </div>
      )}
    </>
  );
}

PaySection.propTypes = {
  bookingMovie: PropTypes.object,
  danhSachVe: PropTypes.array,
};

PaySection.defaultProps = {
  bookingMovie: {},
  danhSachVe: [],
};

const mapStateToProps = (state) => {
  return {
    bookingMovie: state.bookingMoviePageReducer.bookingMovie,
    danhSachVe: state.buyTicketReducer.danhSachVe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    buyTicket: (data) => {
      dispatch(actBuyTicket(data));
    },
    refreshSeatState: () => {
      dispatch(actRefreshBuyTicket());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaySection);
