import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";
import {
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import { categoryRequest } from "../config/apiRequest";
import Loading from "./Loading";
import "../assets/css/NavCategory.css";

const NavCategory = (props) => {
  const { setData, data } = props;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [slideImg, setSlideImg] = useState([0, 7]);
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
    if (slideImg[1] < categories.length) {
      setSlideImg([slideImg[0] + 1, slideImg[1] + 1]);
    }
  };

  const handlePrev = () => {
    if (slideImg[0] > 0) {
      setSlideImg([slideImg[0] - 1, slideImg[1] - 1]);
    }
  };

  useEffect(() => {
    handleGetAllCategories();
  }, []);

  const handleAddCategory = (cartId) => {
    setData(cartId);
    if (data === cartId) setData(null);
  };

  return (
    <React.Fragment>
      <aside className="navcategory">
        <div className="wrapper__navcategory">
          {categories
            .slice(...slideImg)
            .map((category, index) => (
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
        <button className="control prev" onClick={handlePrev}>
          <span>
            <MdNavigateBefore />
          </span>
        </button>
        <button className="control next" onClick={handleNext}>
          <span>
            <MdNavigateNext />
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
