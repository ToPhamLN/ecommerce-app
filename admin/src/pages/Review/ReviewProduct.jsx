import React, { useState, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { Rate } from "antd";
import PropTypes from "prop-types";
import ReviewItem from "./ReviewItem";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { reviewRequest } from "../../config/apiRequest";
import { Spin } from "antd";
const ReviewProduct = (props) => {
  const [reviews, setReviews] = useState([]);
  const { productId } = props;
  const [myRate, setMyRate] = useState(1);
  const [myComment, setMyComment] = useState("");
  const [loading, setLoading] = useState(true);

  let totalRate = reviews.reduce(
    (sum, review) => sum + review.review,
    0
  );

  let avgRate = totalRate / reviews.length;

  let counts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  reviews.forEach((review) => {
    counts[review.rate]++;
  });

  const handdleGetReviews = async () => {
    try {
      const res = await axios.get(
        reviewRequest.getAll + `/${productId}`
      );
      setReviews(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handdleGetReviews();
  }, []);

  const handleCreateReview = async () => {
    setMyRate(0);
    setMyComment("");
    try {
      const formData = {
        product: productId,
        rate: myRate,
        comment: myComment,
      };
      const res = await axios.post(
        reviewRequest.create,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(res.data.message, { autoClose: 1000 });
      handdleGetReviews();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <section className="my__review">
        <div className="all__rate__review">
          {loading ? (
            <Spin />
          ) : (
            <React.Fragment>
              <div className="rate__item main">
                <Rate defaultValue={avgRate} disabled="true" />
              </div>
              <div className="rate__item">
                <h2>5 Star: {counts[5]}</h2>
                <Rate
                  allowHalf
                  defaultValue={5}
                  disabled="true"
                />
              </div>
              <div className="rate__item">
                <h2>4 Star: {counts[4]} </h2>
                <Rate
                  allowHalf
                  defaultValue={4}
                  disabled="true"
                />
              </div>
              <div className="rate__item">
                <h2>3 Star: {counts[3]} </h2>
                <Rate
                  allowHalf
                  defaultValue={3}
                  disabled="true"
                />
              </div>
              <div className="rate__item">
                <h2>2 Star:{counts[2]} </h2>
                <Rate
                  allowHalf
                  defaultValue={2}
                  disabled="true"
                />
              </div>
              <div className="rate__item">
                <h2>1 Star: {counts[1]}</h2>
                <Rate
                  allowHalf
                  defaultValue={1}
                  disabled="true"
                />
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="my__review__container">
          <div className="header">
            <h1>My Review : </h1>
            <div className="rate__item main">
              <Rate
                defaultValue={myRate}
                onChange={(v) => setMyRate(v)}
              />
            </div>
          </div>
          <textarea
            className="review__comment"
            placeholder="My comment...."
            value={myComment}
            onChange={(e) => setMyComment(e.target.value)}
          ></textarea>
          <button
            className="review__submit"
            onClick={() => handleCreateReview()}
          >
            <AiOutlineSend />
          </button>
        </div>
      </section>
      <section className="review__list">
        <h1>All Review : </h1>
        {loading ? (
          <Spin />
        ) : (
          reviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))
        )}
      </section>
    </React.Fragment>
  );
};

ReviewProduct.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ReviewProduct;
