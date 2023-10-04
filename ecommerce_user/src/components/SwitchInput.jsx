import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { Switch } from "antd";

const SwitchInput = (props) => {
  const { control, name, defaultValue } = props;
  return (
    <React.Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Switch
            checkedChildren="Sell"
            unCheckedChildren="Not Sold"
            {...field}
            checked={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
    </React.Fragment>
  );
};

SwitchInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.any.isRequired,
};

export default SwitchInput;
