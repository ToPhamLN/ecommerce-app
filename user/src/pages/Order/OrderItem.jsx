import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Tag } from "antd";
import { TbDiscountCheckFilled } from "react-icons/tb";
import {
  BiSolidUpArrow,
  BiSolidDownArrow,
} from "react-icons/bi";
import axios from "../../config/axios";
import { orderRequest } from "../../config/apiRequest";
import { toast } from "react-toastify";
import Deletion from "../../components/Deletion";
import { Spin } from "antd";
import { formatDate } from "../../utils/format";

const OrderItem = (props) => {
  const { order, reset } = props;
  const [showAll, setShowAll] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: order.username,
    email: order.email,
    contact: order.contact,
    address: order.address,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleEditOrder = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        orderRequest.update + `/${order._id}`,
        {
          ...userInfo,
        }
      );
      toast.success(res.data?.message, {
        autoClose: 1000,
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
    setEdit((p) => !p);
  };

  const handleReset = () => {
    reset();
    setShowAll((p) => !p);
  };

  return (
    <React.Fragment>
      <div className="order__item">
        <div className="order__item__primary">
          <div className="order__item__id">
            <h1>ID:</h1>
            <span>{order._id}</span>
          </div>
          <div className="order__item__status">
            <h1>Status: </h1>
            <span>{order.status}</span>
          </div>
          <div className="order__item__currency">
            <h1>Currency: </h1>
            <span>{order.currency.toLocaleString()} vnđ</span>
          </div>
          <div className="toggle__more__order">
            <button onClick={() => setShowAll(!showAll)}>
              <span>
                {showAll ? (
                  <BiSolidUpArrow />
                ) : (
                  <BiSolidDownArrow />
                )}
              </span>
            </button>
          </div>
          <span className="order__item__day">
            {formatDate(order.createdAt)}
          </span>
        </div>
        {showAll && (
          <div className="order__item__info">
            <h3>Order information</h3>

            <div className="order__item__info__wrapper">
              <div className="order__item__info__cart">
                <h1>Product Information</h1>
                {order.order.map((item, index) => (
                  <div
                    className="orders__item__info"
                    key={index}
                  >
                    <Link
                      className="order__info__cart__name"
                      to={`/goods/${item._id}`}
                    >
                      {item.product.name}
                    </Link>
                    <div className="order__info__cart__propeties">
                      <Tag>{item.product.category.name}</Tag>
                      <Tag>{item.product.brand.name}</Tag>
                      {Object.keys(item.properties).map(
                        (property, index) => (
                          <Tag
                            key={index}
                            style={{
                              textTransform: "capitalize",
                            }}
                            color="#5A8DDC"
                          >
                            {property +
                              ": " +
                              item.properties[property]}
                          </Tag>
                        )
                      )}
                    </div>
                    <div className="order__info__catulate__cart">
                      <div className="order__info__cart__quantity">
                        <span className="product__price">
                          {item.product.price.toLocaleString()}
                        </span>
                        <span>X</span>
                        <span className="quantity">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="unitprice__order__info">
                        {item.unitPrice.toLocaleString()} vnđ
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
                {order.discount && (
                  <div className="discount__wrapper">
                    <TbDiscountCheckFilled className="icon" />
                    <span>{order.discount.name}</span>
                  </div>
                )}
                <div className="totalprice">
                  <span className="totalprice">
                    {order.currency.toLocaleString()} vnđ
                  </span>
                </div>
                <div className="order__info__payment">
                  <h2>Payment by:</h2>
                  <span
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {order.paymentMethod}
                  </span>
                </div>
              </div>
              <div className="order__item__info__user">
                <h1>User Information</h1>
                <div className="username">
                  <h2>Username: </h2>
                  {edit ? (
                    <input
                      type="text"
                      name="username"
                      value={userInfo.username}
                      onChange={(e) => handleInputChange(e)}
                    />
                  ) : (
                    <span>{userInfo.username}</span>
                  )}
                </div>
                <div className="email">
                  <h2>Email: </h2>
                  {edit ? (
                    <input
                      type="text"
                      name="email"
                      value={userInfo.email}
                      onChange={(e) => handleInputChange(e)}
                    />
                  ) : (
                    <span>{userInfo.email}</span>
                  )}
                </div>
                <div className="address">
                  <h2> Address: </h2>
                  {edit ? (
                    <input
                      type="text"
                      name="address"
                      value={userInfo.address}
                      onChange={(e) => handleInputChange(e)}
                    />
                  ) : (
                    <span>{userInfo.address}</span>
                  )}
                </div>
                <div className="contact">
                  <h2>Contact: </h2>
                  {edit ? (
                    <input
                      type="text"
                      name="contact"
                      value={userInfo.contact}
                      onChange={(e) => handleInputChange(e)}
                    />
                  ) : (
                    <span>{userInfo.contact}</span>
                  )}
                </div>
                {(order.status === "Pending" ||
                  order.status === "Canceled") && (
                  <div className="order__item__info__control">
                    {edit ? (
                      <button
                        className="submit"
                        onClick={() => handleEditOrder()}
                      >
                        <AiFillEdit />
                        Oke
                      </button>
                    ) : (
                      <button
                        className="edit"
                        onClick={() => setEdit((p) => !p)}
                      >
                        {loading ? (
                          <Spin size="large" />
                        ) : (
                          <React.Fragment>
                            <AiFillEdit />
                            Edit
                          </React.Fragment>
                        )}
                      </button>
                    )}
                    <button
                      className="delete"
                      onClick={() => setShowDelete(!showDelete)}
                    >
                      <AiFillDelete />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {showDelete && (
        <Deletion
          data={showDelete}
          setData={setShowDelete}
          api={`${orderRequest.delete}/${order._id}`}
          reset={handleReset}
        />
      )}
    </React.Fragment>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
};

export default OrderItem;
