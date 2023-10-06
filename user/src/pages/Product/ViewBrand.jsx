import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Spin, Tag } from "antd";
import { Link } from "react-router-dom";
import { productRequest } from "../../config/apiRequest";
import { sliceString, formatDate } from "../../utils/format";

const ViewBrand = (props) => {
  const { brandId } = props;
  const [productBrands, setProductBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetProucts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(productRequest.getAllSell, {
        params: {
          brand: brandId,
          limit: 3,
        },
      });
      setProductBrands(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProucts();
  }, [brandId]);

  return (
    <React.Fragment>
      <span className="moreview__title">More View Brand</span>
      {loading ? (
        <Spin size="large" />
      ) : (
        productBrands.map((product, index) => (
          <article key={index} className="product__item">
            <div className="picture">
              <img src={product.pictures[0].path} alt="" />
            </div>
            <div className="text">
              <span className="product__item__name">
                {sliceString(product.name, 6)}
              </span>
              <span className="product__item__updated">
                {formatDate(product.updatedAt)}
              </span>
              <div className="product__item__content">
                <Tag color="#208A49">Reply 0%</Tag>
                <Tag color="#6610F2">Online is so cheap</Tag>
              </div>
              <span className="product__item__price">
                {product.price + " vnđ"}
              </span>
              <Link
                className="product__item__btn"
                to={`/products/${product._id}`}
              >
                Read more
              </Link>
            </div>
          </article>
        ))
      )}
    </React.Fragment>
  );
};

ViewBrand.propTypes = {
  brandId: PropTypes.string.isRequired,
};
export default ViewBrand;
