import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  BiSolidUpArrow,
  BiSolidDownArrow,
} from "react-icons/bi";
import { FloatButton } from "antd";
import ActionCart from "./ActionCart";
import PictureProduct from "../Product/PictureProduct";
import Loading from "../../components/Loading";
import ReviewProduct from "../Product/ReviewProduct";
import ViewBrand from "../Product/ViewBrand";
import ViewCategory from "../Product/ViewCategory";
import { cartRequest } from "../../config/apiRequest";
import "../../assets/css/Product.css";

const UpdateCart = () => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const { cartId } = useParams();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleGetCart = async () => {
    try {
      const res = await axios.get(
        `${cartRequest.getById}/${cartId}`
      );
      setCart(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      } else {
        navigate("*");
      }
    }
  };

  useEffect(() => {
    handleGetCart();
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="container__product">
          <div className="layer__product__main">
            <section className="product__picture">
              <PictureProduct product={cart.product} />
            </section>
            <section className="product__action">
              <ActionCart cart={cart} />
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
                    __html: cart?.product?.content,
                  }}
                />
                <div className="toggle__content">
                  {cart?.product?.content?.length > 200 && (
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
                <ReviewProduct />
              </section>
            </div>
            <div className="group__product__moreview">
              <section className="product__moreview__category group__product__moreview__item">
                <ViewCategory
                  categoryId={cart?.product?.category?._id}
                />
              </section>
              <section className="product__moreview__brand  group__product__moreview__item">
                <ViewBrand brandId={cart?.product?.brand?._id} />
              </section>
            </div>
          </div>
        </div>
      )}
      <FloatButton />
    </React.Fragment>
  );
};

export default UpdateCart;
