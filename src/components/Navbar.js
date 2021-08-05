// import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Logo from "../images/logo.png";

// const NavBar = (props) => {
//   return (
//     <div className="nav-bar">
//       <img src={Logo} id="logo" />
//       <NavLink to="/">Home</NavLink>
//         {props.token ? null : (
//           <>
//             <NavLink to="/login">Login</NavLink>
//             <NavLink to="/register">Register</NavLink>
//           </>
//       )}
//       <NavLink to="/profile">My Profile</NavLink>
//     </div>
//   );
// };

// export default NavBar;

import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <img src={Logo} id="logo" />
        <NavLink to="/">Home</NavLink>
        {this.props.token ? null : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
        <NavLink to="/profile">My Profile</NavLink>
      </div>
    );
  }
}

export default withRouter(Navbar);
