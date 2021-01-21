import React from 'react'
import { NavLink } from 'react-router-dom'

const SchoolLinks = () => {

    return(
        <ul className="center">
            <li><NavLink to='/' className="sidenav-close btn home-button">Home</NavLink></li>
            <li><NavLink to='/announcements' className="sidenav-close btn post-button">Post Listings</NavLink></li>
        </ul>
    )

}

    

export default SchoolLinks