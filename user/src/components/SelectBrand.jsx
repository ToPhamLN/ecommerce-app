import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import PropTypes from "prop-types";

import { brandRequest } from "../config/apiRequest";

const SelectBrand = (props) => {
  const { register } = props;
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleGetAllCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(brandRequest.getAll, {
        params: {
          text: 1,
        },
      });
      setBrands(res.data);
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
        className="select__brand"
        {...register("brand", { required: true })}
      >
        <option value={undefined}></option>
        {brands.map((brand, index) => (
          <option key={index} value={brand._id}>
            {brand.name}
          </option>
        ))}
      </select>
      {loading && <Loading />}
    </React.Fragment>
  );
};
SelectBrand.propTypes = {
  register: PropTypes.func.isRequired,
};

export default SelectBrand;
