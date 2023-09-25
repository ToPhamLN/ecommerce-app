import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiFillSetting, AiOutlineLogout } from "react-icons/ai";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { logoutUser } from "../slices/userSlice";
const ExpandNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("login");
  };
  return (
    <React.Fragment>
      <div className="expand__nav">
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

export default ExpandNav;
