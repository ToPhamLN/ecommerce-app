import React, { useEffect, useState } from "react";
import "../../assets/css/Feedback.css";
import FeedbackItem from "./FeedbackItem";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { feedbackRequest } from "../../config/apiRequest";
import axios from "../../config/axios";
import { MdCreate } from "react-icons/md";

const FeebackPage = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleGetFeedback = async () => {
    try {
      const res = await axios.get(feedbackRequest.getAll);
      setFeedbacks(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetFeedback();
  }, []);
  return (
    <React.Fragment>
      <div className="container__feedback">
        <div className="all__feedback">
          <button
            className="btn__create__feedback"
            onClick={() => navigate("/feedback/create")}
          >
            <MdCreate />
          </button>
          <div className="all__feedback__wp">
            <h1>My Feedback</h1>
            {loading ? (
              <Loading />
            ) : (
              feedbacks.map((feedback, index) => (
                <FeedbackItem
                  key={index}
                  feedback={feedback}
                  reset={handleGetFeedback}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FeebackPage;
