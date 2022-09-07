import React, { Component } from "react";
import { LoginComp } from "component/auth/login/index";

/**
 * Login: The Login Page of the App
 * @return {JSX.Element} The JSX Code for the Login Page
 */

class Login extends Component {
  render() {
    return <LoginComp {...this.props} />;
  }
}
export default Login;
