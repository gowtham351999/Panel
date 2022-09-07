import React, { Component } from "react";
import Select, { components } from "react-select";
import ErrorComponent from "component/common/ErrorComponent";
import "./select.scss";

/**
 * Dropdown: The Common Re-usable Select-Dropdown across website.
 * @return {JSX.Element} The JSX Code for Select-Dropdown
 */

export class NormalSelect extends Component {
  //change select
  handleChange = (newValue) => {
    let { isMulti } = this.props;
    if (!!isMulti) {
      let body = {
        target: {
          name: this.props.name,
          value: [],
        },
      };
      if (!!newValue && newValue.length) {
        newValue.forEach((array) => {
          let obj = {
            value: array.value,
            label: array.label,
          };
          body.target.value.push(obj);
        });
      }
      this.props.handleChange(body);
    } else {
      let body = {
        target: {
          name: this.props.name,
          value: newValue ? newValue.value : "",
          label: newValue ? newValue.label : "",
        },
      };

      this.props.handleChange(body);
    }
  };

  render() {
    let {
      className = "select-form-control w-100",
      options = [],
      value = "",
      name = "",
      placeholder = "Select",
      disabled = false,
      label = "",
      isMulti = false,
      isClearable = false,
      isSearchable = true,
      isBoxShadow = false,
      errorMessage,
    } = this.props;

    const DropdownIndicator = (props) => {
      return (
        components.DropdownIndicator && (
          <components.DropdownIndicator {...props}>
            <i className={`icon-arrow-down fs-9`}></i>
          </components.DropdownIndicator>
        )
      );
    };
    const customStyles = {
      placeholder: (base) => ({
        ...base,
        fontSize: "1em",
        color: "#2D3748",
        fontWeight: 500,
      }),
      indicatorSeparator: (base) => ({
        ...base,
        display: "none",
      }),
      dropdownIndicator: (base) => ({
        ...base,
        padding: 0,
        height: "24px",
        width: "24px",
        color: "#25282b",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }),
      singleValue: (base) => ({
        ...base,
        color: "#2D3748",
      }),
      control: (base) => ({
        ...base,
        borderRadius: 4,
        border: "1px solid #cacccf",
        boxShadow: `${isBoxShadow ? "0px 0px 4px rgba(0, 0, 0, 0.25)" : "0 0"
          } !important`,
        height: "42px",
        outline: "0 ",
        background: "white",
      }),
    };
    return (
      <div className={"select-section"}>
        {label !== "" ? (
          <div>
            <label className="font-weight-normal mb-1">{label}</label>
          </div>
        ) : null}
        {isMulti ? (
          <Select
            className={className}
            classNamePrefix="Select"
            isDisabled={disabled}
            isClearable={isClearable}
            isSearchable={isSearchable}
            name={name}
            options={options}
            onChange={this.handleChange}
            isMulti={true}
            placeholder={placeholder}
            styles={customStyles}
            value={value}
            components={{ DropdownIndicator }}
          />
        ) : (
          <Select
            className={className}
            classNamePrefix="Select"
            isDisabled={disabled}
            isClearable={isClearable}
            isSearchable={isSearchable}
            name={name}
            options={options}
            onChange={this.handleChange}
            isMulti={isMulti}
            placeholder={placeholder}
            styles={customStyles}
            value={
              !!options && options.length > 0
                ? options.find((data) => data.value === value)
                  ? options.find((data) => data.value === value)
                  : null
                : null
            }
            components={{ DropdownIndicator }}
          />
        )}
        {errorMessage && errorMessage !== "" && (
          <ErrorComponent message={errorMessage} />
        )}
      </div>
    );
  }
}
