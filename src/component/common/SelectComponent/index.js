import React from "react";
import Select from "react-select";

export const SelectComponent = ({ options, value, onChange }) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "gold" : "#000",
      padding: 10,
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return { ...provided, opacity, transition };
    },
  };

  return (
    <div>
      <Select
        styles={customStyles}
        value={value}
        options={options}
        onChange={onChange}
      />
    </div>
  );
};
