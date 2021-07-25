import React from 'react'
import {NavLink} from 'react-router-dom'


export default function Navbar() {
    return (
        <ul className="nav">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {props.token ? null : 
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        }
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>
    )
}
