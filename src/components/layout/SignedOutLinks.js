import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return(
        <ul className="right">
            <li ><NavLink className="btn"to='/signup'>Signup</NavLink></li>
            <li ><NavLink className="btn" to='/signin'>Log In</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks