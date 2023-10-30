import PropTypes from "prop-types";
import React, { useState } from "react";
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
import { Link, useLocation } from "react-router-dom";

import "../assets/css/Navbar.css";
import ExpandNav from "./ExpandNav";

const Navbar = (props) => {
  const { user } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [showExpand, setShowExpand] = useState(false);
  const location = useLocation();
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
                <button
                  className="menu__nav__item notification"
                  name="Notification"
                >
                  <span>
                    <BsBell />
                  </span>
                </button>
                <Link
                  className="menu__nav__item cart"
                  name="Message"
                >
                  <span>
                    <AiOutlineMessage />
                  </span>
                </Link>
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
                  {showExpand && <ExpandNav />}
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
      </header>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  user: PropTypes.object,
};

export default Navbar;
