import React from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import NotFound from "./components/NotFound";

import DefaultLayout from "./layouts/DefaultLayout.jsx";
import { publicRoutes, privateRoutes } from "./config/routes.js";

const App = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
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
                  element={<Page />}
                ></Route>
              );
            })}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Provider>
    </React.Fragment>
  );
};

export default App;
