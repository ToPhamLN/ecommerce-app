import React from "react";
import PropTypes from "prop-types";

const SelectPeriod = (props) => {
  const { setValue } = props;
  return (
    <React.Fragment>
      <div className="selector__dashboard">
        <label htmlFor="period">Stat by:</label>
        <select
          name="period"
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>
    </React.Fragment>
  );
};

SelectPeriod.propTypes = {
  setValue: PropTypes.func,
};
export default SelectPeriod;
