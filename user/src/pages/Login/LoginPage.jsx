import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCredentials } from "../../slices/userSlice.js";

import "../../assets/css/Register.css";
import posterImg from "../../assets/imgs/poster.jpg";
import Loading from "../../components/Loading.jsx";
import { userRequest } from "../../config/apiRequest";
import { routes } from "../../config/routes.js";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const res = await axios.post(userRequest.login, data);
      dispatch(setCredentials(res.data));
      setLoading(false);
      toast.success("Login successfully!", {
        autoClose: 1000,
      });
      // setTimeout(() => navigate(routes.home), 2000);
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000,
      });
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
      {loading && <Loading />}
    </React.Fragment>
  );
};

export default LoginPage;
