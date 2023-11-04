import React, { useState } from "react";
import PropTypes from "prop-types";
import "../assets/css/Notification.css";
import NotificationItem from "./NotificationItem";
import { TiDeleteOutline } from "react-icons/ti";

const Notification = (props) => {
  const { setShow, notifications, reset } = props;
  const [readBy, setReadBy] = useState(false);

  return (
    <React.Fragment>
      <div className="container__notification">
        <header>
          <h2>Notification</h2>
          <div
            className="exit"
            onClick={() => setShow((p) => !p)}
          >
            <TiDeleteOutline />
          </div>
        </header>
        <div className="nav__notification">
          <button
            className={readBy === false ? "selected" : ""}
            onClick={() => setReadBy(false)}
          >
            All
          </button>
          <button
            className={readBy === true ? "selected" : ""}
            onClick={() => setReadBy(true)}
          >
            Unread
          </button>
        </div>
        <div className="notificaiton__wp">
          {notifications.map((notification, index) => (
            <NotificationItem
              key={index}
              notification={notification}
              reset={reset}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

Notification.propTypes = {
  setShow: PropTypes.bool.isRequired,
  notifications: PropTypes.array,
  reset: PropTypes.func,
};

export default Notification;
