import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const DefaultLayout = () => {
  let user = {
    _id: "650482a847c6d032fdb7ef8c",
    username: "tieu thuan",
    email: "tieuthuan1@gmail.com",
    password:
      "$2b$10$2cLn3K5fm35xztSGfOPUV.RPE/bRgkw7zOxavS7TmWo0ZlUk1Mkxu",
    isAdmin: false,
    slug: "tieu-thuan",
    birthday: "2023-09-15T16:13:22.000Z",
    address: "965/6, Quang Trung",
    createdAt: "2023-09-15T16:13:28.294Z",
    updatedAt: "2023-09-15T16:13:28.294Z",
    __v: 0,
  };
  user = undefined;
  return (
    <React.Fragment>
      <Navbar user={user} />
      <main className="mainpage">
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default DefaultLayout;
