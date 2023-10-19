import React from "react";
import PropTypes from "prop-types";
import { Tag } from "antd";

import "../../assets/css/ActionProduct.css";
import { formatDate, formatNumber } from "../../utils/format";

const ActionProduct = (props) => {
  const { product } = props;

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
        <span>{formatNumber(product.oldprice)} vnđ</span>
        <span>{formatNumber(product.price)} vnđ</span>
      </div>

      <div className="option__product">
        {Object.keys(product?.properties).map(
          (property, index) => (
            <div key={index}>
              <h3>{property + " :"}</h3>
              {product.properties[property]
                .split(", ")
                .map((value, idx) => (
                  <button className="option__btn" key={idx}>
                    {value}
                  </button>
                ))}
            </div>
          )
        )}
      </div>
    </React.Fragment>
  );
};

ActionProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ActionProduct;
