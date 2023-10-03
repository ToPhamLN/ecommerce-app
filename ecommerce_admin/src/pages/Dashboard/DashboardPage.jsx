import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Switch, Button } from "antd";
import "../../assets/css/dashboard.css";

const DashboardPage = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <div className="container__dashboard">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="edit"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Switch
                checkedChildren="Sell"
                unCheckedChildren="Not Sold"
                {...field}
              />
            )}
          />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default DashboardPage;
