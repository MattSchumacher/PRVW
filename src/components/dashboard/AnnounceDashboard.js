import React, { Component } from 'react'
import AnnounceList from '../announcements/AnnounceList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

class AnnounceDashboard extends Component{
    render(){
        const { announces, auth, profile} = this.props
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        console.log(profile)
        return(
            <div className="dashboard container">
                <h3 className="padding page-title">Post Listings</h3>

                <Link to='/createAnnounce'>
                    <button className="btn waves-effect waves-light blue padding-top hoverable">Create New Post</button>
                </Link>
            
                <AnnounceList announces={announces} />
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        announces: state.firestore.ordered.announces, // get from firestore
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'announces', orderBy: ['createdAt', 'desc'] },
    ])
)(AnnounceDashboard)