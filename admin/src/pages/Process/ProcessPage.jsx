import { Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidTrashAlt } from "react-icons/bi";
import { TbEyeSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import "../../assets/css/Order.css";
import Deletion from "../../components/Deletion";
import Loading from "../../components/Loading";
import {
  cartRequest,
  notificationsRequest,
} from "../../config/apiRequest";

const ProcessPage = () => {
  const [carts, setCarts] = useState([]);
  const [selectedCart, setSelectedCart] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [gtePrice, setGtePrice] = useState(null);
  const [ltePrice, setLtePrice] = useState(null);
  const [sort, setSort] = useState(-1);
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      align: "center",
      render: (_, cart) => <span>{cart._id}</span>,
    },
    {
      title: "Picture",
      dataIndex: "picturePath",
      width: 100,
      align: "center",
      render: (_, cart) => (
        <img src={cart.product.pictures[0].path} alt="" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      width: "100",
      render: (_, cart) => (
        <Link to={`/products/${cart.product._id}`}>
          {cart.product.name}
        </Link>
      ),

      sorter: (a, b) =>
        a.product.name.localeCompare(b.product.name),
    },
    {
      title: "Properties",
      dataIndex: "Properties",
      align: "center",
      width: "10",
      render: (_, cart) => (
        <div className="properties__container__table">
          {Object.keys(cart.properties).map((p, i) => (
            <Tag key={i} color="#5A8DDC">
              {p + ": " + cart.properties[p]}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: 100,
      align: "center",
      render: (_, cart) => (
        <span>{cart.quantity.toLocaleString()} </span>
      ),
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      width: 100,
      align: "center",
      render: (_, cart) => (
        <span>{cart.unitPrice.toLocaleString()}</span>
      ),
      sorter: (a, b) => a.unitPrice - b.unitPrice,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (_, cart) => {
        let tagColor;
        switch (cart.status) {
          case "Processing":
            tagColor = "#A9B916";
            break;
          case "Shipped":
            tagColor = "#136079";
            break;
          case "Delivered":
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
            {cart.status}
          </span>
        );
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Action",
      align: "center",
      render: (_, cart) => {
        let status = {};
        switch (cart.status) {
          case "Processing":
            status.change = "Shipped";
            status.color = "#136079";
            break;
          case "Shipped":
            status.change = "Delivered";
            status.color = "#187E1B";
            break;
          case "Delivered":
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
                handleUpdate(
                  cart._id,
                  status.change,
                  cart.user._id
                )
              }
              style={{
                backgroundColor: status.color,
                color: "white",
              }}
            >
              <span>{status.change} </span>
            </button>
            {cart.status == "Canceled" ? null : (
              <button
                className="action__table change"
                onClick={() =>
                  handleUpdate(
                    cart._id,
                    "Canceled",
                    cart.user._id
                  )
                }
                style={{
                  backgroundColor: "#A71616",
                  color: "white",
                }}
              >
                <span>Canceled</span>
              </button>
            )}
            <span
              className="action__table view"
              onClick={() => handleView(cart._id)}
            >
              <TbEyeSearch />
            </span>
            <span
              className="action__table delete"
              onClick={() => handleDelete(cart._id)}
            >
              <BiSolidTrashAlt />
            </span>
          </Space>
        );
      },
    },
  ];

  const handleGetCarts = async () => {
    const statusForm =
      status === null ? { $ne: "Not_Processed" } : status;

    try {
      const res = await axios.get(cartRequest.getAll, {
        params: {
          status: statusForm,
          gtePrice,
          ltePrice,
          sort,
        },
      });
      setCarts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetCarts();
  }, [showDelete, status, gtePrice, ltePrice, sort]);

  const handleView = (cartId) => {
    navigate(`/goods/${cartId}`);
  };
  const handleDelete = async (cartId) => {
    setSelectedCart(cartId);
    setShowDelete(!showDelete);
  };

  const handleUpdate = async (cartId, status, userId) => {
    try {
      const res = await axios.put(
        cartRequest.updateCart + "/" + cartId,
        { status }
      );
      toast.success(res.data.message, { autoClose: 1000 });
      handleGetCarts();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        autoClose: 1000,
      });
    }
    try {
      await axios.post(notificationsRequest.create, {
        description: `Your goods: ${cartId} ${status} `,
        path: `goods/${cartId}`,
        user: userId,
      });
    } catch (error) {
      console.error(error);
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
              dataSource={carts}
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
          api={`${cartRequest.delete}/${selectedCart}`}
          reset={handleGetCarts}
        />
      )}
    </React.Fragment>
  );
};

export default ProcessPage;
