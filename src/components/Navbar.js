import React from 'react';
import {NavLink} from 'react-router-dom'
import Logo from '../images/logo.png'

const NavBar = () => {
  return(
    <div className="nav-bar">
      <img src={Logo} id='logo'/>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>  
            <NavLink to="/Profile">Profile</NavLink>
            <p>Book-Cook!</p>
    </div>

  )
};

export default NavBar;
