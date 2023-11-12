import React, { useState, useEffect } from "react";
import { Pagination, Space } from "antd";
import Loading from "../../components/Loading";
import "../../assets/css/Goods.css";
import GoodsItem from "./GoodsItem";
import axios from "../../config/axios";
import { cartRequest } from "../../config/apiRequest";

const GoodsPage = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState(null);
  const [gtePrice, setGtePrice] = useState(null);
  const [ltePrice, setLtePrice] = useState(null);
  const [sort, setSort] = useState(-1);

  const handleGetCarts = async () => {
    const statusForm =
      status === null ? { $ne: "Not_Processed" } : status;

    try {
      setLoading(true);
      const res = await axios.get(cartRequest.getAll, {
        params: {
          status: statusForm,
          page,
          limit,
          gtePrice,
          ltePrice,
          sort,
        },
      });
      setCarts(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetCarts();
  }, [page, limit, status, gtePrice, ltePrice, sort]);

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
              status === "Processing" ? "select" : ""
            }`}
            onClick={() => setStatus("Processing")}
          >
            Processing
          </div>
          <div
            className={`nav__select__item ${
              status === "Shipped" ? "select" : ""
            }`}
            onClick={() => setStatus("Shipped")}
          >
            Shipped
          </div>
          <div
            className={`nav__select__item ${
              status === "Delivered" ? "select" : ""
            }`}
            onClick={() => setStatus("Delivered")}
          >
            Delivered
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

      <div className="container__goods">
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
        <section className="goods__wrapper">
          {loading ? (
            <Loading />
          ) : carts.length > 0 ? (
            carts.map((cart, index) => (
              <GoodsItem
                key={index}
                cart={cart}
                reset={handleGetCarts}
              />
            ))
          ) : (
            <div className="no__data__found">No Good Found!</div>
          )}

          <div className="pagination">
            <Space direction="vertical">
              <Pagination
                current={page}
                pageSize={limit}
                onChange={onChangePagination}
                total={carts.length + limit}
              />
            </Space>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default GoodsPage;
