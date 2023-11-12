import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import axios from "../../config/axios";
import { cartRequest } from "../../config/apiRequest";
import "../../assets/css/Cart.css";
import CartItem from "./CartItem";
import OrderInfo from "../Order/OrderInfo";

const CartPage = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderInfo, setShowOrderInfo] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleGetCarts = async () => {
    try {
      const res = await axios.get(cartRequest.getAll, {
        params: {
          status: "Not_Processed",
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
  }, []);

  useEffect(() => {
    let total = 0;
    carts.forEach((cart) => {
      if (orders.includes(cart._id)) {
        total += cart.unitPrice;
      }
    });
    setTotalPrice(total);
  }, [orders, carts]);

  const handleOrder = () => {
    setShowOrderInfo(true);
  };
  const handleSelectCart = (id) => {
    setOrders((prevOrders) => {
      if (prevOrders.includes(id)) {
        return prevOrders.filter((item) => item !== id);
      } else {
        return [...prevOrders, id];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);

    if (!selectAll) {
      setOrders(carts.map((cart) => cart._id));
    } else {
      setOrders([]);
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : showOrderInfo ? (
        <OrderInfo
          carts={carts}
          orders={orders}
          totalPrice={totalPrice}
          setShowOrderInfo={setShowOrderInfo}
        />
      ) : (
        <div className="container__cart">
          <section className="list__cart">
            <div className="header__list__cart">
              <span>price</span>
              <span>quantity</span>
              <span>money</span>
            </div>
            <div className="list__cart__wrapper">
              {carts.length > 0 ? (
                carts.map((cart, index) => (
                  <CartItem
                    key={index}
                    cart={cart}
                    reset={handleGetCarts}
                    orders={orders}
                    handleSelectCart={handleSelectCart}
                  />
                ))
              ) : (
                <div className="no__data__found">
                  {"Let's add product to cart!"}
                </div>
              )}
            </div>
          </section>
          <div className="purchase__cart">
            <div className="wrapper">
              <div className="control__cart purchase__cart__item">
                <span>Select All</span>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                <span>Delete</span>
              </div>
              <div className="payment__cart purchase__cart__item">
                <span>Total payment:</span>
                <span>{totalPrice.toLocaleString()} vnđ</span>
                <button onClick={handleOrder}>Purchase</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CartPage;
