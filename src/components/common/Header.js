import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    const activeStyle = { color: "#F152BA"}

    return (
        <nav>
            <NavLink to="/" activeStyle={activeStyle} exact >Home</NavLink> 
            {" | "}
            <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
            {" | "}
            <NavLink to="/courses" activeStyle={activeStyle}>Courses</NavLink>
            {" | "}
            <NavLink to="/accounts" activeStyle={activeStyle}>Accounts</NavLink>
        </nav>
    )
}

export default Header;