import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineLogin,
  AiOutlineMessage,
  AiOutlineMore,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import {
  BsPersonBoundingBox,
  BsCart3,
  BsBell,
} from "react-icons/bs";
import {
  MdExpandMore,
  MdContentPasteSearch,
  MdNoAdultContent,
} from "react-icons/md";
import PropTypes from "prop-types";

import "../assets/css/Navbar.css";
import ExpandNav from "./ExpandNav";

const Navbar = (props) => {
  const { user } = props;
  const [showExpand, setShowExpand] = useState(false);

  return (
    <React.Fragment>
      <header className="navbar">
        <Link className="logo__nav" to="/">
          E-commerce
        </Link>
        <form action="">
          <input type="text" />
        </form>
        {user ? (
          <React.Fragment>
            <div className="options__bar">
              <div className="menu__nav">
                <button
                  className="menu__nav__item message"
                  name="message"
                >
                  <span>
                    <AiOutlineMessage />
                  </span>
                </button>
                <button
                  className="menu__nav__item notification"
                  name="notification"
                >
                  <span>
                    <BsBell />
                  </span>
                </button>
                <button
                  className="menu__nav__item cart"
                  name="cart"
                >
                  <span>
                    <BsCart3 />
                  </span>
                </button>
                <div className="more__menu">
                  <span className="toggle__more__menu">
                    <AiOutlineMore />
                  </span>
                  <div className="more__menu__list">
                    <div className="wrapper__more__menu">
                      <button
                        className="menu__nav__item order"
                        name="order"
                      >
                        <span>
                          <MdNoAdultContent />
                        </span>
                      </button>
                      <button
                        className="menu__nav__item payment"
                        name="payment"
                      >
                        <span>
                          <MdContentPasteSearch />
                        </span>
                      </button>
                      <button
                        className="menu__nav__item feedback"
                        name="feedback"
                      >
                        <span>
                          <AiOutlineQuestionCircle />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="auth user">
                <div className="avatar__nav">
                  <img src={user?.avatar} alt="" />
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
