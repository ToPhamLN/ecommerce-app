import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../config/axios";

import { discountRequest } from "../../config/apiRequest";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { routes } from "../../config/routes";
import "react-toastify/dist/ReactToastify.css";

const UpdateDiscount = () => {
  const { discountId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(true);

  const handleGetCategory = async () => {
    try {
      const res = await axios.get(
        `${discountRequest.getById}/${discountId}`
      );
      const discountData = res.data;
      Object.keys(discountData).forEach((key) => {
        setValue(key, discountData[key]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetCategory();
  }, [discountId]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("code", data.code);
      formData.append("valid", data.valid);
      formData.append("quantity", data.quantity);
      formData.append("condition", data.condition);

      const res = await axios.put(
        `${discountRequest.update}/${discountId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.info(res.data.message, {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate(routes.discount);
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
      {loading ? (
        <Loading />
      ) : (
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
                name="name"
                {...register("name", { required: true })}
              />
            </div>
            <div className="input__box">
              <label htmlFor="code">Code:</label>
              <input
                type="text"
                id="code"
                name="code"
                {...register("code", { required: true })}
              />
            </div>
            <div className="input__box">
              <label htmlFor="code">Valid:</label>
              <input
                type="text"
                id="valid"
                name="valid"
                {...register("valid", { required: true })}
              />
            </div>
            <div className="input__box">
              <label htmlFor="code">Quantity:</label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                {...register("quantity", { required: true })}
              />
            </div>
            <div className="input__box">
              <label htmlFor="code">Condition:</label>
              <input
                type="text"
                id="condition"
                name="condition"
                {...register("condition", { required: true })}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </section>
      )}
    </React.Fragment>
  );
};

export default UpdateDiscount;
