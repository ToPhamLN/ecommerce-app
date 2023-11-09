import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import { formatTimeAgo } from "../../utils/format";

const Message = (props) => {
  const { message } = props;
  const { userInfo } = useSelector((state) => state.user);
  console.log(message);
  return (
    <React.Fragment>
      <div
        className={
          message.sender._id === userInfo._id
            ? "message mine"
            : "message"
        }
      >
        <div className="message__top">
          <Avatar
            size={40}
            className="message__avatar"
            src={
              message.sender.avatar && message.sender.avatar.path
            }
          />
          <p className="message__text">{message.text}</p>
        </div>
        <div className="message__bottom">
          {formatTimeAgo(message.createdAt)}
        </div>
      </div>
    </React.Fragment>
  );
};

Message.propTypes = {
  message: PropTypes.object,
};
export default Message;
