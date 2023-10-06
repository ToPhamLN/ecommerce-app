import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const DefaultLayout = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <React.Fragment>
      <ScrollToTop />
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
