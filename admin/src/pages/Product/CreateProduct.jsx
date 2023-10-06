import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import SelectCategory from "../../components/SelectCategory";
import SelectBrand from "../../components/SelectBrand";
import Editor from "../../components/Editor";
import Loading from "../../components/Loading";
import {
  categoryRequest,
  productRequest,
} from "../../config/apiRequest";
import { routes } from "../../config/routes";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/CreateProduct.css";
import axios from "axios";
import UploadMultiple from "../../components/UploadMultiple";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const { userInfo } = useSelector((state) => state.user);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("brand", data.brand);
      formData.append("price", data.price);
      formData.append("content", data.content);
      if (data.picture && data.picture.length > 0) {
        data.picture.forEach((picture) => {
          formData.append("picture", picture);
        });
      }
      properties.forEach((property) => {
        if (data[property] !== "")
          formData.append(
            `properties[${property}]`,
            data[property]
          );
      });
      const res = await axios.post(
        productRequest.create,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${userInfo.accessToken}`,
          },
        }
      );
      console.log(res.data);
      toast.success("Create successfully!", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate(routes.product);
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

  const selectedCategory = watch("category");
  const handleGetCategory = async () => {
    if (selectedCategory !== undefined) {
      try {
        const res = await axios.get(
          `${categoryRequest.getById}/${selectedCategory}`
        );
        setProperties(res.data.properties);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    handleGetCategory();
  }, [selectedCategory]);

  return (
    <React.Fragment>
      <div className="container__createproduct">
        <form
          className="create__product"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className="title__form">Create new product</span>
          <div className="content__form">
            <div className="groupname">
              <div className="input__box">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="error-message">
                    Name is required
                  </p>
                )}
              </div>
              <div className="input__box">
                <label htmlFor="category">Category:</label>
                <SelectCategory register={register} />
                {errors.category && (
                  <p className="error-message">
                    Category is required
                  </p>
                )}
              </div>
              <div className="input__box">
                <label htmlFor="brand">Brand:</label>
                <SelectBrand register={register} />
                {errors.brand && (
                  <p className="error-message">
                    Brand is required
                  </p>
                )}
              </div>
              <div className="input__box">
                <label htmlFor="price">Price: </label>
                <input
                  type="text"
                  name="price"
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <p className="error-message">
                    Price is required
                  </p>
                )}
              </div>
              <div className="properties">
                <div className="span">Properties</div>
                {properties.map((item, index) => (
                  <div key={index} className="input__box">
                    <label htmlFor={item}>{item}</label>
                    <Controller
                      name={item}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input type="text" {...field} />
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              className="groupcontent"
              style={{ marginTop: "4rem" }}
            >
              <label>Content: </label>
              <div
                className="quill__editor"
                style={{ marginTop: "1rem" }}
              >
                <Controller
                  name="content"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Editor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.content && (
                  <p>{errors.content.message}</p>
                )}
              </div>
              <div style={{ marginTop: "4rem" }}>
                <label htmlFor="picture">Picture: </label>
                <UploadMultiple control={control} />
              </div>
            </div>
          </div>

          <div className="action" style={{ marginTop: "4rem" }}>
            <button>Submit</button>
          </div>
        </form>
      </div>
      {loading && <Loading />}
      <ToastContainer position="top-center" />
    </React.Fragment>
  );
};

export default CreateProduct;
