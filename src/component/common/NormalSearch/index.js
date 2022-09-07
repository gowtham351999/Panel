import React from "react";
import "./NormalSearch.scss";

export const NormalSearch = ({
  placeholder = "",
  onChange = {},
  value = "",
  name = "",
}) => {
  return (
    <div className="normal-search">
      <input
        className="searchBox"
        name={name}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          let body = {};
          let tempVal = e.target.value;

          body = {
            target: {
              name: e.target.name,
              value: tempVal,
            },
          };

          onChange(body);
        }}
      />
      <span className="search-icon">
        <i className="icon-search fs-20" />
      </span>
    </div>
  );
};
