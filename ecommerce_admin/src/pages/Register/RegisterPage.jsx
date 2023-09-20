import React from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import "../../assets/css/Register.css";
import posterImg from "../../assets/imgs/poster.jpg";

const RegisterPage = () => {
  const { register, handleSubmit, control } = useForm();
  return (
    <React.Fragment>
      <div className="container__auth">
        <section className="form__auth">
          <div className="poster">
            <img src={posterImg} alt="" />
          </div>
          <form action="" className="auth">
            <h1 className="title__auth">Register</h1>
            <span className="desc__auth">
              Welcome to E-commerce
            </span>
            <input
              type="text"
              className="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            <input
              type="text"
              className="username"
              placeholder="User name"
            />
            <input
              type="text"
              className="address"
              placeholder="Address"
            />
            <input
              type="text"
              className="contact"
              placeholder="Contact"
            />
            <input
              type="password"
              className="password"
              placeholder="Password"
            />
            <button className="btn__auth">Register</button>
            <p className="link__auth">
              Haved account?
              <Link to="/login" className="link__auth">
                Login
              </Link>
            </p>
          </form>
        </section>
      </div>
    </React.Fragment>
  );
};

export default RegisterPage;
