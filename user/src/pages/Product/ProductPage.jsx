import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { useParams, useNavigate } from "react-router-dom";

import {
  BiSolidUpArrow,
  BiSolidDownArrow,
} from "react-icons/bi";
import { FloatButton } from "antd";

import "../../assets/css/Product.css";
import { productRequest } from "../../config/apiRequest";
import ActionProduct from "./ActionProduct";
import PictureProduct from "./PictureProduct";
import ReviewProduct from "./ReviewProduct";
import ViewBrand from "./ViewBrand";
import ViewCategory from "./ViewCategory";
import "react-quill/dist/quill.snow.css";
import Loading from "../../components/Loading";
import "../../assets/css/Review.css";

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleGetProduct = async () => {
    try {
      const res = await axios.get(
        `${productRequest.getByIdSell}/${productId}`
      );
      setProduct(res.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      } else {
        navigate("*");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="container__product">
          <div className="layer__product__main">
            <section className="product__picture">
              <PictureProduct product={product} />
            </section>
            <section className="product__action">
              <ActionProduct product={product} />
            </section>
          </div>
          <div className="layer__product__secondary">
            <div className="group__product__content">
              <div
                className="product__content"
                style={{
                  maxHeight: showAll ? "none" : "20rem",
                  overflow: "hidden",
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.content,
                  }}
                />
                <div className="toggle__content">
                  {product.content.length > 200 && (
                    <button onClick={toggleShowAll}>
                      <span>
                        {showAll ? (
                          <BiSolidUpArrow />
                        ) : (
                          <BiSolidDownArrow />
                        )}
                      </span>
                    </button>
                  )}
                </div>
              </div>
              <section className="product__review">
                <ReviewProduct productId={productId} />
              </section>
            </div>
            <div className="group__product__moreview">
              <section className="product__moreview__category group__product__moreview__item">
                <ViewCategory
                  categoryId={product.category._id}
                />
              </section>
              <section className="product__moreview__brand  group__product__moreview__item">
                <ViewBrand brandId={product.brand._id} />
              </section>
            </div>
          </div>
        </div>
      )}
      <FloatButton.BackTop />
    </React.Fragment>
  );
};

export default ProductPage;
