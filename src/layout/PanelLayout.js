import { Navbar } from "component/common/Navbar";
import { Sidebar } from "component/common/Sidebar";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiUsers } from "react-icons/hi";
import { ImUserTie } from "react-icons/im";
import { useSelector } from "react-redux";

export const PanelLayout = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  let getAdmin = JSON.parse(localStorage.getItem("adminName"));

  const hide = getAdmin === "jojo" ? true : false;

  const { i18n } = useTranslation();

  const selectedLanguage = useSelector((data) => data.commonStore.fileData);

  useEffect(() => {
    if (localStorage.getItem("language") === "Tamil") {
      i18n.changeLanguage("ta");
    }
    if (localStorage.getItem("language") === "English") {
      i18n.changeLanguage("en");
    }
  }, [selectedLanguage]);

  const navLinks = [
    {
      id: 0,
      to: "/dashboard/view",
      navContent: "/dashboard",
      label: "GeneralProfile",
      iconName: <HiUsers className="text-light fs-20" />,
      hideLabel: hide,
    },
    {
      id: 1,
      to: "/user/user-add",
      navContent: "/user",
      label: "UserProfile",
      iconName: <ImUserTie className="text-light fs-20" />,
      hideLabel: hide,
    },
  ];

  const toggleHandler = () => {
    setToggle(!toggle);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <Navbar handleToggler={toggleHandler} />
          <Sidebar navLinks={navLinks} menuOpen={toggle} />
          <div className="pt-5 mt-3">{children}</div>
        </div>
      </div>
    </div>
  );
};
