import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../config/axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading";
import { posterRequest } from "../../config/apiRequest";
import { routes } from "../../config/routes";

const UpdatePoster = () => {
  const { posterId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  const handleGetCategory = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${posterRequest.getById}/${posterId}`
      );
      const posterData = res.data;
      Object.keys(posterData).forEach((key) => {
        setValue(key, posterData[key]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetCategory();
  }, [posterId]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("picture", data.picture[0]);
      formData.append("path", data.path);

      const res = await axios.put(
        `${posterRequest.update}/${posterId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.info(res.data.message, {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate(routes.poster);
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message, {
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <section className="container__update__brand">
        <form
          action=""
          className="form__create__brand form__update__brand"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className="title__create__brand">
            Update poster
          </span>
          <div className="input__box">
            <label htmlFor="name">Title:</label>
            <input
              type="text"
              id="name"
              {...register("title")}
              defaultValue=""
            />
          </div>
          <div className="input__box">
            <label htmlFor="image">Image:</label>
            <input
              className="file"
              type="file"
              id="picture"
              {...register("picture")}
              accept="image/*"
            />
          </div>
          <div className="input__box">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              {...register("description")}
              defaultValue=""
            />
          </div>
          <div className="input__box">
            <label htmlFor="path">Path:</label>
            <input
              id="path"
              name="path"
              {...register("path")}
              defaultValue=""
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
      {loading && <Loading />}
    </React.Fragment>
  );
};

export default UpdatePoster;
