import React from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin3Line } from "react-icons/ri";
const NotificationItem = () => {
  const navigate = useNavigate();
  const handleView = () => {};
  return (
    <React.Fragment>
      <div className="notification__item">
        <div className="sideleft">
          <span className="description">
            Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Amet, corrupti laudantium vitae quia odit
          </span>
          <span className="day">weewewwe</span>
        </div>
        <div className="sideright">
          <span className="delete">
            <RiDeleteBin3Line />
          </span>
          <span className="read"></span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotificationItem;
