import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import avatar from "../../images/avatar.png";

function UnLogged() {
  const location = useLocation(); //Lấy được truy cập , từ các from khác

  return (
    <>
      <li className="nav-item nav-item--login">
        <Link
          to={{ pathname: "/login", state: { from: location } }}
          className="nav-link"
        >
          <img className="avatar-img" src={avatar} alt="avatar" />
          Đăng Nhập
        </Link>
      </li>
      <li className="nav-item nav-item--register">
        <Link className="nav-link" to="/sign-up">
          Đăng Ký
        </Link>
      </li>
    </>
  );
}

export default memo(UnLogged);
