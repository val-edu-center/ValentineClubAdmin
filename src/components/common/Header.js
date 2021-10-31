import React from "react";
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const Header = ( {session} ) => {
    const loginStyle = { float: 'right'}
    const activeStyle = { color: "#F152BA"}
    return (
        <nav>
            <NavLink to="/" activeStyle={activeStyle} exact >Home</NavLink> 
            {" | "}
            <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
            {" | "}
            <NavLink to="/courses" activeStyle={activeStyle}>Courses</NavLink>
            
            {!session.sessionToken && <NavLink to="/login" style={loginStyle}>Login</NavLink>}  
        </nav>
    )
    
}

function mapStateToProps(state) {
    return {
        session: state.session,
    }
}

Header.propTypes = {
    session: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Header
    );