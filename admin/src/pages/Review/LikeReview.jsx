import React from "react";
import PropTypes from "prop-types";
import { BsDashSquareFill } from "react-icons/bs";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

const LikeReview = (props) => {
  const { users, setShow } = props;
  const updatedUsers = [...users]
    .map((user) =>
      user.id === "11111111111"
        ? { ...user, username: "You" }
        : user
    )
    .sort((a, b) => (a.id === "11111111111" ? -1 : 0));
  console.log(updatedUsers);
  return (
    <React.Fragment>
      <div className="like__container">
        <span
          className="exit"
          onClick={() => setShow((p) => !p)}
        >
          <BsDashSquareFill />
        </span>
        <div className="like__list">
          {updatedUsers.map((user, index) => (
            <Link className="like__item" key={index}>
              <Avatar size={35} src={user.avatar.path} />
              <span
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {user.username}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

LikeReview.propTypes = {
  users: PropTypes.array,
  setShow: PropTypes.func,
};
export default LikeReview;
