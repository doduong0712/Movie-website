import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { actFetchUserLogin } from "./modules/action";

import ErrorUI from "../../../Components/ErrorUI";
import Copyright from "../../../Components/Copyright";

import useSetBackground from "../../../Hook/useSetBackground";
import useUserStyles from "../../../style/useUserStyle";
import useFormValidation from "../../../Hook/useFormValidation";
import validateForm from "../../../Hook/validateForm";

import { Link } from "react-router-dom";
import useTitle from "../../../Hook/useTitle";

const logo = require("../../../images/logo.png");

const INIT_LOGIN_STATE = {
  taiKhoan: "",
  matKhau: "",
};

function LoginPage(props) {
  const { errorLogin, loadingLogin, fetchUserLogin } = props;

  useTitle("Đăng Nhập");
  useSetBackground();
  const classes = useUserStyles();

  const {
    handleChange,
    values, // init = INIT_LOGIN_STATE
    errors, // init = INIT_LOGIN_STATE
    isNotValid,
    handleBlur, //init = true
    handleSubmit,
  } = useFormValidation(INIT_LOGIN_STATE, validateForm, fetchUserLogin, props);
  /*  console.log("errors", errors);
  console.log("values", values);
  console.log("isNotValid", isNotValid); */
  return (
    <Container component="main" maxWidth="xs" className={classes.wrapper}>
      <CssBaseline />
      <div className={classes.paper}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Typography component="h1" variant="h5">
          Đăng Nhập
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => handleSubmit(e, values)}
          autoComplete="off"
        >
          <TextField
            error={errors.taiKhoan ? true : false} //ko có lỗi->false
            variant="outlined"
            margin="normal"
            label="Tài Khoản"
            id="taiKhoan"
            name="taiKhoan"
            type="text"
            onChange={handleChange}
            defaultValue={values.taiKhoan}
            onBlur={handleBlur}
            helperText={errors.taiKhoan}
            required
            fullWidth
          />
          <TextField
            error={errors.matKhau ? true : false} //ko có lỗi->false
            variant="outlined"
            margin="normal"
            label="Mật Khẩu"
            id="matKhau"
            type="password"
            name="matKhau"
            onChange={handleChange}
            defaultValue={values.matKhau}
            onBlur={handleBlur}
            helperText={errors.matKhau}
            required
            fullWidth
          />

          <FormControlLabel
            control={<Checkbox color="primary" value="remeMber" />}
            label="Ghi nhớ đăng nhập"
          />
          {errorLogin && <ErrorUI message={errorLogin.response?.data} />}

          <Button
            className={classes.button}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isNotValid || loadingLogin}
          >
            Đăng Nhập
          </Button>
          <Grid container>
            <Grid xs item>
              <Link className={classes.link} to="#!">
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Link className={classes.link} to="/sign-up">
                Đăng kí ngay!
              </Link>
            </Grid>
          </Grid>

          <Box mt={8}>
            <Copyright />
          </Box>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    errorLogin: state.userLoginReducer.error,
    loadingLogin: state.userLoginReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserLogin: (user, history) => {
      //console.log(history);

      dispatch(actFetchUserLogin(user, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
