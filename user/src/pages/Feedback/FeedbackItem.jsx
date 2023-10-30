import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { formatDate } from "../../utils/format";
import { feedbackRequest } from "../../config/apiRequest";
import Deletion from "../../components/Deletion";

const FeedbackItem = (props) => {
  const { feedback, reset } = props;
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);

  return (
    <React.Fragment>
      <div className="feedback__item">
        <div className="time">
          {formatDate(feedback.createdAt)}
        </div>
        <div className="content">
          <span
            className="title"
            onClick={() => navigate(feedback._id)}
          >
            {feedback.title}
          </span>
          <div className="more">
            <MdOutlineUnfoldMore />
            <div className="list__control__feedback">
              <span
                style={{
                  color: "red",
                }}
                onClick={() => setShowDelete((prev) => !prev)}
              >
                Delete
              </span>
              <span
                onClick={() => navigate(feedback._id + "?edit")}
              >
                Edit
              </span>
            </div>
          </div>
        </div>
      </div>
      {showDelete && (
        <Deletion
          data={showDelete}
          setData={setShowDelete}
          api={`${feedbackRequest.delete}/${feedback._id}`}
          path="/feedback"
          reset={reset}
        />
      )}
    </React.Fragment>
  );
};

FeedbackItem.propTypes = {
  feedback: PropTypes.object.isRequired,
  reset: PropTypes.func,
};

export default FeedbackItem;
