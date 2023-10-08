import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { useParams, useNavigate } from "react-router-dom";
import ActionCart from "./ActionCart";
import PictureProduct from "../Product/PictureProduct";
import Loading from "../../components/Loading";
import { cartRequest } from "../../config/apiRequest";
import "../../assets/css/Product.css";

const UpdateCart = () => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const { cartId } = useParams();
  const navigate = useNavigate();

  const handleGetCart = async () => {
    try {
      const res = await axios.get(
        `${cartRequest.getById}/${cartId}`
      );
      setCart(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
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
              <ActionCart />
            </section>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default UpdateCart;
