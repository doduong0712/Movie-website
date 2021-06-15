import React, { useContext } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  actBuyTicket,
  actRefreshBuyTicket,
} from "../../../../Components/Seat/modules/action";
import { BookingPageContext } from "../index";
import Swal from "sweetalert2";
import { USER_KEY } from "../../../../constants/config";
import { useHistory, useParams } from "react-router-dom";
import { renderGheDangChon } from "../../../../utils/movie";

const styleGiaTien = (numPrice) => {
  return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function ConfirmStep(props) {
  const { buyTicket, refreshSeatState, danhSachVe } = props;
  const { state, dispatch } = useContext(BookingPageContext);

  const { step, isOpen, check, totalComboCost } = state;

  const history = useHistory();
  const params = useParams();

  const handleBuyTicket = (e) => {
    e.persist(); // khi sử dụng các sự kiện tổng hợp React bên trong một hàm gọi lại không đồng bộ
    e.preventDefault(); //hủy sự kiện nếu nó có thể hủy được
    //nếu đang mở combo thì nút next hoạt động như nút tắt combo (và hiển thị lại step 2)
    /* if (isOpen) {
      dispatch({ type: "close-combo" });
      return;
    } */
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

  return (
    <section id="confirm">
      <div className="confirm-wrapper row ">
        {/*Hiển thị ghế đang chọn chọn ,Giá tiền của combo */}
        <div className="col-6 confirm__item" id="showseat">
          {isOpen
            ? totalComboCost
              ? `${styleGiaTien(totalComboCost)} đ`
              : ""
            : renderGheDangChon(danhSachVe)}
        </div>

        <div className=" col-6 confirm__item" id="btnGoNext">
          {step === 1 ? (
            <button
              className="btn-confirm"
              onClick={() => dispatch({ type: "next" })}
              disabled={danhSachVe && danhSachVe.length === 0}
            >
              Tiếp tục
            </button>
          ) : (
            //step === 2 nếu ko mở combobox thì hiển thị thanh toán, ngược lại nút thanh toán sẽ là nút đóng combobox
            <button
              className="btn-confirm"
              onClick={handleBuyTicket}
              disabled={(danhSachVe && danhSachVe.length === 0) || check}
            >
              Thanh Toán
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

ConfirmStep.propTypes = {
  danhSachVe: PropTypes.array.isRequired,
};
ConfirmStep.defaultProps = {
  danhSachVe: [],
};
const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmStep);
