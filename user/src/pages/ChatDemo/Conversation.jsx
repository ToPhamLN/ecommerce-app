import React from "react";
import PropTypes from "prop-types";
import "../../assets/css/Chat.css";

import { Avatar } from "antd";
import { useSelector } from "react-redux";

const Conversation = (props) => {
  const { conversation, setGetChat } = props;
  const { userInfo } = useSelector((state) => state.user);
  const receiver = conversation.members.filter(
    (members) => members._id !== userInfo._id
  );

  return (
    <React.Fragment>
      <div
        className="conversation__item"
        onClick={() =>
          setGetChat({
            key: conversation._id,
            name: receiver[0].username,
            id: receiver[0]._id,
          })
        }
      >
        <Avatar
          size={40}
          src={receiver[0].avatar && receiver[0].avatar.path}
        />
        <span className="name__chatbox">
          {receiver[0].username}
        </span>
      </div>
    </React.Fragment>
  );
};

Conversation.propTypes = {
  conversation: PropTypes.object.isRequired,
  setGetChat: PropTypes.func.isRequired,
};

export default Conversation;
