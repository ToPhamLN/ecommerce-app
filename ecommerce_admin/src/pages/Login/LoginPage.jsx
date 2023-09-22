import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/userSlice.js";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import axios from "axios";

import { userRequest } from "../../config/apiRequest";
import "../../assets/css/Register.css";
import posterImg from "../../assets/imgs/poster.jpg";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(userRequest.login, data);
      console.log(res.data);
      dispatch(setCredentials(res.data));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
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
            action=""
            className="auth"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="title__auth">Login</h1>
            <span className="desc__auth">
              Welcome to E-commerce
            </span>
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
            <button className="btn__auth">Login</button>
            <p className="link__auth">
              Do not have an account yet?
              <Link to="/register" className="link__auth link">
                Register
              </Link>
            </p>
          </form>
        </section>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
