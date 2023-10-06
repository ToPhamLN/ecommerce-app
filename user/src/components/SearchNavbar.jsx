import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchNavbar = () => {
  return (
    <React.Fragment>
      <div className="search__nav">
        <div className="search__nav__form">
          <input
            className="search__nav__input"
            type="text"
            placeholder="Enter for search"
          />
          <span className="search__nav__btn">
            <FaSearch />
          </span>
        </div>
        <div className="product__search__nav">
          <div className="wrapper"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchNavbar;
