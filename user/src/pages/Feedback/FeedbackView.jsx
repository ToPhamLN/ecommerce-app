import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import { feedbackRequest } from "../../config/apiRequest";
import axios from "../../config/axios";
import { formatDate } from "../../utils/format";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { toast } from "react-toastify";
import { Spin } from "antd";
import Deletion from "../../components/Deletion";

const FeedbackView = () => {
  const location = useLocation();
  const paramURL = new URLSearchParams(location.search);
  let { feedbackId } = useParams();
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [edit, setEdit] = useState(paramURL.has("edit"));
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
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

  const handleEdit = async () => {
    try {
      setLoader(true);
      const res = await axios.put(
        feedbackRequest.update + "/" + feedbackId,
        editForm
      );
      toast.success(res.data.message);
      setEdit(false);
      handleGetFeedback();
    } catch (error) {
      toast.error(error.response.data.message, 1000);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    handleGetFeedback();
  }, []);

  useEffect(() => {
    setEditForm({
      title: feedback.title,
      content: feedback.content,
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
                      <span onClick={() => setEdit(true)}>
                        Edit
                      </span>
                    </div>
                  </div>
                </div>
              </header>
              <div className="title__feedback">
                <h2>Title : </h2>
                {edit ? (
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={(e) => handleInputChange(e)}
                  />
                ) : (
                  <span>{feedback.title}</span>
                )}
              </div>
              <div className="content__feedback">
                <h2>Content : </h2>
                {edit ? (
                  <textarea
                    type="text"
                    name="content"
                    value={editForm.content}
                    onChange={(e) => handleInputChange(e)}
                  />
                ) : (
                  <span>{feedback.content}</span>
                )}
              </div>
              {edit && (
                <button onClick={() => handleEdit()}>
                  {loader ? <Spin></Spin> : "Edit"}
                </button>
              )}
              <hr />
              <div className="content__feedback">
                <h2>Reply : </h2>
                <span>
                  {feedback.reply
                    ? feedback.reply
                    : "We will get back to you soon..."}
                </span>
              </div>
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
