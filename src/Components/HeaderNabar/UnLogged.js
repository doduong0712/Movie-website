import React, { memo } from "react";
import { Link } from "react-router-dom";
import avatar from "../../images/avatar.png";

function UnLogged() {
  return (
    <>
      <li className="nav-item nav-item--login">
        <Link to={{ pathname: "/login" }} className="nav-link">
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
