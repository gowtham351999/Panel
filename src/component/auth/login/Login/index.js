import React, { useState } from "react";
import { login } from "action/AuthAct";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import validate from "service/validation";
import ErrorComponent from "component/common/ErrorComponent";
import { validationRules } from "./validate";
import { NormalButton } from "component/common/NormalButton";
const LoginClass = ({ loginApiCall, history }) => {
  const [logindetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isButtonClicked, setisButtonClicked] = useState(false);
  const [error, setErrors] = useState({});

  //handle Change
  const handleChange = ({ target: { name, value } }) => {
    const tempErrors = { ...error };
    tempErrors && tempErrors[name] && (tempErrors[name] = undefined);
    setLoginDetails((prevState) => ({ ...prevState, [name]: value }));
    setErrors({ ...tempErrors });
  };

  //validate Fields
  const validateFields = (data) => {
    const fieldInvalidList = validate(data, validationRules());

    if (fieldInvalidList !== undefined) {
      const errors = { ...fieldInvalidList };
      setErrors({ ...errors });
    }

    return !fieldInvalidList;
  };

  //handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let body = { ...logindetails };
    if (!validateFields(body)) return;
    setisButtonClicked(true);
    loginApiCall(body)
      .then(() => {
        // history.push("/chef/chef-details");
      })
      .catch(() => setisButtonClicked(false));
  };

  return (
    <div className="w-100">
      <h4 className="mb-4 pt-5 text-black-25 line-height-46 fs-36 fw-700 text-center">
        The Chef Lane
      </h4>
      <div className="mt-2 mt-md-3">
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={logindetails.email}
              onChange={(e) => handleChange(e)}
              placeholder="Enter email"
            />
          </div>
          {error.email && <ErrorComponent message={error.email[0]} />}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-group">
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              name="password"
              value={logindetails.password}
              onChange={(e) => handleChange(e)}
              placeholder="Enter password"
            />
            <div className="input-group-addon right">
              <i
                onClick={() => setPasswordVisible(!passwordVisible)}
                className={`cursor-pointer icon-${passwordVisible ? "eye" : "eye-hide"
                  } fs-18`}
              />
            </div>
          </div>
          {error.password && <ErrorComponent message={error.password[0]} />}
        </div>
        <div className="d-flex justify-content-center mt-4 my-3 ">
          <NormalButton
            primary
            label="Sign In"
            className="w-100 fw-700"
            onClick={handleSubmit}
            disabled={isButtonClicked}
          />
        </div>
        <div className="d-flex justify-content-end">
          <p
            className="text-grey-67 fs-14 line-height-16 cursor-pointer fw-600"
            onClick={() => history.push("/auth/forgotpassword")}
          >
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ loginApiCall: login }, dispatch);
};

export const LoginComp = connect(null, mapDispatchToProps)(LoginClass);
