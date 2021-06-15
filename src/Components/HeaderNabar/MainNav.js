import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
//import { useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

//Components
import Logged from "./Logged";
import UnLogged from "./UnLogged";
import { USER_KEY } from "../../constants/config";
import { useSelector } from "react-redux";

function MainNav(props) {
  const isLoggedIn = useSelector((state) => state.userLoginReducer.isLoggedIn);

  const { customClass, isOpen, handleClose } = props; //nhận từ cha

  const [hoTen, setHoTen] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      const user = localStorage.getItem(USER_KEY);
      const hoTen = JSON.parse(user).hoTen;
      setHoTen(hoTen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* const { hash } = useLocation();
  const [isHashLink, setIsHashLink] = useState(false);
  useEffect(() => {
    if (hash.includes("#")) {
      setIsHashLink(true);
    } else {
      setIsHashLink(false);
    }
  }, [hash]); */

  return (
    <ul
      onClick={handleClose ? handleClose : null}
      className={`${customClass} ${isOpen ? "active" : ""}`}
    >
      {isLoggedIn ? <Logged hoTen={hoTen} /> : <UnLogged />}
      <li className="nav-item hideOnDesk">
        <Link className="nav-link" to="/#lichchieu" href="lichchieu">
          Lịch Chiếu
        </Link>
      </li>
      <li className="nav-item hideOnDesk">
        <Link className="nav-link" to="/#theaterList">
          Cụm Rạp
        </Link>
      </li>
      <li className="nav-item hideOnDesk">
        <Link className="nav-link" to="/#tintuc">
          Tin Tức
        </Link>
      </li>
      <li className="nav-item hideOnDesk">
        <Link className="nav-link" to="/#mobile">
          Ứng dụng
        </Link>
      </li>
    </ul>
  );
}

MainNav.defaultProps = {
  customClass: "nav-list",
};
MainNav.propTypes = {
  isOpen: PropTypes.bool,
  customClass: PropTypes.string,
  handleClose: PropTypes.func,
};

export default memo(MainNav);
