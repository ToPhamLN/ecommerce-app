import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../config/axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading";
import { categoryRequest } from "../../config/apiRequest";
import { routes } from "../../config/routes";

const UpdateCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  const handleGetCategory = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${categoryRequest.getById}/${categoryId}`
      );
      const categoryData = res.data;
      Object.keys(categoryData).forEach((key) => {
        setValue(key, categoryData[key]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetCategory();
  }, [categoryId]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("picture", data.picture[0]);
      formData.append("properties", data.properties);

      const res = await axios.put(
        `${categoryRequest.update}/${categoryId}`,
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
        navigate(routes.category);
      }, 2000);
    } catch (error) {
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
            Update category
          </span>
          <div className="input__box">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              {...register("name")}
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
            <label htmlFor="properties">Properties:</label>
            <input
              type="text"
              id="properties"
              name="properties"
              {...register("properties", { required: true })}
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
          <button
            type="submit"
            className="submit__create__product"
          >
            Submit
          </button>
        </form>
      </section>
      {loading && <Loading />}
    </React.Fragment>
  );
};

export default UpdateCategory;
