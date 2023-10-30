import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "../../config/axios";
import { Spin } from "antd";
import { orderRequest } from "../../config/apiRequest";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    _id: {
      month: 1,
      year: 2023,
    },
    totalOrders: 3,
    totalCurrency: 82047000,
  },
  {
    _id: {
      month: 2,
      year: 2023,
    },
    totalOrders: 3,
    totalCurrency: 82047000,
  },
  {
    _id: {
      month: 3,
      year: 2023,
    },
    totalOrders: 3,
    totalCurrency: 82047000,
  },
  {
    _id: {
      month: 4,
      year: 2023,
    },
    totalOrders: 3,
    totalCurrency: 82047000,
  },
  {
    _id: {
      month: 5,
      year: 2023,
    },
    totalOrders: 3,
    totalCurrency: 82047000,
  },
  {
    _id: {
      month: 6,
      year: 2023,
    },
    totalOrders: 3,
    totalCurrency: 82047000,
  },
  {
    _id: {
      month: 7,
      year: 2023,
    },
    totalOrders: 3,
    totalCurrency: 82047000,
  },
  {
    _id: {
      month: 8,
      year: 2023,
    },
    totalOrders: 3,
    totalCurrency: 82047000,
  },
  {
    _id: {
      month: 9,
      year: 2023,
    },
    totalOrders: 3,
    totalCurrency: 82047000,
  },
  {
    _id: {
      month: 10,
      year: 2023,
    },
    totalOrders: 3,
    totalCurrency: 82047000,
  },
];

const StatePayment = (props) => {
  const { period } = props;
  const [stat, setStat] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetState = async () => {
    try {
      const res = await axios.get(
        orderRequest.stats + "/" + period
      );
      setStat(res.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetState();
  }, [period]);

  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          height: 300,
          position: "relative",
        }}
      >
        {loading ? (
          <Spin
            size="large"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="_id.month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="totalCurrency"
                fill="#8884d8"
                stroke="#8884d8"
                yAxisId="left"
              />
              <Bar
                dataKey="totalOrders"
                barSize={20}
                fill="#413ea0"
                yAxisId="right"
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </React.Fragment>
  );
};

StatePayment.propTypes = {
  period: PropTypes.string,
};

export default StatePayment;
