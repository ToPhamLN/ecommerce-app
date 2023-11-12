import React, { useState } from "react";
import PropTypes from "prop-types";
import { Rate } from "antd";
import {
  AiOutlineLike,
  AiFillLike,
  AiFillDelete,
  AiTwotoneEdit,
} from "react-icons/ai";
import { BsFillReplyFill } from "react-icons/bs";
import axios from "../../config/axios";
import { reviewRequest } from "../../config/apiRequest";
import { toast } from "react-toastify";
import Deletion from "../../components/Deletion";
import { useSelector } from "react-redux";

import { formatDate } from "../../utils/format";
import LikeReview from "./LikeReview";

const ReviewItem = (props) => {
  const { userInfo } = useSelector((state) => state.user);
  const { review, reset } = props;
  const [edit, setEdit] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [formEdit, setFormEdit] = useState({
    rate: review.rate,
    comment: review.comment,
  });
  const handleEditReview = async () => {
    try {
      const res = await axios.put(
        `${reviewRequest.update}/${review._id}`,
        formEdit
      );
      toast.info(res.data.message, { autoClose: 1000 });
      setEdit(false);
      reset();
    } catch (error) {
      toast.error(error.data.response.message, {
        autoClose: 1000,
      });
    }
  };

  const handleLikeReview = async () => {
    try {
      await axios.put(`${reviewRequest.like}/${review._id}`);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
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
          {edit ? (
            <div className="review__content__wrapper">
              <div className="header__review__content">
                <div className="rate__item small">
                  <Rate
                    defaultValue={formEdit.rate}
                    onChange={(v) =>
                      setFormEdit({ ...formEdit, rate: v })
                    }
                  />
                </div>
                <span className="review__date">
                  {formatDate(review.updatedAt)}
                </span>
              </div>
              <textarea
                type="text"
                className="review__comment"
                value={formEdit.comment}
                onChange={(e) =>
                  setFormEdit({
                    ...formEdit,
                    comment: e.target.value,
                  })
                }
              />
              <div className="bottom__comment">
                <div
                  className="bottom__comment__item"
                  style={{
                    marginRight: "auto",
                  }}
                  onClick={() => handleEditReview()}
                >
                  <AiTwotoneEdit
                    color="#E7EA39"
                    className="icon"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="review__content__wrapper">
              <div className="header__review__content">
                <div className="rate__item small">
                  <Rate
                    allowHalf
                    defaultValue={formEdit.rate}
                    disabled={true}
                  />
                </div>
                <span className="review__date">
                  {formatDate(review.updatedAt)}
                </span>
              </div>
              <div
                className="reviewer__comment"
                dangerouslySetInnerHTML={{
                  __html: formEdit.comment,
                }}
              ></div>
              <div className="bottom__comment">
                <div className="bottom__comment__item">
                  {review.likes.some(
                    (user) => user._id === userInfo._id
                  ) ? (
                    <AiFillLike
                      className="icon"
                      onClick={() => handleLikeReview()}
                    />
                  ) : (
                    <AiOutlineLike
                      className="icon"
                      onClick={() => handleLikeReview()}
                    />
                  )}
                  {showLikes ? (
                    <LikeReview
                      users={review.likes}
                      setShow={setShowLikes}
                    />
                  ) : (
                    <span
                      className="text"
                      onClick={() => setShowLikes((p) => !p)}
                    >
                      {review.likes.some(
                        (user) => user._id === userInfo._id
                      )
                        ? `You & ${
                            review.likes.length - 1
                          } others`
                        : review.likes.length}
                    </span>
                  )}
                </div>
                <div className="control">
                  <div className="bottom__comment__item">
                    <BsFillReplyFill className="icon" />
                    <span className="text">Reply</span>
                  </div>
                  <div
                    className="bottom__comment__item"
                    onClick={() => setEdit(true)}
                  >
                    <AiTwotoneEdit
                      color="#E7EA39"
                      className="icon"
                    />
                    <span className="text" color="#E7EA39">
                      Edit
                    </span>
                  </div>
                  <div
                    className="bottom__comment__item"
                    onClick={() => setShowDelete(true)}
                  >
                    <AiFillDelete
                      color="#EA4A39"
                      className="icon"
                    />
                    <span className="text" color="#EA4A39">
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
      {showDelete && (
        <Deletion
          data={showDelete}
          setData={setShowDelete}
          reset={reset}
          api={`${reviewRequest.delete}/${review._id}`}
        />
      )}
    </React.Fragment>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
};

export default ReviewItem;
