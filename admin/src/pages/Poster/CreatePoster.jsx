import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../config/axios";

import Loading from "../../components/Loading";
import { posterRequest } from "../../config/apiRequest";

const CreatePoster = (props) => {
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
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("picture", data.picture[0]);
      formData.append("path", data.path);

      const res = await axios.post(
        posterRequest.create,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      setData(!data);
      toast.success("Create successfully!", {
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
            Create new poster
          </span>
          <span
            className="exit__create__brand"
            onClick={() => setData(!data)}
          >
            <MdOutlineCancelPresentation />
          </span>
          <div className="input__box">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="error-message">Title is required</p>
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
          <div className="input__box">
            <label htmlFor="path">Path:</label>
            <input id="path" name="path" {...register("path")} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
      {loading && <Loading />}
    </React.Fragment>
  );
};

CreatePoster.propTypes = {
  data: PropTypes.bool.isRequired,
  setData: PropTypes.func.isRequired,
};

export default CreatePoster;
