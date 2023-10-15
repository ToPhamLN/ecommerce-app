import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { TbDiscountCheckFilled } from "react-icons/tb";
import axios from "../../config/axios";
import { useState } from "react";
import { discountRequest } from "../../config/apiRequest";

const OrderCart = (props) => {
  const {
    filteredCart,
    totalPrice,
    setDiscount,
    discount,
    currentcy,
    setCurrentcy,
  } = props;
  const [code, setCode] = useState("");
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
  useEffect(() => {
    if (discount.valid) {
      setCurrentcy(discount.valid * totalPrice);
    } else {
      setCurrentcy(totalPrice);
    }
  }, [discount, totalPrice]);

  return (
    <React.Fragment>
      <section className="orders__infomation">
        <div className="orders__infomation__wrapper">
          <h2>Cart</h2>
          <div className="orders__list">
            {filteredCart.map((cart, index) => (
              <div className="orders__item" key={index}>
                <div className="order__cart__name">
                  {cart.product.name}
                </div>
                <div className="order_catulate__cart">
                  <div className="order__cart__quantity">
                    <span className="product__price">
                      {cart.quantity}
                    </span>
                    <span>X</span>
                    <span className="quantity">
                      {cart.product.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="unitprice">
                    {cart.unitPrice.toLocaleString()} vnđ
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
          <div className="input__box">
            <label className="discount_btn">Discount: </label>
            <input
              name="code"
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              className="discount__btn"
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
          <div className="order__discount"></div>
          <div className="totalprice">
            <span className="totalprice">
              {currentcy.toLocaleString()} vnđ
            </span>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

OrderCart.propTypes = {
  filteredCart: PropTypes.array.isRequired,
  totalPrice: PropTypes.number.isRequired,
  setDiscount: PropTypes.func.isRequired,
  discount: PropTypes.object,
  currentcy: PropTypes.number.isRequired,
  setCurrentcy: PropTypes.func.isRequired,
};

export default OrderCart;
