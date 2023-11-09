import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import {
  feedbackRequest,
  notificationsRequest,
} from "../../config/apiRequest";
import axios from "../../config/axios";
import { formatDate } from "../../utils/format";
import { MdOutlineUnfoldMore } from "react-icons/md";

import { toast } from "react-toastify";
import { Spin } from "antd";
import Deletion from "../../components/Deletion";
import "../../assets/css/Feedback.css";

const FeedbackView = () => {
  let { feedbackId } = useParams();
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [editForm, setEditForm] = useState({
    reply: "",
  });
  const [showDelete, setShowDelete] = useState(false);

  const handleGetFeedback = async () => {
    try {
      const res = await axios.get(
        feedbackRequest.getById + "/" + feedbackId
      );
      setFeedback(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  console.log(feedback);
  const handleEdit = async () => {
    try {
      setLoader(true);
      const res = await axios.put(
        feedbackRequest.update + "/" + feedbackId,
        editForm
      );
      toast.success(res.data.message, { autoClose: 1000 });
      handleGetFeedback();
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000,
      });
    } finally {
      setLoader(false);
    }
    try {
      await axios.post(notificationsRequest.create, {
        description: `Your feedback: ${feedback.title} has been replied.`,
        path: `feedback/${feedbackId}`,
        user: feedback.sender._id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetFeedback();
  }, []);
  useEffect(() => {
    setEditForm({
      reply: feedback.reply,
    });
  }, [feedback]);

  return (
    <React.Fragment>
      <div className="container__feedback">
        <div className="feedback__wp">
          {loading ? (
            <Loading />
          ) : (
            <React.Fragment>
              <header className="feedback__header">
                <div className="username">
                  {feedback?.sender.username}
                </div>
                <div className="right">
                  <div className="day">
                    {formatDate(feedback.createdAt)}
                  </div>
                  <div className="more">
                    <MdOutlineUnfoldMore />
                    <div className="list__control__feedback">
                      <span
                        style={{
                          color: "red",
                        }}
                        onClick={() =>
                          setShowDelete((prev) => !prev)
                        }
                      >
                        Delete
                      </span>
                    </div>
                  </div>
                </div>
              </header>
              <div className="title__feedback">
                <h2>Title : </h2>
                <span>{feedback.title}</span>
              </div>
              <div className="content__feedback">
                <h2>Content : </h2>
                <span>{feedback.content}</span>
              </div>
              <hr />
              <div className="content__feedback">
                <h2>Reply : </h2>
                <textarea
                  name="reply"
                  value={editForm.reply}
                  onChange={(e) => handleInputChange(e)}
                ></textarea>
              </div>
              <button onClick={() => handleEdit()}>
                {loader ? <Spin></Spin> : "Edit"}
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
      {showDelete && (
        <Deletion
          data={showDelete}
          setData={setShowDelete}
          api={`${feedbackRequest.delete}/${feedback._id}`}
          path="/feedback"
          reset={() => null}
        />
      )}
    </React.Fragment>
  );
};

export default FeedbackView;
