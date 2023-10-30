import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AiOutlineMessage,
  AiFillSetting,
  AiOutlineLogout,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { logoutUser } from "../slices/userSlice";
const ExpandNav = (props) => {
  const { setData } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("login");
  };
  return (
    <React.Fragment>
      <div
        className="expand__nav"
        onClick={() => setData((p) => !p)}
      >
        <ul>
          <li>
            <Link to="/profile" className="expand__item">
              <BsFillFileEarmarkPersonFill />
              Account
            </Link>
          </li>
          <li>
            <span className="expand__item">
              <AiFillSetting />
              Setting
            </span>
          </li>
          <li>
            <Link className="expand__item" to={"/feedback"}>
              <AiOutlineQuestionCircle />
              Feedback
            </Link>
          </li>
          <li>
            <span className="expand__item">
              <AiOutlineMessage />
              Contact
            </span>
          </li>
          <li>
            <span
              className="expand__item"
              onClick={handleLogout}
            >
              <AiOutlineLogout />
              Logout
            </span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

ExpandNav.propTypes = {
  setData: PropTypes.func,
};

export default ExpandNav;
