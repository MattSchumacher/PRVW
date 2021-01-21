import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const Landing = (props) => {
    const { auth, profile } = props;
    if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
    
    if (auth){

        const lastLogin = parseInt(auth.lastLoginAt);
        var timeStamp = new Date(lastLogin);
        var date = moment(timeStamp).calendar();

        return (
        <div className="dashboard container">
            <h3 className="padding page-title">Home</h3>
            <div className="section project-details">
                <div className="card z-depth-1">
                    <div className="card-content margin-bottom-60">
                        <h4>BTS530 Sprint 2</h4>
                        <p><bold>November 3rd, 2020</bold></p>
                        <p>Rivia is a platform for marketers and content creators to change information for future works.
                            <br></br>
                            We are creating a platform for digital marketers to be able to browse work done by other content creators, or view the work done by various agencies.</p>
                            <br></br>
                        <p>Matt Schumacher</p>
                    </div>
                </div>
            </div>
        </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading landing page...</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, null)(Landing)
