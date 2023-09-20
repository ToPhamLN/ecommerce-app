import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Register.css";
import posterImg from "../../assets/imgs/poster.jpg";

const LoginPage = () => {
  return (
    <React.Fragment>
      <div className="container__auth">
        <section className="form__auth">
          <div className="poster">
            <img src={posterImg} alt="" />
          </div>
          <form action="" className="auth">
            <h1 className="title__auth">Login</h1>
            <span className="desc__auth">
              Welcome to E-commerce
            </span>

            <input
              type="text"
              className="username"
              placeholder="User name"
            />
            <input
              type="password"
              className="password"
              placeholder="Password"
            />
            <button className="btn__auth">Login</button>
            <p className="link__auth">
              Do not have an account yet?
              <Link to="/register" className="link__auth">
                Login
              </Link>
            </p>
          </form>
        </section>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
