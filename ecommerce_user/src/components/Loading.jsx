import React from "react";
import "../assets/css/Loading.css";
const Loading = () => {
  return (
    <React.Fragment>
      <div className="container__loading">
        <div className="loader">
          <div className="loader__inner"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Loading;
