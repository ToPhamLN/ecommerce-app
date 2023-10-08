import React, { useState } from "react";
import PropTypes from "prop-types";
import { BsCartPlus, BsShare } from "react-icons/bs";
import { Tag, InputNumber } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "../../assets/css/ActionProduct.css";
import { formatDate, formatNumber } from "../../utils/format";
import { cartRequest } from "../../config/apiRequest";
import axios from "../../config/axios";
import Loading from "../../components/Loading";

const ActionCart = (props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cart } = props;
  const { product } = cart;
  const [selectedProperties, setSelectedProperties] = useState(
    cart.properties
  );
  const [quantity, setQuantity] = useState(1);
  const handlePropertyClick = (property, value) => {
    setSelectedProperties((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  const handleUpdateCart = async () => {
    const propertyKeys = Object.keys(product.properties);
    if (
      Object.keys(selectedProperties).length ===
        propertyKeys.length &&
      quantity > 0
    ) {
      try {
        setLoading(true);
        const formData = {};
        formData.product = product._id;
        formData.properties = selectedProperties;
        formData.quantity = quantity;
        formData.unitPrice = product.price * quantity;
        const res = await axios.put(
          `${cartRequest.updateCart}/${cart._id}`,
          formData
        );
        toast.success(res.data.message, {
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/cart");
        }, 2000);
      } catch (error) {
        const message =
          error.response.data?.message || error.response.data;
        toast.error(message, {
          autoClose: 1000,
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please select all properties.", {
        autoClose: 1000,
      });
    }
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
          <h3>quantity :</h3>
          <InputNumber
            min={1}
            max={10}
            defaultValue={quantity}
            onChange={(value) => setQuantity(value)}
          />
        </div>
        <div className="total__price__product">
          <h3>price: </h3>
          <span>
            {formatNumber(product.price * quantity)} vnđ
          </span>
        </div>
      </div>

      <div className="control__product">
        <button
          className="purchase__product"
          onClick={() => handleUpdateCart()}
        >
          <span>
            <BsCartPlus />
          </span>
          Change
        </button>
        <span className="share">
          <BsShare />
        </span>
      </div>
      {loading && <Loading />}
    </React.Fragment>
  );
};

ActionCart.propTypes = {
  cart: PropTypes.object.isRequired,
};

export default ActionCart;
