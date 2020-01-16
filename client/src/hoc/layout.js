import React from "react";
import Header from "../components/Header_Footer/Header";
import Footer from "../components/Header_Footer/Footer";

const Layout = props => {
  return (
    <React.Fragment>
      <Header />
      {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
