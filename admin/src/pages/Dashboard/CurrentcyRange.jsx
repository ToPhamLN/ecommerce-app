import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "../../config/axios";
import { Spin } from "antd";
import { orderRequest } from "../../config/apiRequest";

const CurrentcyRange = (props) => {
  const { range } = props;
  const [totalRange, setTotalRange] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleGetRange = async () => {
    try {
      const res = await axios.get(
        orderRequest.currentcy + "/" + range
      );
      console.log(res.data);
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
        {loading ? (
          <Spin size="large" />
        ) : (
          <React.Fragment>
            {range == "day" ? (
              <h1>Today</h1>
            ) : (
              <h1>This {range}</h1>
            )}
            <h2>{totalRange.toLocaleString()} vnđ</h2>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

CurrentcyRange.propTypes = {
  range: PropTypes.string,
};

export default CurrentcyRange;
