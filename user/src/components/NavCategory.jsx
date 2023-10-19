import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";
import { GrNext, GrPrevious } from "react-icons/gr";
import { categoryRequest } from "../config/apiRequest";
import Loading from "./Loading";
import "../assets/css/NavCategory.css";

const NavCategory = (props) => {
  const { setData, data } = props;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const handleGetAllCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(categoryRequest.getAll, {
        params: {
          text: 1,
        },
      });
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    handleGetAllCategories();
  }, []);

  const visibleCategories = categories.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handleAddCategory = (cartId) => {
    setData(cartId);
    if (data === cartId) setData(null);
  };

  return (
    <React.Fragment>
      <aside className="navcategory">
        <div className="wrapper__navcategory">
          {visibleCategories.map((category, index) => (
            <div
              className={
                data == category._id
                  ? "select category__item"
                  : "category__item"
              }
              key={index}
              onClick={() => handleAddCategory(category._id)}
            >
              <div className="picture">
                <img src={category.picturePath} alt="" />
              </div>
              <span>{category.name}</span>
            </div>
          ))}
        </div>
        <button
          className="control prev"
          onClick={handlePrev}
          disabled={currentPage === 0}
        >
          <span>
            <GrPrevious />
          </span>
        </button>
        <button
          className="control next"
          onClick={handleNext}
          disabled={
            currentPage ===
            Math.ceil(categories.length / itemsPerPage) - 1
          }
        >
          <span>
            <GrNext />
          </span>
        </button>
      </aside>
      {loading && <Loading />}
    </React.Fragment>
  );
};

NavCategory.propTypes = {
  setData: PropTypes.func.isRequired,
  data: PropTypes.string,
};

export default NavCategory;
