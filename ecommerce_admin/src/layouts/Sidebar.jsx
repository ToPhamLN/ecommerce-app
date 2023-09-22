import React from "react";
import { Link } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";

import "../assets/css/Sidebar.css";

const Sidebar = () => {
  return (
    <React.Fragment>
      <aside className="sidebar">
        <ul>
          <li>
            <Link to="/dashboard">
              <BiSolidDashboard />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to=""></Link>
          </li>
        </ul>
      </aside>
    </React.Fragment>
  );
};

export default Sidebar;
