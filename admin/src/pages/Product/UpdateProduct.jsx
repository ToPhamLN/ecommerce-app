import React, { useEffect, useState } from "react";
import axios from "../../config/axios";

import SelectCategory from "../../components/SelectCategory";
import SelectBrand from "../../components/SelectBrand";
import Editor from "../../components/Editor";
import Loading from "../../components/Loading";
import UploadMultiple from "../../components/UploadMultiple";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { categoryRequest } from "../../config/apiRequest";
import "react-quill/dist/quill.snow.css";
import "../../assets/css/CreateProduct.css";
import { routes } from "../../config/routes";
import { productRequest } from "../../config/apiRequest";
import SwitchInput from "../../components/SwitchInput";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const handleGetProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${productRequest.getById}/${productId}`
      );
      const productData = res.data;
      Object.keys(productData).forEach((key) => {
        setValue(key, productData[key]);
      });
      Object.keys(productData.properties).forEach((key) => {
        setValue(key, productData.properties[key]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("brand", data.brand);
      formData.append("price", data.price);
      formData.append("content", data.content);
      formData.append("isSell", data.isSell);
      if (data.picture && data.picture.length > 0) {
        data.picture.forEach((picture) => {
          formData.append("picture", picture);
        });
      }
      properties.forEach((property) => {
        if (data[property])
          formData.append(
            `properties[${property}]`,
            data[property]
          );
      });
      const res = await axios.put(
        `${productRequest.update}/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(res.data?.message, {
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
          action=""
          className="create__product"
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className="title__form">Update product</span>
          <div className="stock__product">
            <SwitchInput
              control={control}
              name="isSell"
              defaultValue={false}
            />
          </div>
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

export default UpdateProduct;
