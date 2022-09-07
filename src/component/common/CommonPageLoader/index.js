import React, { Component } from "react";
import "./style.scss";
/**
 * Loader : The Common Re-usable Loader across website.
 * @return {JSX.Element} The JSX Code for Loader
 */
export class CommonPageLoaderClass extends Component {
  render() {
    let { isSpinningLoader = false } = this.props;
    return !isSpinningLoader ? (
      <div className="loader">
        <div className="loader-circle" />
      </div>
    ) : (
      <div className="lds-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}

export const CommonPageLoader = CommonPageLoaderClass;
