import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {

    console.log(props.profile.admin)

    const admin = props.profile.admin ? 'Professor' : ''
    
    if (props.profile != null){
        return(
            <div>  
                <ul className="right">             
                    {/*<li><NavLink to='/create'>New Project</NavLink></li>*/}
                    <li><NavLink to='/' className="sidenav-close btn">Home</NavLink></li>
                    <li><NavLink to='/announcements' className="sidenav-close btn">Post Listings</NavLink></li>
                    <li><button className="btn sidenav-close" onClick={props.signOut}>Log Out</button></li>
                    <li>
                        <NavLink to='/myProfile' className='btn btn-floating btn-large blue lighten-1'>
                            {props.profile.initials}
                        </NavLink>
                    </li>
                    <li>
                    </li>
                </ul>
            </div>  
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)