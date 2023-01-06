import React from "react";
import Box from "@material-ui/core/Box";
import { Route, Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { USER_KEY } from "../constants/config";
import SideBar from "../containers/Admin/Sidebar";
import useAdminStyles from "../style/useAdminStyle";
import Copyright from "../Components/Copyright";

function AdminLayout(props) {
  const classes = useAdminStyles();

  return (
    <div className={classes.root}>
      <SideBar classes={classes} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {props.children}

        {/* <Container maxWidth="lg" className={classes.container}>
          {page title}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {props.children}
              </Paper>
            </Grid>
          </Grid>
        </Container> */}

        <Container maxWidth="lg" className={classes.container}>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default function AdminTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsComponent) => {
        const user = localStorage.getItem(USER_KEY);
        if (user && JSON.parse(user).maLoaiNguoiDung === "QuanTri") {
          return (
            <AdminLayout>
              <Component {...propsComponent} />
            </AdminLayout>
          );
        } else {
          return <Redirect to="/auth" />;
        }
      }}
    />
  );
}
