import React, { useState } from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import PropTypes from "prop-types";
import axios from "../../config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

import Loading from "../../components/Loading.jsx";
import "./../../assets/css/CreateBrand.css";
import { brandRequest } from "../../config/apiRequest";

const CreateBrand = (props) => {
  const [loading, setLoading] = useState(false);
  const { data, setData } = props;
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
      formData.append("description", data.description);
      formData.append("picture", data.picture[0]);

      const res = await axios.post(
        brandRequest.create,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      toast.success("Create successfully!", {
        autoClose: 1000,
      });
      setTimeout(() => {
        setData(!data);
      }, 2000);
    } catch (error) {
      console.error(error);
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
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <span className="title__create__brand">
            Create new brand
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
            <label htmlFor="image">Image:</label>
            <input
              className="file"
              type="file"
              id="picture"
              name="picture"
              accept="image/*"
              {...register("picture", { required: true })}
            />
            {errors.picture && (
              <p className="error-message">
                Picture is required
              </p>
            )}
          </div>

          <div className="input__box">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="error-message">
                Description is required
              </p>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
      {loading && <Loading />}
      <ToastContainer position="top-center" />
    </React.Fragment>
  );
};

CreateBrand.propTypes = {
  data: PropTypes.bool.isRequired,
  setData: PropTypes.func.isRequired,
};

export default CreateBrand;
