import React, { memo } from "react";
import PropTypes from "prop-types";
import { FAKE_IMG_USER } from "../../constants/config";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actLogout } from "../../containers/Home/LoginPage/modules/action";

function Logged(props) {
  const { actLogout, hoTen } = props;

  const handleLogout = (e) => {
    //console.log(e);

    e.preventDefault();
    actLogout(e);
  };
  return (
    <>
      <li className="nav-item nav-item--login">
        <span className="nav-link">
          <img className="avatar-img" src={FAKE_IMG_USER} alt="avatar" />
          {hoTen}
        </span>
      </li>
      <li className="nav-item nav-item--register">
        <Link className="nav-link" to="/" onClick={handleLogout}>
          Đăng Xuất
        </Link>
      </li>
    </>
  );
}

Logged.propTypes = {
  actLogout: PropTypes.func.isRequired,
  hoTen: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    actLogout: (e) => {
      dispatch(actLogout(e));
    },
  };
};

export default connect(null, mapDispatchToProps)(memo(Logged));
