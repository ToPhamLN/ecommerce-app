import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../config/axios";

import Loading from "../../components/Loading";
import { discountRequest } from "../../config/apiRequest";

const CreateDiscount = (props) => {
  const { data, setData } = props;
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("code", data.code);
      formData.append("valid", data.valid);
      formData.append("quantity", data.quantity);
      formData.append("condition", data.condition);

      const res = await axios.post(
        discountRequest.create,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setData(!data);
      toast.success(res.data.message, {
        autoClose: 1000,
      });
    } catch (error) {
      toast.error(error.response.data?.message, {
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <section className="container__create__brand">
        <form
          action=""
          className="form__create__brand"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className="title__create__brand">
            Create new Discount
          </span>
          <span
            className="exit__create__brand"
            onClick={() => setData(!data)}
          >
            <MdOutlineCancelPresentation />
          </span>
          <div className="input__box">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="error-message">Name is required</p>
            )}
          </div>
          <div className="input__box">
            <label htmlFor="code">Code:</label>
            <input
              type="text"
              id="code"
              name="code"
              {...register("code", { required: true })}
            />
            {errors.code && (
              <p className="error-message">Code is required</p>
            )}
          </div>
          <div className="input__box">
            <label htmlFor="code">Valid:</label>
            <input
              type="text"
              id="valid"
              name="valid"
              {...register("valid", { required: true })}
            />
            {errors.valid && (
              <p className="error-message">Valid is required</p>
            )}
          </div>
          <div className="input__box">
            <label htmlFor="code">Quantity:</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              {...register("quantity", { required: true })}
            />
            {errors.quantity && (
              <p className="error-message">
                Quantity is required
              </p>
            )}
          </div>
          <div className="input__box">
            <label htmlFor="code">Condition:</label>
            <input
              type="text"
              id="condition"
              name="condition"
              {...register("condition", { required: true })}
            />
            {errors.condition && (
              <p className="error-message">
                Condition is required
              </p>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
      {loading && <Loading />}
    </React.Fragment>
  );
};

CreateDiscount.propTypes = {
  data: PropTypes.bool.isRequired,
  setData: PropTypes.func.isRequired,
};

export default CreateDiscount;
