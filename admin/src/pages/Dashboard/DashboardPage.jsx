import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/dashboard.css";
import CurrencyRange from "./CurrencyRange";
import { MdOutlineUnfoldMore } from "react-icons/md";
import StatePayment from "../Chart/StatPayment";
import SelectPeriod from "./SelectPeriod";

const DashboardPage = () => {
  const [statPayment, setStatPayment] = useState("week");
  return (
    <React.Fragment>
      <div className="container__dashboard">
        <div className="layer__dashboard payment">
          <div className="header__payment">
            <h1>Payment</h1>
            <Link to={"/payment"} className="link">
              <MdOutlineUnfoldMore />
              More views
            </Link>
          </div>
          <div className="total__payment">
            <CurrencyRange range={"day"} />
            <CurrencyRange range={"week"} />
            <CurrencyRange range={"month"} />
            <CurrencyRange range={"year"} />
          </div>
          <SelectPeriod setValue={setStatPayment} />
          <div className="chart__payment">
            <StatePayment period={statPayment} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardPage;
