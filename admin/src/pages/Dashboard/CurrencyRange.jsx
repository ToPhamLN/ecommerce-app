import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "../../config/axios";
import { Spin } from "antd";
import { orderRequest } from "../../config/apiRequest";
import { BsCalendarWeek } from "react-icons/bs";

const CurrencyRange = (props) => {
  const { range } = props;
  const [totalRange, setTotalRange] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleGetRange = async () => {
    try {
      const res = await axios.get(
        orderRequest.currency + "/" + range
      );
      setTotalRange(res.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetRange();
  }, []);
  return (
    <React.Fragment>
      <div className="total__payment__item">
        <div className="conntent">
          {loading ? (
            <Spin size="large" />
          ) : (
            <>
              <BsCalendarWeek />
              <span>{totalRange.toLocaleString()} vnđ</span>
            </>
          )}
        </div>
        {range === "day" ? (
          <div className="footer">Today</div>
        ) : (
          <div className="footer">This {range}</div>
        )}
      </div>
    </React.Fragment>
  );
};

CurrencyRange.propTypes = {
  range: PropTypes.string,
};

export default CurrencyRange;
