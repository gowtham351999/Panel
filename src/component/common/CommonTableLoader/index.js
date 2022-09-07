import React, { Component } from "react";
import "./style.scss";
/**
 * Table-skeloton-Loader : The Common Re-usable Table-skeloton-Loader across website.
 * @return {JSX.Element} The JSX Code for Table-skeloton-Loader
 */
export class CommonTableLoaderClass extends Component {
  render() {
    let { tdLength = 6 } = this.props;
    return [...Array(8)].map((_, index) => (
      <tr key={index}>
        {[...Array(tdLength)].map((_, tdIndex) => (
          <td key={tdIndex}>
            <div className="ph-loader ph-5h" />
          </td>
        ))}
      </tr>
    ));
  }
}

export const CommonTableLoader = CommonTableLoaderClass;
