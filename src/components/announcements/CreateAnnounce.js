import React, { Component } from "react";
import { connect } from "react-redux";
import { createAnnounce } from "../../store/actions/announceActions";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

class CreateAnnounce extends Component {
  state = {
    // firebase auth included as per mapStateToProps
    title: "",
    subtitle: "",
    content: "",

    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",

    video: "",
    isUploadingVid: false,
    progressVid: 0,
    videoURL: "",

    isAddingHashtag: false,
    currentHashtag: "",
    hashtags: [],
    hashtagsToString: "",
    likes: [],
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.createAnnounce(this.state);
    this.props.history.push("/announcements");
  };

  // PHOTOS

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = (progress) => this.setState({ progress });
  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = (filename) => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ avatarURL: url }));
  };

  // VIDEOS

  isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  handleUploadStartVid = () =>
    this.setState({ isUploading: true, progress: 0 });
  handleProgressVid = (progress) => this.setState({ progress });
  handleUploadErrorVid = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccessVid = (filename) => {
    this.setState({ video: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("videos")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ videoURL: url }));
  };

  handleHashtagEnable = () => {
    this.setState({ isAddingHashtag: !this.state.isAddingHashtag });
  };

  handleAddHashtag = () => {
    this.handleHashtagEnable();
    let updatedArray = this.state.hashtags;
    updatedArray.push(this.state.currentHashtag);
    this.setState({ hashtags: updatedArray });
  };

  render() {
    let hashtagsEmpty = true;

    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />; // redirect to signin if user is not logged in

    const isEmpty = (obj) => {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    };

    if (!isEmpty(this.state.hashtags)) {
      hashtagsEmpty = false;
    }

    return (
      <div className="container z-depth-1 margin-bottom-60">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create New Post</h5>
          <div className="input-field">
            <label htmlFor="email">Post Title</label>
            <input
              type="text"
              id="title"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="content">Post Content</label>
            <textarea
              id="content"
              className="materialize-textarea"
              onChange={this.handleChange}
              required
            ></textarea>
          </div>

          <div className="input-field">
            {this.state.hashtags &&
              !hashtagsEmpty &&
              this.state.hashtags.map((hashtag) => {
                return (
                  <div className="chip blue darken-3 white-text">{hashtag}</div>
                );
              })}

            {!this.state.isAddingHashtag ? (
              <button
                className="btn pink lighten-1 z-depth-0 hoverable"
                onClick={this.handleHashtagEnable}
              >
                Add New Hashtag
              </button>
            ) : (
              <div>
                <textarea
                  id="currentHashtag"
                  className="materialize-textarea"
                  onChange={this.handleChange}
                  required
                ></textarea>
                <button
                  className="btn pink lighten-1 z-depth-0 hoverable"
                  onClick={this.handleAddHashtag}
                >
                  Confirm New Hashtag
                </button>
              </div>
            )}
          </div>

          <div className="input-field">
            <div>
              {/*
                                <label>Image Title: </label>
                                <input
                                    type="text"
                                    value={this.state.username}
                                    name="username"
                                    onChange={this.handleChangeUsername}
                                />
                            */}
              <label>Upload An Image:</label>
              <br></br>
              <br></br>
              {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
              {this.state.avatarURL && (
                <img className="img-preview" src={this.state.avatarURL} />
              )}
              {!this.state.avatarURL && (
                <FileUploader
                  accept="image/*"
                  name="avatar"
                  randomizeFilename
                  storageRef={firebase.storage().ref("images")}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
                />
              )}
              <br></br>
              {/* Video Uploader */}

              <label>Upload An Video:</label>
              <br></br>
              <br></br>
              {this.state.isUploadingVid && (
                <p>Progress: {this.state.progressVid}</p>
              )}
              {this.state.videoURL && (
                <video width="320" height="240" controls>
                  <source src={this.state.videoURL} type="video/mp4"></source>
                  <source src={this.state.videoURL} type="video/ogg"></source>
                  Your browser does not support the video tag.
                </video>
              )}

              {!this.state.videoURL && (
                <FileUploader
                  accept="video/*"
                  name="vid"
                  randomizeFilename
                  storageRef={firebase.storage().ref("videos")}
                  onUploadStart={this.handleUploadStartVid}
                  onUploadError={this.handleUploadErrorVid}
                  onUploadSuccess={this.handleUploadSuccessVid}
                  onProgress={this.handleProgressVid}
                />
              )}
            </div>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0 hoverable">
              Create Post
            </button>
          </div>
        </form>
      </div>
    );
  }
}
//  auth is now in state
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAnnounce: (announce) => dispatch(createAnnounce(announce)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAnnounce);
