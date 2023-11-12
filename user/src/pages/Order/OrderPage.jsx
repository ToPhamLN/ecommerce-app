import React, { useState, useEffect } from "react";
import "../../assets/css/Order.css";
import axios from "../../config/axios";
import { orderRequest } from "../../config/apiRequest";
import OrderItem from "./OrderItem";
import { Pagination, Space } from "antd";
import Loading from "../../components/Loading";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [gtePrice, setGtePrice] = useState(null);
  const [ltePrice, setLtePrice] = useState(null);
  const [sort, setSort] = useState(-1);
  const [status, setStatus] = useState(null);

  const handleGetOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(orderRequest.getAllSell, {
        params: {
          gtePrice: gtePrice,
          ltePrice: ltePrice,
          sort: sort,
          page: page,
          limit: limit,
          status: status,
        },
      });
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetOrders();
  }, [gtePrice, ltePrice, sort, page, limit, status]);

  const onChangePagination = (page, pageSize) => {
    setPage(page);
    setLimit(pageSize);
  };
  return (
    <React.Fragment>
      <aside className="nav__select">
        <div className="nav__select__wrapper">
          <div
            className={`nav__select__item ${
              status === null ? "select" : ""
            }`}
            onClick={() => setStatus(null)}
          >
            All
          </div>
          <div
            className={`nav__select__item ${
              status === "Pending" ? "select" : ""
            }`}
            onClick={() => setStatus("Pending")}
          >
            Pending
          </div>
          <div
            className={`nav__select__item ${
              status === "Confirmed" ? "select" : ""
            }`}
            onClick={() => setStatus("Confirmed")}
          >
            Confirmed
          </div>
          <div
            className={`nav__select__item ${
              status === "Canceled" ? "select" : ""
            }`}
            onClick={() => setStatus("Canceled")}
          >
            Canceled
          </div>
        </div>
      </aside>
      <section className="filters">
        <div className="filters__title">Filters:</div>
        <div className="filters__sort">
          <div className="price__sort sort__item">
            <span>Price: </span>
            <select
              className="select__price"
              onChange={(e) => {
                setGtePrice(e.target.value);
              }}
            >
              <option value={null}></option>
              <option value="0">0</option>
              <option value="2000000">2.000.000</option>
              <option value="5000000">5.000.000</option>
              <option value="10000000">10.000.000</option>
              <option value="20000000">20.000.000</option>
            </select>
            <span>to</span>
            <select
              className="select__price"
              onChange={(e) => setLtePrice(e.target.value)}
            >
              <option value={null}></option>
              <option value="5000000">5.000.000</option>
              <option value="10000000">10.000.000</option>
              <option value="20000000">20.000.000</option>
              <option value="30000000">30.000.000</option>
              <option value="50000000">50.000.000</option>
            </select>
          </div>
          <div
            className="text__sort sort__item"
            onChange={(e) => setSort(e.target.value)}
          >
            <span>Sort:</span>
            <select className="select__sort">
              <option value={undefined}></option>
              <option value={1}>Name A-Z</option>
              <option value={-1}>Name Z-A</option>
            </select>
          </div>
        </div>
      </section>
      <div className="container__order">
        <section className="filters">
          <div className="filters__title">Filters:</div>
          <div className="filters__sort">
            <div className="price__sort sort__item">
              <span>Price: </span>
              <select
                className="select__price"
                onChange={(e) => {
                  setGtePrice(e.target.value);
                }}
              >
                <option value={null}></option>
                <option value="0">0</option>
                <option value="2000000">2.000.000</option>
                <option value="5000000">5.000.000</option>
                <option value="10000000">10.000.000</option>
                <option value="20000000">20.000.000</option>
              </select>
              <span>to</span>
              <select
                className="select__price"
                onChange={(e) => setLtePrice(e.target.value)}
              >
                <option value={null}></option>
                <option value="5000000">5.000.000</option>
                <option value="10000000">10.000.000</option>
                <option value="20000000">20.000.000</option>
                <option value="30000000">30.000.000</option>
                <option value="50000000">50.000.000</option>
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
        <section className="order__wrapper">
          {loading ? (
            <Loading />
          ) : (
            <React.Fragment>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <OrderItem
                    order={order}
                    key={index}
                    reset={handleGetOrders}
                  />
                ))
              ) : (
                <div className="no__data__found">
                  No Order Found!
                </div>
              )}
              <div className="pagination">
                <Space direction="vertical">
                  <Pagination
                    current={page}
                    pageSize={limit}
                    onChange={onChangePagination}
                    total={orders.length + limit}
                  />
                </Space>
              </div>
            </React.Fragment>
          )}
        </section>
      </div>
    </React.Fragment>
  );
};

export default OrderPage;
