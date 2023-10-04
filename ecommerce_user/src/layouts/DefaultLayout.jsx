import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./Navbar";
import Footer from "./Footer";

const DefaultLayout = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <React.Fragment>
      <Navbar user={userInfo} />
      <main className="mainpage">
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default DefaultLayout;
