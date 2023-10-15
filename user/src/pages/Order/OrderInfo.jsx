import React from "react";
import { FaRegCreditCard } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import PropTypes from "prop-types";
import "../../assets/css/OrderInfo.css";
import OrderUser from "./OrderUser";
import OrderCart from "./OrderCart";
import { useState } from "react";

const OrderInfo = (props) => {
  const { carts, orders, totalPrice, setShowOrderInfo } = props;
  const [discount, setDiscount] = useState({});
  const [currentcy, setCurrentcy] = useState(totalPrice);
  const filteredCart = carts.filter((item) =>
    orders.includes(item._id)
  );
  return (
    <React.Fragment>
      <div className="container__orderinfo">
        <div className="orderinfo__header">
          <button
            className="exit__orderinfo"
            onClick={() => setShowOrderInfo(false)}
          >
            <AiOutlineCloseCircle />
          </button>
          <div className="orders__titles">
            <span className="icon">
              <FaRegCreditCard />
            </span>
          </div>
          <div></div>
        </div>
        <section className="orderinfo__wrapper">
          <OrderUser
            orders={orders}
            totalPrice={totalPrice}
            discount={discount}
            currentcy={currentcy}
          />
          <OrderCart
            filteredCart={filteredCart}
            totalPrice={totalPrice}
            setDiscount={setDiscount}
            discount={discount}
            setCurrentcy={setCurrentcy}
            currentcy={currentcy}
          />
        </section>
      </div>
    </React.Fragment>
  );
};

OrderInfo.propTypes = {
  carts: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired,
  totalPrice: PropTypes.number.isRequired,
  setShowOrderInfo: PropTypes.func,
};

export default OrderInfo;
