import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import axios from "../../config/axios";
import { cartRequest } from "../../config/apiRequest";
import "../../assets/css/Cart.css";
import CartItem from "./CartItem";

const CartPage = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetCarts = async () => {
    try {
      const res = await axios.get(cartRequest.getAll);
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

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="container__cart">
          <section className="list__cart">
            <div className="header__list__cart">
              <span>price</span>
              <span>quantity</span>
              <span>money</span>
            </div>
            <div className="list__cart__wrapper">
              {carts.map((cart, index) => (
                <CartItem
                  key={index}
                  cart={cart}
                  reset={handleGetCarts}
                />
              ))}
            </div>
          </section>
          <div className="purchase__cart">
            <div className="wrapper">
              <div className="control__cart purchase__cart__item">
                {/* <span>Select All</span>
                <input type="checkbox" />
                <span>Delete</span> */}
              </div>
              <div className="payment__cart purchase__cart__item">
                <span>Total payment:</span>
                <span>20.000.000 vnđ</span>
                <button>Purchase</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CartPage;
