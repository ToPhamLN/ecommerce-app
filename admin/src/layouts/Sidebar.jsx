import React from "react";
import { Link } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import {
  BiSolidUserRectangle,
  BiSolidHome,
  BiSolidDashboard,
  BiLogoProductHunt,
} from "react-icons/bi";
import { TbBrandBinance, TbBrandAbstract } from "react-icons/tb";
import { SiProcesswire } from "react-icons/si";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { routes } from "../config/routes";
import "../assets/css/Sidebar.css";

const Sidebar = () => {
  return (
    <React.Fragment>
      <aside className="sidebar">
        <ul>
          <li>
            <Link
              to={routes.dashboard}
              link-name="Dashboard"
              className="item__sidebar"
            >
              <BiSolidHome />
            </Link>
          </li>
          <li>
            <Link
              to={routes.process}
              link-name="Process"
              className="item__sidebar"
            >
              <SiProcesswire />
            </Link>
          </li>
          <li>
            <Link
              to={routes.order}
              link-name="Order"
              className="item__sidebar"
            >
              <TbBrandBinance />
            </Link>
          </li>
          <li>
            <Link
              to={routes.payment}
              link-name="Payment"
              className="item__sidebar"
            >
              <RiMoneyDollarBoxFill />
            </Link>
          </li>
          <li>
            <Link
              to={routes.product}
              link-name="Product"
              className="item__sidebar"
            >
              <BiLogoProductHunt />
            </Link>
          </li>
          <li>
            <Link
              to={routes.category}
              link-name="Category"
              className="item__sidebar"
            >
              <BiSolidDashboard />
            </Link>
          </li>
          <li>
            <Link
              to={routes.brand}
              link-name="Brand"
              className="item__sidebar"
            >
              <TbBrandAbstract />
            </Link>
          </li>
          <li>
            <Link
              to={routes.user}
              link-name="User"
              className="item__sidebar"
            >
              <BiSolidUserRectangle />
            </Link>
          </li>
          <li>
            <Link link-name="Setting" className="item__sidebar">
              <AiFillSetting />
            </Link>
          </li>
        </ul>
      </aside>
    </React.Fragment>
  );
};

export default Sidebar;
