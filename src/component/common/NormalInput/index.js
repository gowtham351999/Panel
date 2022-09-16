import ErrorComponent from "component/common/ErrorComponent";
import React from "react";
import "./NormalInput.scss";
/**
 * Input: The Common Re-usable input across website.
 * @return {JSX.Element} The JSX Code for Input
 */
export const NormalInput = ({
  placeholder = "",
  subClassName = "",
  className,
  label = "",
  onChange,
  value = "",
  name = "",
  disabled = false,
  type,
  icon,
  errorMessage = "",
  maxLength,
  ref,
}) => {
  return (
    <>
      <div className={`normal-input ${subClassName ? subClassName : ""}`}>
        {label !== "" ? (
          <label className="font-weight-normal mb-1 text-light">{label}</label>
        ) : null}
        <div className="d-block">
          <input
            className={`${className} form-control form-control-lg w-100`}
            name={name}
            ref={ref}
            type={type}
            disabled={disabled}
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={onChange}
          />
          {icon ? <span className="icon">{icon}</span> : null}
        </div>
      </div>
      {errorMessage && errorMessage !== "" && (
        <ErrorComponent message={errorMessage} />
      )}
    </>
  );
};
