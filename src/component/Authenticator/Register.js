import axios from "axios";
import { NormalInput } from "component/common/NormalInput";
import React, { useState } from "react";
import "./style.scss";

export const Register = () => {
  // const [registerData, setRegisterData] = useState([{}]);

  const [registerUser, setRegisterUser] = useState({
    userName: "",
    passWord: "",
    emailId: "",
  });

  const handleRegisterChange = (e) => {
    e.persist();
    const { name, value } = e.target || e || {};
    setRegisterUser({ ...registerUser, [name]: value });
  };

  // const AddRegister = (e) =>{
  //   e.preventDefault();
  //   const obj = {userName:registerUser.userName, passWord:registerUser.passWord, emailId:registerUser.emailId};
  //   let datum = registerData;
  //   datum.push(obj);
  //   setRegisterData([...datum]);
  //   localStorage.setItem("registeredUsers", JSON.stringify(registerData));
  // }

  const sendRegisterData = async () => {
    await axios.post("http://localhost:3003/users", registerUser);
  };

  const handleRegisterSubmit = async () => {
    sendRegisterData();
    await axios.get("http://localhost:3003/users").then((result) => {
      return result?.data?.find((item) => {
        if (
          item.userName === registerUser.userName &&
          item.passWord === registerUser.passWord
        ) {
          console.log("failed!");
        }
      });
    });
  };

  return (
    <div className="row">
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
