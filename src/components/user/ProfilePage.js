import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as firebase from 'firebase/app';
import FileUploader from "react-firebase-file-uploader";
import { signOut } from '../../store/actions/authActions'


class ProfilePage extends Component{
    state = { 
        avatar: "",
        isUploading: false,
        progress: 0,
        avatarURL: "",

        // for password changing
        passwordSuccess: '',
        passwordFail: null,
        isReAuth: false,
        changePasswordEnabled: false,
        inputtedPassword: "",

        oldPass: '',
        newPass: '',
        passErr: ''
    }

    // Profile picture uploader
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };
    handleUploadSuccess = filename => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => this.setState({ avatarURL: url }));
    };

    handleSubmit = (e) => {
        e.preventDefault();

        var user = firebase.auth().currentUser;

        user.updateProfile({
            photoURL: this.state.avatarURL
        }).then(()=>{
            console.log("profile picture was was changed")
        }).catch((err)=>{
            console.log("profile picture update error", err)
        })

        this.props.history.push('/myProfile')
    }

    enableChangePassword = () =>{
        if(!this.state.changePasswordEnabled){
            this.setState({changePasswordEnabled: true})
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log("handleChange called for: " + e.target.id);
        console.log(e.target.value);
    }

    changePassword = (e) =>{
        e.preventDefault();
        var user = firebase.auth().currentUser

        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email, 
            this.state.oldPass
        );

        var newPass = this.state.newPass

        console.log(newPass)

        // reauthenticate user first
        user.reauthenticateWithCredential(credential).then(() => {
            console.log("successfully reauth")

            user.updatePassword(newPass).then(() =>{
                console.log("successfully changed pass to: " + newPass)
            }).catch((error)=> {
                console.log("failed to change pass", error)
            }).then(()=>{
                this.setState({passwordSuccess: "Successfully changed password"});
            })

        }).catch((error) => {
            console.log("error ran into", error)
            this.setState({passwordSuccess: error});
        })

    }

    render(){ 
        const { auth, profile } = this.props

        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

        const url = auth.photoURL ? auth.photoURL : "https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"

        return(
            <div className="dashboard container">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <h3>Profile Page</h3>
                        <p><bold>Profile Picture:</bold></p>
                        <img src={url} 
                            alt="No Profile Picture" 
                            width="35%" 
                            height="35%">
                        </img>
                        <br></br>
                        <p><bold>First Name: </bold> {profile.firstName}</p>
                        <p><bold>Last Name: </bold> {profile.lastName}</p>
                        <p><bold>Email: </bold> {auth.email}</p>
                        <br></br>
                        <div className="card-action">
                        <h4>Change Profile Picture</h4>
                            <form onSubmit={this.handleSubmit} style={{marginTop:0}}>
                                <div className="input-field">
                                    <div>
                                        <label>Upload An Image:</label><br></br><br></br>
                                        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                                        {this.state.avatarURL && <p>New profile picture was uploaded!</p>}
                                        {!this.state.avatarURL && <FileUploader
                                            accept="image/*"
                                            name="avatar"
                                            randomizeFilename
                                            storageRef={firebase.storage().ref("images")}
                                            onUploadStart={this.handleUploadStart}
                                            onUploadError={this.handleUploadError}
                                            onUploadSuccess={this.handleUploadSuccess}
                                            onProgress={this.handleProgress}
                                        />}
                                        <br></br>
                                    </div>
                                </div>
                                {this.state.avatarURL && <button className="btn green" onClick={this.handleSubmit}>Confirm New Profile Picture</button>}
                            </form>
                        </div>
                        <div className="card-action">
                            <h4>Change User Password</h4>
                            {!this.state.changePasswordEnabled && <button className="btn blue" onClick={this.enableChangePassword}>Change Password</button>}
                            {this.state.changePasswordEnabled && 
                                <form onSubmit={this.changePassword} style={{marginTop:0}}>
                                    <div className="input-field">
                                        <label htmlFor="password">Enter existing password</label>
                                        <input type="password" id="oldPass" maxLength="30" size="30" onChange={this.handleChange}/>
                                        </div>
                                    <div className="input-field">
                                        <label htmlFor="password">Enter new password</label>
                                        <input type="password" id="newPass" maxLength="30" size="30" onChange={this.handleChange}/>
                                    </div>
                                    {
                                        // if not empty, confirm
                                        this.state.oldPass.length >= 6 &&
                                        this.state.newPass.length >= 6 &&
                                        <button className="btn green">Confirm New Password</button>
                                    }
                                </form>
                            }

                        {this.state.passwordSuccess && <p>{this.state.passwordSuccess}</p>}
                        </div>

                        <button className="btn waves-effect waves-light red" onClick={signOut}>Log Out</button>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    console.log(state);
    return{
        announces: state.firestore.ordered.announces, // get from firestore
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, null)(ProfilePage)