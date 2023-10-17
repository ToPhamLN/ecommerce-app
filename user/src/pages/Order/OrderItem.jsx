import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import { TbDiscountCheckFilled } from "react-icons/tb";
import {
  BiSolidUpArrow,
  BiSolidDownArrow,
} from "react-icons/bi";

const OrderItem = (props) => {
  const { order } = props;
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => {
    setShowAll(!showAll);
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
          <div className="order__item__currentcy">
            <h1>Currentcy: </h1>
            <span>{order.currentcy.toLocaleString()} vnđ</span>
          </div>
          <div className="toggle__more__order">
            <button onClick={toggleShowAll}>
              <span>
                {showAll ? (
                  <BiSolidUpArrow />
                ) : (
                  <BiSolidDownArrow />
                )}
              </span>
            </button>
          </div>
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
                    {order.currentcy.toLocaleString()} vnđ
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
                  <span>{order.username}</span>
                </div>
                <div className="address">
                  <h2>Address: </h2>
                  <span>{order.address}</span>
                </div>
                <div className="email">
                  <h2>Email: </h2>
                  <span>{order.email}</span>
                </div>
                <div className="contact">
                  <h2>Contact: </h2>
                  <span>{order.contact}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};

export default OrderItem;
