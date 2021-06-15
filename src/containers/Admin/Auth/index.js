import React, { useState } from "react";
import { connect } from "react-redux";
import { actFetchAdminLogin } from "./modules/action";
import Loading from "../../../Components/Loading";

const initialState = {
  username: "",
  password: "",
};

function Auth(props) {
  const { fetchAdminLogin } = props;

  const [value, setValue] = useState(initialState);

  const handleOnChange = (e) => {
    setValue({
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault(); //Huỷ bỏ event nếu nó có thể huỷ mà không dừng sự lan rộng(propagation) của event tới phần khác.
    const user = {
      taikhoan: value.username,
      matKhau: value.password,
    };
    fetchAdminLogin(user, props.history);
  };

  const renderNoti = () => {
    const errorUser = props;
    if (errorUser) {
      return (
        <div className="alert alert-danger"> {errorUser.response.data}</div>
      );
    }
  };

  return <div>auth</div>;
}

const mapStateToProps = (state) => {
  return {
    loading: state.authAdminReducer.loading,
    error: state.authAdminReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAdminLogin: (user, history) => {
      dispatch(actFetchAdminLogin(user, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
