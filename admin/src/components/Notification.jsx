import React, { useState } from "react";
import PropTypes from "prop-types";
import "../assets/css/Notification.css";
import NotificationItem from "./NotificationItem";
import { TiDeleteOutline } from "react-icons/ti";

const Notification = (props) => {
  const { setShow, notifications, reset } = props;
  const [unRead, setUnRead] = useState(false);
  const [filNotification, setFilNotification] =
    useState(notifications);
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
            className={unRead === false ? "selected" : ""}
            onClick={() => {
              setUnRead(false);
              setFilNotification(notifications);
            }}
          >
            All
          </button>
          <button
            className={unRead === true ? "selected" : ""}
            onClick={() => {
              setUnRead(true);
              setFilNotification(
                notifications.filter(
                  (obj) => obj.readBy === false
                )
              );
            }}
          >
            Unread
          </button>
        </div>
        <div className="notificaiton__wp">
          {filNotification.map((notification, index) => (
            <NotificationItem
              key={index}
              notification={notification}
              reset={reset}
              setShow={setShow}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

Notification.propTypes = {
  setShow: PropTypes.func.isRequired,
  notifications: PropTypes.array,
  reset: PropTypes.func,
};

export default Notification;
