import axios from "axios";
import { NormalInput } from "component/common/NormalInput";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { history } from "service/helpers";
import "./style.scss";

export const Register = () => {
  // const [registerData, setRegisterData] = useState([{}]);

  const [registerUser, setRegisterUser] = useState({
    userName: "",
    passWord: "",
    emailId: "",
  });

  const [formError, setFormError] = useState({
    userName: "",
    passWord: "",
    emailId: "",
    allow: false,
  });

  const handleRegisterChange = (e) => {
    e.persist();
    const { name, value } = e.target || e || {};
    setRegisterUser({ ...registerUser, [name]: value });
  };

  const notify = (value) => toast(value);

  // const AddRegister = (e) =>{
  //   e.preventDefault();
  //   const obj = {userName:registerUser.userName, passWord:registerUser.passWord, emailId:registerUser.emailId};
  //   let datum = registerData;
  //   datum.push(obj);
  //   setRegisterData([...datum]);
  //   localStorage.setItem("registeredUsers", JSON.stringify(registerData));
  // }

  const validateRegisterHandler = () => {
    if (
      !registerUser.userName &&
      !registerUser.passWord &&
      !registerUser.emailId
    ) {
      setFormError({
        ...formError,
        userName: "Please enter the username!",
        passWord: "Please enter the password!",
        emailId: "Please enter the emailId!",
        allow: true,
      });
    } else if (registerUser.passWord.length < 3) {
      setFormError({
        ...formError,
        passWord: "Please enter correct password!",
        allow: true,
      });
    }
  };

  const sendRegisterData = async () => {
    await axios.post("http://localhost:3003/users", registerUser);
    history.push('/home/login');
  };

  const handleRegisterSubmit = async () => {
    validateRegisterHandler();
    sendRegisterData();
    await axios.get("http://localhost:3003/users").then((result) => {
      return result?.data?.find((item) => {
        if (
          (item.userName === registerUser.userName &&
            item.passWord === registerUser.passWord) ||
          (!registerUser.userName && !registerUser.passWord)
        ) {
          notify("failed!");
        }
      });
    });
  };

  return (
    <div className="row">
      <Toaster />
      <div className="col-12">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div>
            <div className="auth-login-container p-5">
              <div className="col-12">
                <p className="text-light fs-32 fw-800 text-center">Sign Up</p>
                <div className="form-group my-2">
                  <NormalInput
                    type="text"
                    label="UserName"
                    name="userName"
                    value={registerUser.userName}
                    onChange={handleRegisterChange}
                  />
                  {formError.userName && (
                    <p className="text-danger">{formError.userName}</p>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group my-2">
                  <NormalInput
                    type="password"
                    label="Password"
                    name="passWord"
                    value={registerUser.passWord}
                    onChange={handleRegisterChange}
                  />
                  {formError.passWord && (
                    <p className="text-danger">{formError.passWord}</p>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group my-2">
                  <NormalInput
                    type="email"
                    label="Email"
                    name="emailId"
                    value={registerUser.emailId}
                    onChange={handleRegisterChange}
                  />
                  {formError.emailId && (
                    <p className="text-danger">{formError.emailId}</p>
                  )}
                </div>
              </div>
              <div className="col-12">
                <button
                  onClick={handleRegisterSubmit}
                  className="btn btn-success mt-4 mx-auto d-block p-3 px-5"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
