import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import {
  AiOutlineLogin,
  AiOutlineMessage,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { BsBell, BsPersonBoundingBox } from "react-icons/bs";
import {
  MdExpandMore,
  MdOutlineMoreHoriz,
  MdOutlineMoreVert,
} from "react-icons/md";
import axios from "../config/axios";
import { notificationsRequest } from "../config/apiRequest";
import { Link, useLocation } from "react-router-dom";
import "../assets/css/Navbar.css";
import ExpandNav from "./ExpandNav";
import Notification from "../components/Notification";
import Chat from "../pages/Chat/Chat";

const Navbar = (props) => {
  const { user } = props;
  const [notifications, setNotifications] = useState([]);
  const [showMenu, setShowMenu] = useState(true);
  const [showExpand, setShowExpand] = useState(false);
  const [showNotification, setShowNotification] =
    useState(false);
  const [showChat, setShowChat] = useState(false);
  const location = useLocation();

  const handleGetNotification = async () => {
    try {
      const res = await axios.get(notificationsRequest.getAll);
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetNotification();
  }, []);

  return (
    <React.Fragment>
      <header className="navbar">
        <Link className="logo__nav" to="/">
          E-commerce
        </Link>
        <div className="pathname">
          {location.pathname.split("/")[1]}
        </div>
        {user ? (
          <React.Fragment>
            <div className="options__bar">
              <div className="menu__nav">
                {showMenu && (
                  <>
                    <Link
                      className="menu__nav__item cart"
                      name="Feedback"
                      to={"/feedback"}
                    >
                      <span>
                        <AiOutlineQuestionCircle />
                      </span>
                    </Link>
                  </>
                )}
                <div
                  className="more__menu"
                  onClick={() => setShowMenu((p) => !p)}
                >
                  <span className="toggle__more__menu">
                    {showMenu ? (
                      <MdOutlineMoreHoriz />
                    ) : (
                      <MdOutlineMoreVert />
                    )}
                  </span>
                </div>
                <div
                  className="menu__nav__item notification"
                  name="Notification"
                  onClick={() => {
                    setShowNotification((p) => !p);
                    setShowChat(false);
                  }}
                >
                  <span>
                    <BsBell />
                  </span>
                  {notifications.filter(
                    (obj) => obj.readBy === false
                  ).length > 0 && (
                    <span className="number">
                      {
                        notifications.filter(
                          (obj) => obj.readBy === false
                        ).length
                      }
                    </span>
                  )}
                </div>
                <Link
                  className="menu__nav__item cart"
                  name="Message"
                  onClick={() => {
                    setShowChat((p) => !p);
                    setShowNotification(false);
                  }}
                >
                  <span>
                    <AiOutlineMessage />
                  </span>
                </Link>
              </div>
              <div className="auth user">
                <div className="avatar__nav">
                  <img
                    src={user?.avatar ? user.avatar.path : ""}
                    alt=""
                  />
                </div>
                <div className="username__nav">
                  {user.username}
                </div>
                <div className="list__nav">
                  <span
                    className="toggle__list__nav"
                    onClick={() => setShowExpand(!showExpand)}
                  >
                    <MdExpandMore />
                  </span>
                  {showExpand && (
                    <ExpandNav setData={setShowExpand} />
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ul className="auth site">
              <li>
                <Link to="/login" className="item__nav link">
                  <AiOutlineLogin />
                  <span>Login</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className="item__nav link">
                  <BsPersonBoundingBox />
                  <span>Register</span>
                </Link>
              </li>
            </ul>
          </React.Fragment>
        )}
        {showNotification && (
          <Notification
            setShow={setShowNotification}
            notifications={notifications}
            reset={handleGetNotification}
          />
        )}
        {showChat && <Chat setShow={setShowChat} />}
      </header>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  user: PropTypes.object,
};

export default Navbar;
