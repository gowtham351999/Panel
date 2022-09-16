import axios from "axios";
import { NormalInput } from "component/common/NormalInput";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoChevronBackOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { history } from "service/helpers";
import "./style.scss";

export const ForgotPassword = () => {
  const [user, setUser] = useState({
    userName: "",
    passWord: "",
  });

  const [allow, setAllow] = useState(false);

  const { id } = useParams();

  const ref = useRef(null);

  const notify = () => toast("Wrong Username!");

  const copyAlert = () => toast("Copied!");

  const handleLoginChange = (e) => {
    e.persist();
    const { name, value } = e.target || e || {};
    setUser({ ...user, [name]: value });
  };

  const getPasswordHandler = async () => {
    await axios.get(`http://localhost:3003/users/${id}`).then((res) => {
      let resultUserName = res?.data?.userName;
      let resultPassWord = res?.data?.passWord;
      if (resultUserName === user.userName) {
        setAllow(true);
        setUser({ ...user, passWord: resultPassWord });
      } else {
        notify();
      }
    });
  };

  function handleCopy() {
    ref.current.select();
    document.execCommand("copy");
    ref.current.blur();
    copyAlert();
  }

  return (
    <div className="row">
      <Toaster />
      <div className="col-12">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div>
            <div className="auth-login-container p-5">
              <div className="d-flex justify-content-between">
                <div
                  className="pt-1"
                  onClick={() => history.push("/home/login")}
                >
                  <IoChevronBackOutline className="text-warning fs-30 cursor-pointer" />
                </div>
                <div>
                  <p className="text-light fs-30 fw-800">Login</p>
                </div>
                <div></div>
              </div>
              <div className="col-12">
                <div className="form-group my-2">
                  <NormalInput
                    label="Username"
                    type="text"
                    name="userName"
                    value={user.userName}
                    onChange={handleLoginChange}
                  />
                </div>
              </div>
              {allow && (
                <div className="col-12 pt-2">
                  <div className="form-group my-2">
                    <label className="font-weight-normal mb-1 text-light">
                      Password:
                    </label>
                    <input
                      label="Password"
                      className="form-control p-3"
                      ref={ref}
                      name="passWord"
                      value={user.passWord}
                      onChange={handleLoginChange}
                    />
                  </div>
                </div>
              )}
              {/* <input ref={passwordRef} /> <button onClick={handleCopy}>c</button> */}
              <div className="col-12">
                <button
                  className="btn btn-success mt-4 mx-auto d-block p-3 px-5"
                  onClick={getPasswordHandler}
                >
                  Get Password
                </button>
              </div>
              <div className="col-12">
                <button
                  className="btn btn-success mt-4 mx-auto d-block p-3 px-5"
                  onClick={handleCopy}
                >
                  Copy to the Clipboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
