import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../config/axios";

import { brandRequest } from "../../config/apiRequest";
import Loading from "../../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import { routes } from "../../config/routes";
import "react-toastify/dist/ReactToastify.css";

const UpdateBrand = () => {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  const handleGetBrand = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${brandRequest.getById}/${brandId}`
      );
      const brandData = res.data;
      Object.keys(brandData).forEach((key) => {
        setValue(key, brandData[key]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetBrand();
  }, [brandId]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("picture", data.picture[0]);

      const res = await axios.put(
        `${brandRequest.update}/${brandId}`,
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
        navigate(routes.brand);
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
            Update brand
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
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              {...register("description")}
              defaultValue=""
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
      {loading && <Loading />}
      <ToastContainer position="top-center" />
    </React.Fragment>
  );
};

export default UpdateBrand;
