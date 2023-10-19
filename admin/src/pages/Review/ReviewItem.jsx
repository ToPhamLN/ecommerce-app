import React, { useState } from "react";
import PropTypes from "prop-types";
import { Rate } from "antd";
import {
  BiSolidUpArrow,
  BiSolidDownArrow,
} from "react-icons/bi";
import { formatDate } from "../../utils/format";

const ReviewItem = (props) => {
  const { review } = props;
  const [showAll, setShowAll] = useState(false);

  return (
    <React.Fragment>
      {review && (
        <article className="review__item">
          <div className="reviewer">
            <img
              className="avatar__reviewer"
              src={review.user.avatar.path}
              alt=""
            />
            <span className="username__reviewer">
              {review.user.username}
            </span>
          </div>
          <div className="review__content">
            <div className="review__content__wrapper">
              <div className="header__review__content">
                <div className="rate__item small">
                  <Rate
                    allowHalf
                    defaultValue={review.rate}
                    disabled="true"
                  />
                </div>
                <span className="review__date">
                  {formatDate(review.updatedAt)}
                </span>
              </div>
              <p
                className="reviewer__comment"
                style={{
                  maxHeight: showAll ? "none" : "6.6rem",
                  overflow: "hidden",
                }}
              >
                {review.comment}
              </p>
              <button
                className="expend__reviewer"
                onClick={() => setShowAll(!showAll)}
              >
                <span>
                  {showAll ? (
                    <BiSolidUpArrow />
                  ) : (
                    <BiSolidDownArrow />
                  )}
                </span>
              </button>
            </div>
          </div>
        </article>
      )}
    </React.Fragment>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewItem;
