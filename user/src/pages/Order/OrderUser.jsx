import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import axios from "../../config/axios";
import {
  orderRequest,
  discountRequest,
  cartRequest,
} from "../../config/apiRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Loading from "../../components/Loading";

const OrderUser = (props) => {
  const { orders, totalPrice, discount, currency } = props;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      form.order = orders;
      form.totalPrice = totalPrice;
      form.discount = discount._id;
      form.currency = currency;
      console.log(form);
      const res = await axios.post(orderRequest.create, form);
      toast.success(res.data?.message, {
        autoClose: 1000,
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message, {
        autoClose: 1000,
      });
    }
    for (const cartId of orders) {
      try {
        await axios.put(`${cartRequest.updateCart}/${cartId}`, {
          status: "Processing",
        });
      } catch (error) {
        console.log(error);
      }
    }
    setTimeout(() => {
      navigate("/order");
    }, 2000);
    setLoading(false);
  };

  return (
    <React.Fragment>
      <section className="orderinfo__action">
        <form className="order__fill" onSubmit={handleSubmit}>
          <h2>My information</h2>
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

          <div className="payment__methods">
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
          <button className="confirm__order" type="submit">
            Oke
          </button>
        </form>
      </section>
      {loading && <Loading />}
    </React.Fragment>
  );
};

OrderUser.propTypes = {
  orders: PropTypes.array.isRequired,
  totalPrice: PropTypes.number.isRequired,
  discount: PropTypes.object,
  currency: PropTypes.number.isRequired,
};

export default OrderUser;
