import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { BsPersonBoundingBox } from "react-icons/bs";
import { MdExpandMore } from "react-icons/md";
import PropTypes from "prop-types";

import "../assets/css/Navbar.css";
import ExpandNav from "./ExpandNav";

const Navbar = (props) => {
  const { user } = props;
  const [showExpand, setShowExpand] = useState(false);
  const location = useLocation();
  return (
    <React.Fragment>
      <header className="navbar">
        <Link className="logo__nav" to="/">
          E-commerce
        </Link>
        <div className="pathname">
          {location.pathname.replace(/\//g, "")}
        </div>
        {user ? (
          <React.Fragment>
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
