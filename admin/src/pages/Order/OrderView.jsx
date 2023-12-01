import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tag } from "antd";
import { TbDiscountCheckFilled } from "react-icons/tb";
import axios from "../../config/axios";
import { orderRequest } from "../../config/apiRequest";
import Loading from "../../components/Loading";
import { formatDate } from "../../utils/format";
import { GiConfirmed } from "react-icons/gi";
import { TbShoppingCartCancel } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

const OrderView = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);

  const handleGetOrder = async () => {
    try {
      const res = await axios.get(
        `${orderRequest.getById}/${orderId}`
      );
      console.log(res.data);
      setOrder(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetOrder();
  }, []);
  return (
    <React.Fragment>
      <div className="order__view__container">
        {loading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <div className="order__item__info">
              <h3>Order information</h3>
              <span className="day">
                {formatDate(order.createdAt)}
              </span>

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
                        to={`/good/${item._id}`}
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
                    <span>{order.username}</span>
                  </div>
                  <div className="email">
                    <h2>Email: </h2>
                    <span>{order.email}</span>
                  </div>
                  <div className="address">
                    <h2> Address: </h2>
                    <span>{order.address}</span>
                  </div>
                  <div className="contact">
                    <h2>Contact: </h2>
                    <span>{order.contact}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order__view__control order__item__info">
              <div
                className="button"
                style={{
                  background: "#1BB11B",
                }}
              >
                <GiConfirmed size={20} />
                Confirmed
              </div>
              <div
                className="button"
                style={{
                  background: "#D13333",
                }}
              >
                <TbShoppingCartCancel size={20} />
                Canceled
              </div>
              <div
                className="button"
                style={{
                  background: "#990F2B",
                }}
              >
                <MdDelete size={20} />
                Delete
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default OrderView;
