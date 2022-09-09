import React from "react";

export const Selector = ({ label, name, value, onChange, option }) => {
  return (
    <div className="form-group">
      <label for="exampleFormControlSelect1" className="text-light">
        {label}
      </label>
      <select
        className="form-control"
        id="exampleFormControlSelect1"
        name={name}
        value={value}
        onChange={onChange}
      >
        {option.map(({ id, name }) => {
          return (
            <React.Fragment>
              <option key={id} value={name}>
                {name}
              </option>
            </React.Fragment>
          );
        })}
      </select>
    </div>
  );
};
