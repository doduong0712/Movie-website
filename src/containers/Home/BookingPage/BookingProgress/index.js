import React, { useMemo, useContext } from "react";
import PropTypes from "prop-types";
import { actLogout } from "../../LoginPage/modules/action";
import {
  USER_KEY,
  DESKTOP_MEDIA,
  FAKE_IMG_USER,
} from "../../../../constants/config";
import { connect } from "react-redux";
import useMedia from "../../../../Hook/useMedia";
import { BookingPageContext } from "..";
import { Link } from "react-router-dom";

const logo = require("../../../../images/logo.png");
const back = require("../../../../images/back-session.png");

const renderList = (step) => {
  switch (step) {
    case 1:
      return (
        <li className="process__item current-process active">
          <span>01</span>Chọn Ghế
        </li>
      );
    case 2:
      return (
        <li className="process__item current-process active">
          <span>02</span>Thanh Toán
        </li>
      );

    /* case 3:
      return(
        <li className="process__item current-process active">
         <span>03</span>Kết quả đặt vé
        </li>
      ) */
    default:
      break;
  }
};

function BookingProgress(props) {
  const user = localStorage.getItem(USER_KEY);
  const hoTen = useMemo(() => JSON.parse(user).hoTen, [user]);
  const { actLogout } = props;
  const isDesktop = useMedia(DESKTOP_MEDIA);

  const { state, dispatch } = useContext(BookingPageContext);
  const { step, isOpen } = state;

  const handleGoBack = () => {
    //nếu đang mở combo box thì nút quay lại sẽ thực hiện chức năng chuyển về giao diện thanh toán (step===2)
    if (isOpen) {
      dispatch({ type: "close-combo" });
    } else {
      //nếu ko mở combo box thì thực hiện chức năng lùi step bth
      dispatch({ type: "back" });
    }
  };

  return (
    <section id="process-section">
      <div id="btnAction">
        {!isDesktop ? (
          //mobile view & step ===1 => hiện logo
          step === 1 ? (
            <Link to="/">
              <img className="logo-img" src={logo} alt="logo" />
            </Link>
          ) : (
            // mobileview but step=== 2,3 => hiện btn goback
            <div onClick={handleGoBack}>
              <img width="30px" src={back} alt="back" />
            </div>
          )
        ) : (
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        )}
      </div>

      <ul className="process__list">
        {isDesktop ? (
          <>
            {/* <li className="process__item current-process active">
              <span>01</span>
              {"Chọn Ghế & Thanh Toán"}
            </li>
            <li className="process__item">
              <span>02</span>
              {"Kết quả đặt vé"}
            </li> */}
          </>
        ) : (
          <>{renderList(step)}</>
        )}
      </ul>
      <div className="process__account">
        <img className="avatar-img" src={FAKE_IMG_USER} alt="avatar" />
        <span className="hoTen">{hoTen}</span>
        <div className="process__account--logout" onClick={(e) => actLogout(e)}>
          Đăng xuất
        </div>
      </div>
    </section>
  );
}

BookingProgress.propTypes = {
  actLogout: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

BookingProgress.defaultProps = {
  actLogout: () => {},
  step: 1,
};

const mapDispatchToProps = (dispatch) => {
  return {
    actLogout: (e) => {
      dispatch(actLogout(e));
    },
  };
};

export default connect(null, mapDispatchToProps)(BookingProgress);
