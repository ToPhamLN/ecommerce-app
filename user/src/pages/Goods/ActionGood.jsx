import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { BsShare } from "react-icons/bs";
import { MdExitToApp } from "react-icons/md";
import { Tag, InputNumber } from "antd";
import { formatDate, formatNumber } from "../../utils/format";

const ActionGoods = (props) => {
  const { cart } = props;
  const { product } = cart;
  const { properties } = product;
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="tag__product">
        <Tag className="tag__item">{product.category?.name}</Tag>
        <Tag className="tag__item">{product.brand?.name}</Tag>
        <span className="product__updatedAt">
          {formatDate(product.updatedAt)}
        </span>
      </div>
      <div className="head__product">
        <span className="product__name">{product?.name}</span>
      </div>
      <div className="price__product">
        <span>{formatNumber(product.price)} vnđ</span>
      </div>

      <div className="option__product">
        {Object.keys(properties).map((property, index) => (
          <div key={index}>
            <h3>{property + " :"}</h3>
            {properties[property]
              .split(", ")
              .map((value, idx) => (
                <button
                  className="option__btn"
                  key={idx}
                  style={{
                    backgroundColor:
                      cart.properties[property] === value
                        ? "#007bff"
                        : "",
                    border:
                      cart.properties[property] === value
                        ? "#007bff"
                        : "",
                  }}
                >
                  {value}
                </button>
              ))}
          </div>
        ))}
        <div>
          <h3>quantity :</h3>
          <InputNumber
            min={1}
            max={10}
            defaultValue={1}
            disabled
          />
        </div>
        <div className="total__price__product">
          <h3>price: </h3>
          <span>{formatNumber(product.price)} vnđ</span>
        </div>
      </div>

      <div className="control__product">
        <button
          className="purchase__product"
          onClick={() => navigate("/goods")}
        >
          <span>
            <MdExitToApp />
          </span>
          Exit
        </button>
        <span className="share">
          <BsShare />
        </span>
      </div>
    </React.Fragment>
  );
};

ActionGoods.propTypes = {
  cart: PropTypes.object.isRequired,
};

export default ActionGoods;
