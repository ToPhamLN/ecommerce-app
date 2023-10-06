import React from "react";
import { BsCart3 } from "react-icons/bs";

const MenuNav = () => {
  return (
    <React.Fragment>
      <div className="menu__nav">
        <button className="menu__nav__item cart">
          <span>
            <BsCart3 />
          </span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default MenuNav;
