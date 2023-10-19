import React from "react";
import "../../assets/css/dashboard.css";
import CurrentcyRange from "./CurrentcyRange";

const DashboardPage = () => {
  return (
    <React.Fragment>
      <div className="container__dashboard">
        <div className="layer__dashboard total__payment">
          <CurrentcyRange range={"day"} />
          <CurrentcyRange range={"week"} />
          <CurrentcyRange range={"month"} />
          <CurrentcyRange range={"year"} />
        </div>
        <div className="layer__dashboard payment">
          <div className="chart__payment"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardPage;
