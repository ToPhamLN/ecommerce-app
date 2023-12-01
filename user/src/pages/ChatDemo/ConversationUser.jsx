import React from "react";
import PropTypes from "prop-types";

import axios from "../../config/axios";
import { conversationRequest } from "../../config/apiRequest";
import { Avatar } from "antd";
import { useSelector } from "react-redux";

const ConversationUser = (props) => {
  const { user, setGetChat } = props;
  const { userInfo } = useSelector((state) => state.user);

  const handleOnclick = async () => {
    try {
      const res = await axios.post(conversationRequest.create, {
        senderId: userInfo._id,
        receiverId: user._id,
      });
      setGetChat({
        key: res.data._id,
        name: user.username,
        id: user._id,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <React.Fragment>
      <div
        className="conversation__item"
        onClick={() => handleOnclick()}
      >
        <Avatar size={40} src={user.avatar.path} />
        <span className="name__chatbox">{user.username}</span>
      </div>
    </React.Fragment>
  );
};

ConversationUser.propTypes = {
  user: PropTypes.object.isRequired,
  setGetChat: PropTypes.func.isRequired,
};

export default ConversationUser;
