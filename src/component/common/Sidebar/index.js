import React from "react";
import { NavLink } from "react-router-dom";
import { history } from "service/helpers";
import "./sidebar.scss";

export const Sidebar = ({ menuOpen, navLinks }) => {
  const getLink = history.location.pathname;

  

  const extractLink = getLink.split("/");

  const link = extractLink[extractLink.length - (extractLink.length - 1)];

  return (
    <React.Fragment>
      {!menuOpen ? (
        <div className="left-menu">
          <ul>
            {navLinks.map(({ to, navContent, label, iconName }, index) => {
              return (
                <li key={index} className="pb-1">
                  <NavLink
                    to={to}
                    className={`${
                      getLink.includes("/dashboard") && "nav-link"
                    } py-3`}
                  >
                    <div className="sidebar-menu">
                      <div className="menu-icon text-left">
                        <span>{iconName}</span>
                      </div>
                      <span className="sidebar-menu-desc fs-16">{label}</span>
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="left-menu-short">
          <ul>
            {navLinks.map(({ to, label, iconName }, index) => {
              return (
                <li key={index} className="pb-1">
                  <NavLink to={to} className="nav-link py-3">
                    <div className="sidebar-menu">
                      <div className="menu-icon text-left">
                        <span>{iconName}</span>
                      </div>
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};
