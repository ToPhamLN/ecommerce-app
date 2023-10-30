import React from "react";
import { Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";

import DefaultLayout from "./layouts/DefaultLayout.jsx";
import { publicRoutes, privateRoutes } from "./config/routes.js";
import NotFound from "./components/NotFound";
import LoginPage from "./pages/Login/LoginPage";

const App = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={<Page />}
              ></Route>
            );
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={userInfo ? <Page /> : <LoginPage />}
              ></Route>
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
