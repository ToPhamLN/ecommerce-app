import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../assets/css/Register.css";
import posterImg from "../../assets/imgs/poster.jpg";
import Loading from "../../components/Loading.jsx";
import { userRequest } from "../../config/apiRequest";
import { routes } from "../../config/routes.js";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(userRequest.register, data);
      console.log(res.data);
      toast.success("Register successfully!", {
        autoClose: 1000,
      });
      setTimeout(() => navigate(routes.login), 2000);
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
      <div className="container__auth">
        <section className="form__auth">
          <div className="poster">
            <img src={posterImg} alt="" />
          </div>
          <form
            className="auth"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="title__auth">Register</h1>
            <span className="desc__auth">
              Welcome to E-commerce
            </span>
            <div className="input__box">
              <input
                type="text"
                className="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="error-message">
                  Email is required
                </p>
              )}
            </div>
            <div className="input__box">
              <input
                type="text"
                className="username"
                placeholder="User name"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="error-message">
                  Username is required
                </p>
              )}
            </div>
            <div className="input__box">
              <input
                type="text"
                className="address"
                placeholder="Address"
                {...register("address", { required: true })}
              />
              {errors.address && (
                <p className="error-message">
                  Address is required
                </p>
              )}
            </div>
            <div className="input__box">
              <input
                type="text"
                className="contact"
                placeholder="Contact"
                {...register("contact", { required: true })}
              />
              {errors.contact && (
                <p className="error-message">
                  Contact is required
                </p>
              )}
            </div>
            <div className="input__box">
              <input
                type={showPassword ? "text" : "password"}
                className="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <span
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
              {errors.password && (
                <p className="error-message">
                  Password is required
                </p>
              )}
            </div>
            <button type="submit" className="btn__auth">
              Register
            </button>
            <p className="link__auth">
              Already have an account?
              <Link to="/login" className="link__auth link">
                Login
              </Link>
            </p>
          </form>
        </section>
      </div>
      {loading && <Loading />}
    </React.Fragment>
  );
};

export default RegisterPage;
