import React from "react";
import { Route } from "react-router-dom";
import HeaderNavbar from "../Components/HeaderNabar";
import Footer from "../Components/Footer";

function HomeLayout(props) {
  return (
    <>
      <HeaderNavbar />
      {props.children}
      <Footer />
    </>
  );
}
export default function HomeTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsOfComponent) => (
        <HomeLayout>
          <Component {...propsOfComponent} />
        </HomeLayout>
      )}
    />
  );
}
