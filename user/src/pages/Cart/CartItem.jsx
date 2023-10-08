import React, { useEffect, useState } from "react";
import { Tag, InputNumber } from "antd";
import PropTypes from "prop-types";
import { FaDeleteLeft, FaAlgolia } from "react-icons/fa6";
import { formatNumber } from "../../utils/format";
import axios from "../../config/axios";
import { cartRequest } from "../../config/apiRequest";
import { Link } from "react-router-dom";
import { routes } from "../../config/routes";

const CartItem = (props) => {
  const [loading, setLoading] = useState(false);
  const { cart, reset } = props;

  const handleChangeQuantity = async (value) => {
    try {
      setLoading(true);
      const formData = {};
      formData.quantity = value;
      const res = await axios.put(
        `${cartRequest.updateCart}/${cart._id}`,
        formData
      );
      reset();
      console.log(res.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {}, []);
  return (
    <React.Fragment>
      <article
        className="cart__item"
        style={{
          opacity: loading ? "0.7" : "1",
        }}
      >
        <div className="control__check__cart">
          <input type="checkbox" className="check__cart" />
        </div>
        <div className="wrapper__cart__item">
          <div className="picture__cart">
            <img src={cart.product.pictures[0].path} alt="" />
          </div>
          <div className="content__cart">
            <div className="header__content__cart">
              <div className="tag__cart">
                <Tag>{cart.product.category.name}</Tag>
                <Tag>{cart.product.brand.name}</Tag>
              </div>
              <span className="nameproduct__cart">
                {cart.product.name}
              </span>
            </div>
            <div className="main__content__cart">
              <div className="properties__cart">
                {Object.keys(cart.properties).map((key) => (
                  <div
                    className="properties__cart__item"
                    key={key}
                  >
                    <span>{key}</span>
                    <Tag color="#1D95BF">
                      {cart.properties[key]}
                    </Tag>
                  </div>
                ))}
              </div>
              <div className="quauntity__cart">
                <div className="money quauntity__cart__item ">
                  <span>
                    {formatNumber(cart.product.price) + " vnđ"}
                  </span>
                </div>
                <div className="quantity quauntity__cart__item">
                  <InputNumber
                    min={1}
                    max={10}
                    defaultValue={cart.quantity}
                    onChange={handleChangeQuantity}
                  />
                </div>
                <div className="price quauntity__cart__item">
                  <span>
                    {formatNumber(cart.unitPrice) + " vnđ"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="extra__control">
          <Link
            className="watch__cart"
            to={`${routes.cart}/${cart._id}`}
          >
            <button>
              <span>
                <FaAlgolia />
              </span>
            </button>
          </Link>
          <button className="deletecart">
            <span>
              <FaDeleteLeft />
            </span>
          </button>
        </div>
      </article>
    </React.Fragment>
  );
};
CartItem.propTypes = {
  cart: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
};
export default CartItem;
