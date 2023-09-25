import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const DefaultLayout = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <React.Fragment>
      <Navbar user={userInfo} />
      {userInfo && <Sidebar />}
      <main className="mainpage">
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default DefaultLayout;
