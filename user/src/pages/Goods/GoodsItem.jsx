import React from "react";
import PropTypes from "prop-types";
import { Tag } from "antd";
import { formatNumber } from "../../utils/format";
import { Link } from "react-router-dom";
import { FaDeleteLeft, FaAlgolia } from "react-icons/fa6";

import { Steps } from "antd";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const GoodsItem = (props) => {
  const { cart } = props;
  let currentStep = 0;
  switch (cart?.status) {
    case "Processing":
      currentStep = 0;
      break;
    case "Shipped":
      currentStep = 1;
      break;
    case "Delivered":
      currentStep = 2;
      break;
    default:
      currentStep = 0;
      break;
  }
  return (
    <React.Fragment>
      <div className="goods__item">
        <div className="primary__goods__item">
          <div className="picture__cart">
            <img src={cart?.product.pictures[0].path} alt="" />
          </div>
          <div className="content__cart">
            <div className="header__content__cart">
              <div className="tag__cart">
                <Tag>{cart?.product.category.name}</Tag>
                <Tag>{cart?.product.brand.name}</Tag>
              </div>
              <span className="nameproduct__cart">
                {cart?.product.name}
              </span>
            </div>
            <div className="main__content__cart">
              <div className="properties__cart">
                {Object.keys(cart?.properties).map((key) => (
                  <div
                    className="properties__cart__item"
                    key={key}
                  >
                    <span>{key}</span>
                    <Tag color="#1D95BF">
                      {cart?.properties[key]}
                    </Tag>
                  </div>
                ))}
              </div>
              <div className="quauntity__cart">
                <div className="money quauntity__cart__item ">
                  <span>
                    {formatNumber(cart?.product.price) + " vnđ"}
                  </span>
                </div>
                <div className="quantity quauntity__cart__item">
                  <span>{cart?.quantity}</span>
                </div>
                <div className="price quauntity__cart__item">
                  <span>
                    {formatNumber(cart?.unitPrice) + " vnđ"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="extra__control">
            <Link className="watch__cart">
              <button>
                <span>
                  <FaAlgolia />
                </span>
              </button>
            </Link>
            <button
              className="deletecart"
              // onClick={() => handleDeleteCart()}
            >
              <span>
                <FaDeleteLeft />
              </span>
            </button>
          </div>
        </div>
        <div className="secondary__goods__item">
          {cart.status === "Canceled" ? (
            <Steps
              current={0}
              items={[
                {
                  title: "Canceled",
                  icon: <CloseCircleOutlined />,
                },
              ]}
            />
          ) : (
            <Steps
              current={currentStep}
              items={[
                {
                  title: "Processing",
                  icon: <LoadingOutlined />,
                },
                {
                  title: "Shipped",
                  icon: <SolutionOutlined />,
                },
                {
                  title: "Delivered",
                  icon: <SmileOutlined />,
                },
              ]}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

GoodsItem.propTypes = {
  cart: PropTypes.object,
};
export default GoodsItem;
