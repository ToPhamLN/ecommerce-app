import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineRollback } from "react-icons/ai";
import dinosaur from "../assets/imgs/dinosaur404.png";
import "../assets/css/NotFound.css";

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="container__notfound">
        <div className="notfound">
          <div className="title__notfound">404</div>
          <div className="description__notfound">
            Page Not Found
          </div>
          <div className="picture__notfound">
            <img src={dinosaur} alt="" />
          </div>
          <Link className="btn__notfound" to={"/dashboard"}>
            <span>
              <AiOutlineRollback />
            </span>
            Back Home
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
