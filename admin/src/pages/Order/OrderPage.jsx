import { Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidTrashAlt } from "react-icons/bi";
import { TbEyeSearch } from "react-icons/tb";
import { useNavigate, Link } from "react-router-dom";
import Deletion from "../../components/Deletion";
import Loading from "../../components/Loading";
import { orderRequest } from "../../config/apiRequest";
import { formatDate } from "../../utils/format";
import { toast } from "react-toastify";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [gtePrice, setGtePrice] = useState(null);
  const [ltePrice, setLtePrice] = useState(null);
  const [gteDate, setGteDate] = useState(null);
  const [lteDate, setLteDate] = useState(null);
  const [sort, setSort] = useState(-1);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

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
                <span color="rgb(90, 141, 220)">
                  {o.product.name}
                </span>
              </Link>
            ))
          )}
        </div>
      ),
    },
    {
      title: " Order User",
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
          <span>{order.email}</span>
          <span>{order.address}</span>
          <span>{order.contact}</span>
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
      title: "Currency",
      dataIndex: "currency",

      width: 100,
      align: "center",
      render: (_, order) => (
        <span>{order.currency.toLocaleString()} </span>
      ),
      sorter: (a, b) => a.currency - b.currency,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (_, order) => {
        let tagColor;
        switch (order.status) {
          case "Pending":
            tagColor = "#A9B916";
            break;
          case "Confirmed":
            tagColor = "#187E1B";
            break;
          case "Canceled":
            tagColor = "#A71616";
            break;
          default:
            tagColor = "#888888";
            break;
        }

        return (
          <span style={{ color: tagColor, fontWeight: "bold" }}>
            {order.status}
          </span>
        );
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Action",
      width: 150,
      align: "center",
      render: (_, order) => {
        let status = {};
        switch (order.status) {
          case "Pending":
            status.change = "Confirmed";
            status.color = "#187E1B";
            break;
          case "Confirmed":
            status.change = "Canceled";
            status.color = "#A71616";
            break;
          default:
            status.change = null;
            status.color = "#A9B916";
            break;
        }
        return (
          <Space className="table__box">
            <button
              className="action__table change"
              onClick={() =>
                handleUpdate(order._id, status.change)
              }
              style={{
                backgroundColor: status.color,
                color: "white",
              }}
            >
              <span>{status.change} </span>
            </button>
            {order.status == "Canceled" ? null : (
              <button
                className="action__table change"
                onClick={() =>
                  handleUpdate(order._id, "Canceled")
                }
                style={{
                  backgroundColor: "#A71616",
                  color: "white",
                }}
              >
                <span>Canceled</span>
              </button>
            )}
            <span className="action__table view">
              <TbEyeSearch />
            </span>
            <span
              className="action__table delete"
              onClick={() => handleDelete(order._id)}
            >
              <BiSolidTrashAlt />
            </span>
          </Space>
        );
      },
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
    console.log(gteDate, lteDate);
  }, [gtePrice, ltePrice, gteDate, lteDate, sort, status]);

  const handleDelete = async (orderId) => {
    setSelectedOrder(orderId);
    setShowDelete(!showDelete);
  };

  const handleUpdate = async (orderId, status) => {
    try {
      setLoading(true);
      const res = await axios.put(
        orderRequest.update + `/${orderId}`,
        {
          status,
        }
      );
      toast.success(res.data?.message, {
        autoClose: 1000,
      });
      handleGetOrders();
    } catch (error) {
      toast.error(error.response.data.message, 1000);
    } finally {
      setLoading(false);
    }
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
      <div className="container__order">
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
              // pagination={false}
            />
          )}
        </section>
      </div>

      {showDelete && (
        <Deletion
          data={showDelete}
          setData={setShowDelete}
          api={`${orderRequest.delete}/${selectedOrder}`}
          reset={handleGetOrders}
        />
      )}
    </React.Fragment>
  );
};

export default OrderPage;
