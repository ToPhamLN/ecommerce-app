import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../config/axios";
import { feedbackRequest } from "../../config/apiRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

const PostFeedback = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const [form, setForm] = useState({
    username: userInfo.username,
    email: userInfo.email,
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handlePostFeedback = async () => {
    try {
      setLoading(true);
      const res = await axios.post(feedbackRequest.create, form);
      toast.success(res.data.message, 1000);
      setTimeout(() => {
        navigate("/feedback");
      }, 1500);
    } catch (error) {
      toast.error(error.response.data.message, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="newfeedback">
        <div className="newfeedback__wp">
          <h4>Feedback</h4>
          <h6>Give us your feedback</h6>
          <h6>We will get back to you soon</h6>
          <div className="input__box">
            <label>User name: </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input__box">
            <label>Email: </label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input__box">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input__box">
            <label>Content: </label>
            <textarea
              rows={10}
              name="content"
              value={form.content}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <button onClick={() => handlePostFeedback()}>
            {loading ? <Spin /> : "Create"}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostFeedback;
