import React, { useState } from "react";
import PropTypes from "prop-types";
import { BsCartPlus, BsHandbag, BsShare } from "react-icons/bs";
import { Tag, InputNumber } from "antd";
import "../../assets/css/ActionProduct.css";
import { formatDate } from "../../utils/format";

const ActionProduct = (props) => {
  const { product } = props;
  const [selectedProperties, setSelectedProperties] = useState(
    {}
  );
  const [quatities, setQuatities] = useState(1);

  const handlePropertyClick = (property, value) => {
    setSelectedProperties((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

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
        <span>{product.price} vnđ</span>
      </div>

      <div className="option__product">
        {Object.keys(product?.properties).map(
          (property, index) => (
            <div key={index}>
              <h3>{property + " :"}</h3>
              {product.properties[property]
                .split(", ")
                .map((value, idx) => (
                  <button
                    className="option__btn"
                    key={idx}
                    onClick={() =>
                      handlePropertyClick(property, value)
                    }
                    style={{
                      backgroundColor:
                        selectedProperties[property] === value
                          ? "#007bff"
                          : "",
                      border:
                        selectedProperties[property] === value
                          ? "#007bff"
                          : "",
                    }}
                  >
                    {value}
                  </button>
                ))}
            </div>
          )
        )}
        <div>
          {" "}
          <h3>quantity :</h3>
          <InputNumber
            min={1}
            max={10}
            defaultValue={quatities}
            onChange={(value) => setQuatities(value)}
          />
        </div>
        <div className="total__price__product">
          <h3>price: </h3>
          <span>{product.price * quatities} vnđ</span>
        </div>
      </div>

      <div className="control__product">
        <button className="add__art">
          <span>
            <BsCartPlus />
          </span>
          Add To Cart
        </button>
        <button className="purchase__product">
          <span>
            <BsHandbag />
          </span>
          Purchase
        </button>
        <span className="share">
          <BsShare />
        </span>
      </div>
    </React.Fragment>
  );
};

ActionProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ActionProduct;
