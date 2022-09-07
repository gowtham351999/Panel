// import React, { Component } from "react";
// import { Navbar } from "component/common/Navbar";
// import Sidebar from "component/common/Sidebar";
// import "assets/scss/layouts/AdminLayout.scss";
// import "react-perfect-scrollbar/dist/css/styles.css";

// import { history } from "service/helpers";

// export class AdminLayout extends Component {
//   state = {
//     profilemenu: false,
//   };

//   componentDidMount = () => {
//     let authToken = localStorage.getItem("adminAuthToken");
//     if (!authToken) {
//       history.push("/");
//     }
//   };

//   //handle Profile Menu
//   handleProfileMenu = (event, active) => {
//     event.stopPropagation();
//     this.setState({
//       profilemenu: active,
//     });
//   };

//   render() {
//     let { children } = this.props;

//     let { menuOpenClass } = this.state;

//     return (
//       <div id="main-content" onClick={(e) => this.handleProfileMenu(e, false)}>
//         <div className="content-wrapper">
//           <Navbar />
//           <Sidebar menuOpen={menuOpenClass} />
//           <div className="content-layout">{children}</div>
//         </div>
//       </div>
//     );
//   }
// }
