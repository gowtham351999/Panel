import React, { Component } from "react";
import "../assets/scss/layouts/AuthLayout.scss";
import imageLeft from "assets/images/imageLft_login.png";

export class AuthLayout extends Component {
  render() {
    return (
      <div className="login-wrapper">
        <div className="d-flex w-md-100 h-100 left-area">
          <div className="col-6 d-md-block d-none px-0">
            <div className="login-left-area">
              <div className="login-content-area h-100">
                <img className="w-100 h-100" src={imageLeft} alt="Logo" />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 px-0 login-area">
            <div className="center-view-login mx-auto col-8 h-100">
              <div className="card w-100">
                <form
                  className="w-100 h-100"
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  {this.props.children}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
