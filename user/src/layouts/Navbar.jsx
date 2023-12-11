import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import {
  BsPersonBoundingBox,
  BsCart3,
  BsBell,
} from "react-icons/bs";
import {
  MdExpandMore,
  MdContentPasteSearch,
  MdNoAdultContent,
  MdOutlineMoreVert,
  MdOutlineMoreHoriz,
} from "react-icons/md";
import { notificationsRequest } from "../config/apiRequest";
import axios from "../config/axios";
import "../assets/css/Navbar.css";
import ExpandNav from "./ExpandNav";
import SearchNavbar from "../components/SearchNavbar";
import Notification from "../components/Notification";
import Chat from "../pages/Chat/Chat";

const Navbar = (props) => {
  const { user } = props;
  const [showExpand, setShowExpand] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showNotification, setShowNotification] =
    useState(false);
  const [showChat, setShowChat] = useState(false);
  const [notifications, setNotifications] = useState([]);
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
  }, [user]);

  return (
    <React.Fragment>
      <header className="navbar">
        <div className="logo__nav">
          <Link className="logo__nav__item" to="/">
            Morri
          </Link>
          <SearchNavbar />
        </div>
        {user ? (
          <React.Fragment>
            <div className="options__bar">
              <div className="menu__nav">
                {showMenu && (
                  <>
                    <Link
                      className="menu__nav__item order"
                      name="Order"
                      to={"/order"}
                    >
                      <span>
                        <MdNoAdultContent />
                      </span>
                    </Link>
                    <Link
                      className="menu__nav__item payment"
                      name="Goods"
                      to={"/goods"}
                    >
                      <span>
                        <MdContentPasteSearch />
                      </span>
                    </Link>
                  </>
                )}
                <div
                  className="more__menu"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <span className="toggle__more__menu">
                    {showMenu ? (
                      <MdOutlineMoreHoriz />
                    ) : (
                      <MdOutlineMoreVert />
                    )}
                  </span>
                </div>
                <button
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
                </button>
                <Link
                  className="menu__nav__item cart"
                  name="Cart"
                  to="/cart"
                >
                  <span>
                    <BsCart3 />
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
                    <ExpandNav
                      setData={setShowExpand}
                      setShow={() => {
                        setShowChat((p) => !p);
                        setShowNotification(false);
                      }}
                    />
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
