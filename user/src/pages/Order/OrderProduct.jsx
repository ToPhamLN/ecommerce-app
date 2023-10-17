import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import axios from "../../config/axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { Spin } from "antd";
import {
  orderRequest,
  discountRequest,
  cartRequest,
} from "../../config/apiRequest";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../../assets/css/OrderProduct.css";

const OrderProduct = (props) => {
  const {
    setShowOrder,
    product,
    properties,
    quantity,
    totalPrice,
  } = props;
  const { userInfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: userInfo.username,
    email: userInfo.email,
    address: userInfo.address,
    contact: userInfo.contact,
    paymentMethod: "",
  });
  const [discount, setDiscount] = useState({});
  const [code, setCode] = useState("");
  const [currentcy, setCurrentcy] = useState(totalPrice);

  const handleGetDiscount = async () => {
    try {
      const params = {
        code: code,
        condition: totalPrice,
      };
      const res = await axios.get(discountRequest.code, {
        params,
      });
      setDiscount(res.data);
    } catch (error) {
      setDiscount({});
      console.error(error);
    }
  };

  const handlePurchase = async () => {
    let order = [];
    setLoading(true);
    if (discount._id) {
      try {
        await axios.put(
          `${discountRequest.usecode}/${discount._id}`
        );
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message, {
          autoClose: 1000,
        });
        return;
      }
    }
    try {
      const formData = {};
      formData.product = product._id;
      formData.properties = properties;
      formData.quantity = quantity;
      formData.unitPrice = product.price * quantity;
      formData.status = "Processing";
      const res = await axios.post(cartRequest.create, formData);
      order.push(res.data.cart._id);
    } catch (error) {
      const message =
        error.response.data?.message || error.response.data;
      toast.error(message, {
        autoClose: 1000,
      });
      return;
    }
    try {
      form.order = order;
      form.totalPrice = totalPrice;
      form.discount = discount._id;
      form.currentcy = currentcy;
      const res = await axios.post(orderRequest.create, form);
      toast.success(res.data?.message, {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/order");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message, {
        autoClose: 1000,
      });
      return;
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlePaymentChange = (e) => {
    setForm({
      ...form,
      paymentMethod: e.target.value,
    });
  };
  useEffect(() => {
    if (discount.valid) {
      setCurrentcy(discount.valid * totalPrice);
    } else {
      setCurrentcy(totalPrice);
    }
  }, [discount, totalPrice]);

  return (
    <React.Fragment>
      <div className="container__order__product">
        <div className="header__order__product">
          <button
            className="exit__orderinfo"
            onClick={() => setShowOrder((prev) => !prev)}
          >
            <AiOutlineCloseCircle />
          </button>
          <h2>My Infomation</h2>
        </div>
        <div className="input__box">
          <label htmlFor="username">User name: </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="input__box">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="input__box">
          <label htmlFor="contact">Contact: </label>
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleInputChange}
          />
        </div>
        <div className="input__box">
          <label htmlFor="address">Address: </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="cart__information">
          <div className="tag__product">
            <Tag className="tag__item">
              {product.category?.name}
            </Tag>
            <Tag className="tag__item">
              {product.brand?.name}
            </Tag>
            {Object.keys(properties).map((p, i) => (
              <Tag className="tag__item" key={i}>
                {properties[p]}
              </Tag>
            ))}
          </div>
          <div className="input__box">
            <label className="discount_btn">Discount: </label>
            <input
              name="code"
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              className="discount__btn order__product"
              onClick={() => handleGetDiscount()}
            >
              Oke
            </button>
          </div>
          {discount.valid && (
            <div className="discount__wrapper">
              <TbDiscountCheckFilled className="icon" />
              <span>{discount.name}</span>
            </div>
          )}
          <div className="totalprice">
            {currentcy.toLocaleString()} vnđ
          </div>
        </div>

        <div className="payment__methods order__product">
          <h3>Payment: </h3>
          <div className="payment__methods__list">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={form.paymentMethod === "cash"}
                onChange={handlePaymentChange}
              />
              By cash
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={form.paymentMethod === "card"}
                onChange={handlePaymentChange}
              />
              By credit card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="e-wallet"
                checked={form.paymentMethod === "e-wallet"}
                onChange={handlePaymentChange}
              />
              By E-wallet
            </label>
          </div>
        </div>
        <button
          className="confirm__order"
          type="submit"
          onClick={() => handlePurchase()}
        >
          {loading ? <Spin /> : "Oke"}
        </button>
      </div>
    </React.Fragment>
  );
};

OrderProduct.propTypes = {
  setShowOrder: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  properties: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};
export default OrderProduct;
