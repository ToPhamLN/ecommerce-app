import React, { useEffect, useState } from "react";
import SelectCategory from "../../components/SelectCategory";
import SelectBrand from "../../components/SelectBrand";
import Editor from "../../components/Editor";
import Loading from "../../components/Loading";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-quill/dist/quill.snow.css";
import "../../assets/css/CreateProduct.css";
import { routes } from "../../config/routes";
import axios from "axios";
import { productRequest } from "../../config/apiRequest";

const UpdateProduct = () => {
  const { productId } = useParams();
  const { navigate } = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
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
      formData.append("size", data.size);
      formData.append("color", data.color);
      formData.append("ram", data.ram);
      formData.append("storages", data.storages);
      formData.append("content", data.content);
      formData.append("picture", data.picture[0]);
      const res = await axios.post(
        productRequest.update,
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
  return (
    <React.Fragment>
      <div className="container__createproduct">
        <form
          action=""
          className="create__product"
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className="title__form">Update product</span>
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
                <div className="input__box">
                  <label htmlFor="size">Size:</label>
                  <input
                    type="text"
                    name="size"
                    {...register("size")}
                  />
                </div>
                <div className="input__box">
                  <label htmlFor="color">Color</label>
                  <input
                    type="text"
                    name="color"
                    {...register("color")}
                  />
                </div>{" "}
                <div className="input__box">
                  <label htmlFor="ram">RAM: </label>
                  <input
                    type="text"
                    name="ram"
                    {...register("ram")}
                  />
                </div>{" "}
                <div className="input__box">
                  <label htmlFor="size">Storage:</label>
                  <input
                    type="text"
                    name="storage"
                    {...register("storage")}
                  />
                </div>
              </div>
            </div>
            <div className="groupcontent">
              <div className="input__box">
                <label htmlFor="picture">Picture: </label>
                <input
                  type="file"
                  name="picture"
                  {...register("picture")}
                />
              </div>
              <span>Content: </span>
              <div className="quill__editor">
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
            </div>
          </div>
          <div className="action">
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
