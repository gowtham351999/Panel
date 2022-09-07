import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogoElectron } from "react-icons/io5";
import { history } from "service/helpers";
import "./navbar.scss";

export const Navbar = ({ handleToggler }) => {
  const [state, setState] = useState(true);

  const handleLogout = () => {
    history.push("/home/login");
  };

  const getAdminName = JSON.parse(localStorage.getItem("adminName"));

  const getUserName = JSON.parse(localStorage.getItem("userName"));

  return (
    <div className="navbar fixed-top px-4 py-3">
      <div className="d-flex justify-content-between w-100 h-100">
        <div>
          <div className="d-flex flex-row">
            <div className="pr-3" onClick={handleToggler}>
              <GiHamburgerMenu className="text-light fs-26 cursor-pointer" />
            </div>
            <div>
              <IoLogoElectron className="fs-30 text-warning fw-800 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end w-100 align-items-center">
          <div className="mr-4 d-flex justify-content-center align-items-center">
            <span className="border-radius-50 profile-name-card">
              {getAdminName
                ? getAdminName?.substring(0, 1)
                : getUserName?.substring(0, 1)}
            </span>
          </div>
          <div
            className="cursor-pointer profile profile-dropdown mr-3"
            onClick={() => setState(!state)}
          >
            <div className="d-flex align-items-center">
              <i className="icon-down-arrow down-icon text-white" />
            </div>
            <ul className={`dropdown ${!state ? "active" : ""}`}>
              <li className="cursor-pointer">
                <i className="icon-settings fs-20 mr-3" />
                Change Password
              </li>
              <li onClick={handleLogout} className="cursor-pointer">
                <i className="icon-logout fs-20 mr-3" />
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
