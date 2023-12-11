import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillYoutube,
  AiFillGithub,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import "../assets/css/Footer.css";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footerpage">
        <ul className="right">
          <li>
            <span className="item__right">@2023 Morri</span>
          </li>
          <li>
            <Link className="item__right"> Terms</Link>
          </li>
          <li>
            <Link className="item__right">About Us</Link>
          </li>
          <li>
            <Link className="item__right">Privacy</Link>
          </li>
        </ul>
        <ul className="left">
          <li>
            <Link className="item__left">
              <AiFillFacebook />
            </Link>
          </li>
          <li>
            <Link className="item__left">
              <AiFillInstagram />
            </Link>
          </li>
          <li>
            <Link className="item__left">
              <AiFillGithub />
            </Link>
          </li>
          <li>
            <Link className="item__left">
              <AiFillYoutube />
            </Link>
          </li>
        </ul>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
