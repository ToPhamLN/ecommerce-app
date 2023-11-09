import React from "react";
import { NavLink } from "react-router-dom";
import {
  BiSolidUserRectangle,
  BiSolidHome,
  BiSolidDashboard,
  BiLogoProductHunt,
  BiSolidDiscount,
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
            <NavLink
              to={routes.dashboard}
              link-name="Dashboard"
              className="item__sidebar"
            >
              <BiSolidHome />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.process}
              link-name="Process"
              className="item__sidebar"
            >
              <SiProcesswire />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.order}
              link-name="Order"
              className="item__sidebar"
            >
              <TbBrandBinance />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.payment}
              link-name="Payment"
              className="item__sidebar"
            >
              <RiMoneyDollarBoxFill />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.product}
              link-name="Product"
              className="item__sidebar"
            >
              <BiLogoProductHunt />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.category}
              link-name="Category"
              className="item__sidebar"
            >
              <BiSolidDashboard />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.brand}
              link-name="Brand"
              className="item__sidebar"
            >
              <TbBrandAbstract />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.discount}
              link-name="Discount"
              className="item__sidebar"
            >
              <BiSolidDiscount />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.user}
              link-name="User"
              className="item__sidebar"
            >
              <BiSolidUserRectangle />
            </NavLink>
          </li>
        </ul>
      </aside>
    </React.Fragment>
  );
};

export default Sidebar;
