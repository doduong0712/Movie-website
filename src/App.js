import React, { Suspense, lazy } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HomeRoutes } from "./routes";
// import PageNotFound from "./containers/HOME/PageNotFound";

import HomeTemplate from "./templates/HomeTemplate";
// import AdminTemplate from "./templates/AdminTemplate";
// import Auth from "./containers/ADMIN/Auth";
// import SignUpPage from "./containers/HOME/SignUpPage";
/* import LogInPage from "./containers/HOME/LoginPage";
import PrivateRoute from "./Components/PrivateRoute";
import BookingPage from "./containers/HOME/BookingPage/testIndex";
import ScrollToTop from "./Components/ScrollToTop"; */
import Loading from "./Components/Loading";

//const AdminTemplate = lazy(() => import("./templates/AdminTemplate"));
const SignUpPage = lazy(() => import("./containers/Home/SignUpPage"));
const LoginPage = lazy(() => import("./containers/Home/LoginPage"));
//const Auth = lazy(() => import("./containers/ADMIN/Auth"));
const PageNotFound = lazy(() => import("./containers/Home/PageNotFound"));

function App() {
  const renderRoutesHome = (routes) => {
    return routes.map((route, index) => {
      return (
        <HomeTemplate
          key={index}
          exact={route.exact}
          path={route.path}
          Component={route.component}
        />
      );
    });
  };

  /* const renderRoutesAdmin = (routes) => {
    return routes.map((route, index) => {
      return (
        <AdminTemplate
          key={index}
          exact={route.exact}
          path={route.path}
          Component={route.component}
        />
      );
    });
  }; */

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          {renderRoutesHome(HomeRoutes)}
          {/*  {renderRoutesAdmin(AdminRoutes)} */}

          {/* <PrivateRoute
            exact={true}
            path="/booking/:maLichChieu"
            component={BookingPage}
          />
 */}

          {/* <Route path="/auth" component={Auth} /> */}
          <Route path="/sign-up" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="" component={PageNotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
