import axios from "axios";
import { NormalInput } from "component/common/NormalInput";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { history } from "service/helpers";
import "./style.scss";

export const Login = () => {
  const [loginUser, setLoginUser] = useState({
    userName: "",
    passWord: "",
  });

  const [userDatum, setUserDatum] = useState({ id: "" });

  const [formError, setFormError] = useState({
    userName: "",
    passWord: "",
  });

  const notify = () => toast("Successfully logged out!");

  const getLogOut = localStorage.getItem("logOut");

  useEffect(() => {
    if (getLogOut) {
      notify();
    }
    setTimeout(() => {
      localStorage.clear();
    }, 1000);
  }, []);

  const handleLoginChange = (e) => {
    e.persist();
    const { name, value } = e.target || e || {};
    setLoginUser({ ...loginUser, [name]: value });
  };

  // let getUserDetail = JSON.parse(localStorage.getItem("registeredUsers"));

  // const validateLogin = (e) => {
  //   if (!loginUser.userName && !loginUser.passWord) {
  //     setFormError({
  //       ...formError,
  //       userName: "Please enter username!",
  //       passWord: "Please enter password!",
  //     });
  //   } else if (loginUser.passWord.length < 3) {
  //     setFormError({
  //       ...formError,
  //       passWord: "Please enter correct password!",
  //     });
  //   }
  //   return getUserDetail?.map((item) => {
  //     if (
  //       item?.userName === loginUser.userName &&
  //       item?.passWord === loginUser.passWord
  //     ) {
  //       history.push("/dashboard/user-add");
  //       localStorage.setItem("userName", JSON.stringify(loginUser.userName));
  //     } else {
  //       console.log("failed");
  //     }
  //   });
  // };

  const ValidateLoginHandler = async (e) => {
    e.preventDefault();
    if (!loginUser.userName && !loginUser.passWord) {
      setFormError({
        ...formError,
        userName: "Please enter username!",
        passWord: "Please enter password!",
      });
    } else if (loginUser.passWord.length < 3) {
      setFormError({
        ...formError,
        passWord: "Please enter correct password!",
      });
    } else {
      await axios.get("http://localhost:3003/users").then((res) => {
        return res?.data?.find((item) => {
          // if(item.userName === "jojo" && item.passWord === "3636") {
          //   localStorage.setItem(
          //     "adminName",
          //     JSON.stringify(loginUser.userName)
          //   );
          //   history.push("/dashboard/view");
          // }

          if (
            item?.userName === loginUser.userName &&
            item?.passWord === loginUser.passWord
          ) {
            history.push("/dashboard/view");
            localStorage.setItem(
              "userName",
              JSON.stringify(loginUser.userName)
            );
          } else {
            console.log("Authentication Failed!");
          }
        });
      });
    }
  };

  // const handleLoginSubmit = async (e) => {
  //   e.preventDefault();
  //   await axios.get("http://localhost:3003/users").then((res) => {
  //     return res?.data?.map((item) => {
  //       if (
  //         item.userName === loginUser.userName &&
  //         item.passWord === loginUser.passWord
  //       ) {
  //         return history.push('/home/view');
  //       } else {
  //         history.push("/home/register");
  //       }
  //     });
  //   });
  // };

  const getUserId = async () => {
    await axios.get("http://localhost:3003/users").then((data) => {
      return data?.data?.find((i) => {
        if (i.userName === loginUser.userName) {
          setUserDatum({ ...userDatum, id: i.id });
          if (userDatum.id === i.id) {
            history.push(`/home/forgot-password/${userDatum.id}`);
          }
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
                <p className="text-light fs-32 fw-800 text-center">Sign In</p>
                <div className="form-group my-2">
                  <NormalInput
                    type="text"
                    label="UserName"
                    name="userName"
                    value={loginUser.userName}
                    onChange={handleLoginChange}
                  />
                  {formError.userName && (
                    <p className="text-danger">{formError.userName}</p>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group my-2">
                  <NormalInput
                    label="Password"
                    type="password"
                    name="passWord"
                    value={loginUser.passWord}
                    onChange={handleLoginChange}
                  />
                  {formError.passWord && (
                    <p className="text-danger">{formError.passWord}</p>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-content-end">
                  <div>
                    <p
                      className="text-light fw-800 m-0 cursor-pointer"
                      onClick={getUserId}
                    >
                      forgot password?
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <button
                  onClick={ValidateLoginHandler}
                  className="btn btn-success mt-4 mx-auto d-block p-3 px-5"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
