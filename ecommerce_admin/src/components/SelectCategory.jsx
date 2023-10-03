import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import PropTypes from "prop-types";

import { categoryRequest } from "../config/apiRequest";

const SelectCategory = (props) => {
  const { register } = props;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    handleGetAllCategories();
  }, []);
  return (
    <React.Fragment>
      <select
        name="category"
        className="select__category"
        {...register("category", { required: true })}
      >
        <option value={undefined}></option>
        {categories.map((category, index) => (
          <option key={index} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="property"></div>

      {loading && <Loading />}
    </React.Fragment>
  );
};
SelectCategory.propTypes = {
  register: PropTypes.func.isRequired,
};

export default SelectCategory;
