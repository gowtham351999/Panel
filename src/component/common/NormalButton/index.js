import React, { Component } from "react";
/**
 * Button: The Common Re-usable Button across website.
 * @return {JSX.Element} The JSX Code for Button
 */
export class NormalButton extends Component {
  render() {
    const {
      className = "",
      label = "",
      onClick,
      id,
      disabled = false,
      viewButtonHeader = false,
      viewButtonColorHeader = false,
      primary = false,
    } = this.props;

    return (
      <button
        id={id}
        className={`btn cursor-pointer d-flex justify-content-center align-items-center
          ${primary ? "primary-btn" : ""}
          ${viewButtonHeader ? "viewButtonHeader" : ""}
          ${viewButtonColorHeader ? "viewButtonColorHeader" : ""}
          ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        <span className="m-auto">{label}</span>
      </button>
    );
  }
}
