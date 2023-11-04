import React, { useState, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import axios from "../../config/axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/userSlice.js";
import Loading from "../../components/Loading";
import { userRequest } from "../../config/apiRequest";
import { Spin } from "antd";
import { toast } from "react-toastify";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import "../../assets/css/Profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [loadingSpin, setLoadingSpin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const handleGetProfile = async () => {
    try {
      const res = await axios.get(userRequest.getProfile);
      setUser(res.data);
      const userData = res.data;
      Object.keys(userData).forEach((key) => {
        setValue(key, userData[key]);
      });
      dispatch(setCredentials(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  const handleChangeAvatar = async (e) => {
    try {
      setLoadingSpin(true);
      const res = await axios.put(
        userRequest.updateAvatar,
        {
          avatar: e.target.files[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(res.data.message, { autoClose: 1000 });
      handleGetProfile();
      setLoadingSpin(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("contact", data.contact);

    if (data.oldPassword && data.newPassword) {
      if (data.newPassword == data.confirmPassword) {
        formData.append("oldPassword", data.oldPassword);
        formData.append("newPassword", data.newPassword);
      } else {
        toast.error(
          "New password and confirm password not match",
          { autoClose: 1000 }
        );
      }
    }

    try {
      setLoadingSpin(true);
      const res = await axios.put(userRequest.auth, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(res.data.message, { autoClose: 1000 });
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000,
      });
    } finally {
      setLoadingSpin(false);
    }
  };

  return (
    <React.Fragment>
      <div className="container__profile">
        {loading ? (
          <Loading />
        ) : (
          <div className="profile__wrapper">
            <h1 className="profile__title">My Profile</h1>
            <div className="profile__avatar">
              <div className="profile__avatar__wrapper">
                <div className="avatar">
                  <img
                    src={user.avatar ? user.avatar.path : ""}
                    alt=""
                  />
                  {loadingSpin && <Spin />}
                </div>
                <div className="btn__profile__avatar">
                  <input
                    type="file"
                    accept="image/*"
                    id="avatar"
                    onChange={(e) => handleChangeAvatar(e)}
                  />
                  <label htmlFor="avatar">
                    <UploadOutlined />
                  </label>
                </div>
              </div>
            </div>
            <form
              action=""
              className="profile__info"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="input__container">
                <div className="profile__info__left">
                  <h2>Infomation</h2>
                  <div className="input__box">
                    <label htmlFor="name">User name:</label>
                    <input
                      type="text"
                      {...register("username", {
                        required: true,
                      })}
                    />
                    {errors.username && (
                      <p className="error-message">
                        User name is required
                      </p>
                    )}
                  </div>
                  <div className="input__box">
                    <label htmlFor="name">Email: </label>
                    <input
                      type="text"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <p className="error-message">
                        Email is required
                      </p>
                    )}
                  </div>
                  <div className="input__box">
                    <label htmlFor="name">Address:</label>
                    <input
                      type="text"
                      {...register("address", {
                        required: true,
                      })}
                    />
                    {errors.address && (
                      <p className="error-message">
                        Address is required
                      </p>
                    )}
                  </div>
                  <div className="input__box">
                    <label htmlFor="name">Contact:</label>
                    <input
                      type="text"
                      {...register("contact", {
                        required: true,
                      })}
                    />
                    {errors.contact && (
                      <p className="error-message">
                        Contact is required
                      </p>
                    )}
                  </div>
                </div>
                <div className="profile__info__right">
                  <h2>Auth</h2>
                  <div className="input__box">
                    <label htmlFor="name">Old Password:</label>
                    <input
                      type={showPassword ? "password" : "text"}
                      {...register("oldPassword", {})}
                    />
                    <span
                      className="eye"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </span>
                  </div>
                  <div className="input__box">
                    <label htmlFor="name">New Password:</label>
                    <input
                      type={showPassword ? "password" : "text"}
                      {...register("newPassword", {})}
                    />
                    <span
                      className="eye"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </span>
                  </div>
                  <div className="input__box">
                    <label htmlFor="name">
                      Confirm Password:
                    </label>
                    <input
                      type={showPassword ? "password" : "text"}
                      {...register("confirmPassword", {})}
                    />
                    <span
                      className="eye"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <button className="btn__profile">Oke</button>
            </form>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProfilePage;
