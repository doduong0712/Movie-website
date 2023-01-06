import React, { useState } from "react";
import { connect } from "react-redux";
import { actFetchAdminLogin } from "./modules/action";
import Loading from "../../../Components/Loading";

const initialState = {
  username: "",
  password: "",
};

function Auth(props) {
  const { fetchAdminLogin, error, loading } = props;

  const [value, setValue] = useState(initialState);

  const handleOnChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
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
    if (error) {
      return <div className="alert alert-danger"> {error.response.data}</div>;
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-sm-6 mx-auto">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                onChange={handleOnChange}
                name="username"
                type="text"
                className="form-control"
                value={value.username}
              />
              <div className="form-group">
                <label>Password</label>
                <input
                  onChange={handleOnChange}
                  name="password"
                  type="password"
                  className="form-control"
                  value={value.password}
                />
              </div>
              {renderNoti()}
              <button type="submit" className="btn btn-success">
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
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
