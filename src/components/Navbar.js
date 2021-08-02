import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../images/logo.png";

const NavBar = (props) => {
  return (
    <div className="nav-bar">
      <img src={Logo} id="logo" />
      <NavLink to="/">Home</NavLink>
        {props.token ? null : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
      )}
      <NavLink to="/Profile">Profile</NavLink>
      <p>Book-Cook!</p>
    </div>
  );
};

export default NavBar;
