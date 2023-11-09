import { Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { orderRequest } from "../../config/apiRequest";
import { formatDate } from "../../utils/format";

const PaymentPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gtePrice, setGtePrice] = useState(null);
  const [ltePrice, setLtePrice] = useState(null);
  const [gteDate, setGteDate] = useState(null);
  const [lteDate, setLteDate] = useState(null);
  const [sort, setSort] = useState(-1);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      align: "center",
      width: 100,
      render: (_, order) => <span>{order._id}</span>,
    },
    {
      title: "Order Cart",
      dataIndex: "order",
      render: (_, order) => (
        <div className="properties__container__table">
          {order.order.length === 0 ? (
            <span
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              Information has been deleted
            </span>
          ) : (
            order.order.map((o, i) => (
              <Link key={i} to={`/goods/${o._id}`}>
                <Tag color="rgb(90, 141, 220)">
                  {o.product.name}
                </Tag>
              </Link>
            ))
          )}
        </div>
      ),
    },
    {
      title: "User",
      dataIndex: "user",
      width: 100,
      render: (_, order) => (
        <div
          className="properties__container__table"
          style={{
            fontWeight: "500",
            fontStyle: "italic",
            textTransform: "none",
          }}
        >
          <Link>{order.username}</Link>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      align: "center",
      width: 100,
      render: (_, order) => (
        <span>{formatDate(order.createdAt)}</span>
      ),

      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",

      width: 100,
      align: "center",
      render: (_, order) => (
        <span>{order.totalPrice.toLocaleString()} </span>
      ),
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Discount",
      dataIndex: "discount",

      width: 100,
      align: "center",
      render: (_, order) => {
        return (
          order.discount && (
            <Link to={`/discount/${order.discount._id}`}>
              {order?.discount.name}
            </Link>
          )
        );
      },
      sorter: (a, b) =>
        a.order.discount.name - b.order.discount.name,
    },
    {
      title: "Currency",
      dataIndex: "currency",

      width: 150,
      align: "center",
      render: (_, order) => (
        <span>{order.currency.toLocaleString()} </span>
      ),
      sorter: (a, b) => a.currency - b.currency,
    },
  ];

  const handleGetOrders = async () => {
    try {
      const res = await axios.get(orderRequest.getAllSell, {
        params: {
          gtePrice: gtePrice,
          ltePrice: ltePrice,
          lteDate: lteDate,
          gteDate: gteDate,
          sort: sort,
          status: "Confirmed",
        },
      });
      console.log(res.data);
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetOrders();
  }, [gtePrice, ltePrice, gteDate, lteDate, sort, status]);

  return (
    <React.Fragment>
      <div
        className="container__order"
        style={{ margin: "10rem 3rem 0 9rem" }}
      >
        <section className="filters">
          <div className="filters__title">Filters:</div>
          <div className="filters__sort">
            <div className="date__sort sort__item">
              <span>Date: </span>
              <input
                type="date"
                name=""
                id=""
                onChange={(e) => setGteDate(e.target.value)}
                placeholder="From"
              />
              <span> to </span>
              <input
                type="date"
                name=""
                id=""
                onChange={(e) => setLteDate(e.target.value)}
                placeholder="From"
              />
            </div>
            <div className="price__sort sort__item">
              <span>Price: </span>
              <select
                className="select__price"
                onChange={(e) => {
                  setGtePrice(e.target.value);
                }}
              >
                <option value={null}></option>
                <option value={0}>0</option>
                <option value={2000000}>2.000.000</option>
                <option value={5000000}>5.000.000</option>
                <option value={10000000}>10.000.000</option>
                <option value={20000000}>20.000.000</option>
              </select>
              <span>to</span>
              <select
                className="select__price"
                onChange={(e) => setLtePrice(e.target.value)}
              >
                <option value={null}></option>
                <option value={5000000}>5.000.000</option>
                <option value={10000000}>10.000.000</option>
                <option value={20000000}>20.000.000</option>
                <option value={30000000}>30.000.000</option>
                <option value={50000000}>50.000.000</option>
              </select>
            </div>
            <div
              className="text__sort sort__item"
              onChange={(e) => setSort(e.target.value)}
            >
              <span>Sort:</span>
              <select className="select__sort">
                <option value={-1}>Latest update</option>
                <option value={1}>Oldest update</option>
              </select>
            </div>
          </div>
        </section>
        <section className="ctn__all__order">
          {loading ? (
            <Loading />
          ) : (
            <Table
              dataSource={orders}
              columns={columns}
              rowKey="_id"
            />
          )}
        </section>
      </div>
    </React.Fragment>
  );
};

export default PaymentPage;
