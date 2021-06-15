import React from "react";
import Container from "@material-ui/core/Container";

import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import { connect } from "react-redux";
import { actFetchSignUp } from "./modules/action";
import Copyright from "../../../Components/Copyright";
import ErrorUI from "../../../Components/ErrorUI";
import useUserStyle from "../../../style/useUserStyle";
import useSetBackground from "../../../Hook/useSetBackground";
import useFormValidation from "../../../Hook/useFormValidation";
import validateForm from "../../../Hook/validateForm";

import { Link } from "react-router-dom";
import useTitle from "../../../Hook/useTitle";

const logo = require("../../../images/logo.png");
const INIT_SIGNUP_STATE = {
  ho: "",
  ten: "",
  taiKhoan: "",
  matKhau: "",
  matKhau2: "",
  email: "",
  soDT: "",
};

function SignUp(props) {
  const { fetchSignUp, loadingSignUp, errorSignUp } = props;
  //console.log(errorSignUp);

  const classes = useUserStyle();
  useTitle("Đăng Ký");
  useSetBackground();

  const {
    handleChange,
    values, // init = INIT_LOGIN_STATE
    errors, // init = INIT_LOGIN_STATE
    isNotValid,
    handleBlur, //init = true
    handleSubmit,
  } = useFormValidation(INIT_SIGNUP_STATE, validateForm, fetchSignUp, props);
  /*  console.log(values);
  console.log(errors);
  console.log(isNotValid); */

  const configBeforeSubmit = (e, values) => {
    e.preventDefault();
    const { ho, ten, taiKhoan, matKhau, soDT, email } = values;

    const user = {
      hoTen: `${ho} ${ten}`,
      taiKhoan,
      matKhau,
      soDT,
      email,
      maNhom: "GP09",
      maLoaiNguoiDung: "KhachHang",
    };
    handleSubmit(e, user);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.wrapper}>
      <CssBaseline />
      <div className={classes.paper}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Typography component="h1" variant="h5">
          Đăng kí
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => configBeforeSubmit(e, values)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Họ"
                id="ho"
                name="ho"
                type="text"
                required
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.ho ? true : false}
                helperText={errors.ho}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Tên"
                id="ten"
                name="ten"
                type="text"
                required
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.ten ? true : false}
                helperText={errors.ten}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Tài Khoản"
                id="taiKhoan"
                name="taiKhoan"
                type="text"
                required
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.taiKhoan ? true : false}
                helperText={errors.taiKhoan}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Mật Khẩu"
                id="matKhau"
                name="matKhau"
                type="password"
                required
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.matKhau ? true : false}
                helperText={errors.matKhau}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Xác Nhận Mật Khẩu"
                id="matKhau2"
                name="matKhau2"
                type="password"
                required
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.matKhau2 ? true : false}
                helperText={errors.matKhau2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Email"
                id="email"
                name="email"
                type="email"
                required
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email ? true : false}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Số Điện Thoại"
                id="soDT"
                name="soDT"
                type="text"
                required
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.soDT ? true : false}
                helperText={errors.soDT}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Nhận các thông báo và ưu đãi mới nhất"
              />
            </Grid>
          </Grid>
          {errorSignUp && <ErrorUI message={errorSignUp.response?.data} />}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={isNotValid || loadingSignUp}
          >
            Đăng Kí
          </Button>
          <Grid container justify="flex-end" item>
            <Link className={classes.Link} to="/login">
              Đã có tài khoản ! Đăng nhập ngay
            </Link>
          </Grid>
        </form>
      </div>
      <Box mt={3}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    loadingSignUp: state.userSignUpReducer.loading,
    errorSignUp: state.userSignUpReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSignUp: (user, history) => {
      //console.log(user);
      dispatch(actFetchSignUp(user, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
