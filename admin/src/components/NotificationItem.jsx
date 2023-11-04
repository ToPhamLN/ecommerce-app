import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin3Line } from "react-icons/ri";
import { formatDate } from "../utils/format";
import axios from "../config/axios";
import { notificationsRequest } from "../config/apiRequest";
const NotificationItem = (props) => {
  const { notification, reset } = props;
  const navigate = useNavigate();
  console.log(notification);
  const handlView = async () => {
    try {
      const res = await axios.put(notificationsRequest.readed);
    } catch (error) {}
    navigate(notification.path);
    reset();
  };
  return (
    <React.Fragment>
      <div className="notification__item">
        <div className="sideleft" onClick={() => handlView()}>
          <span className="description">
            {notification.description}
          </span>
          <span className="day">
            {formatDate(notification.createdAt)}
          </span>
        </div>
        <div className="sideright">
          <span className="delete">
            <RiDeleteBin3Line />
          </span>
          <span
            className={notification.readBy ? "" : "read"}
          ></span>
        </div>
      </div>
    </React.Fragment>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.object,
  reset: PropTypes.func,
};

export default NotificationItem;
