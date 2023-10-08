import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineLogin,
  // AiOutlineMessage,
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
import SearchNavbar from "../components/SearchNavbar";

const Navbar = (props) => {
  const { user } = props;
  const [showExpand, setShowExpand] = useState(false);

  return (
    <React.Fragment>
      <header className="navbar">
        <div className="logo__nav">
          <Link className="logo__nav__item" to="/">
            E-commerce
          </Link>
          <SearchNavbar />
        </div>
        {user ? (
          <React.Fragment>
            <div className="options__bar">
              <div className="menu__nav">
                {/* <button
                  className="menu__nav__item message"
                  name="Message"
                >
                  <span>
                    <AiOutlineMessage />
                  </span>
                </button> */}
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
                  name="Cart"
                  to="/cart"
                >
                  <span>
                    <BsCart3 />
                  </span>
                </Link>
                <div className="more__menu">
                  <span className="toggle__more__menu">
                    <AiOutlineMore />
                  </span>
                  <div className="more__menu__list">
                    <div className="wrapper__more__menu">
                      <button
                        className="menu__nav__item order"
                        name="Order"
                      >
                        <span>
                          <MdNoAdultContent />
                        </span>
                      </button>
                      <button
                        className="menu__nav__item payment"
                        name="Payment"
                      >
                        <span>
                          <MdContentPasteSearch />
                        </span>
                      </button>
                      <button
                        className="menu__nav__item feedback"
                        name="Feedback"
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
