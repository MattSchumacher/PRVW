import React, { useState } from "react";
import {Modal, Button, Icon} from 'react-materialize'
import { connect } from "react-redux";
import * as moment from 'moment'
import { useSelector } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import {
  deleteAnnounce,
  updateAnnounce,
} from "../../store/actions/announceActions";

import AnnounceComments from "./AnnounceComments";
import useEventListener from "@use-it/event-listener";
import FastAverageColor from 'fast-average-color';
import getAverageColor from 'get-average-color'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCoffee, faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import unique from "lodash.uniq";
import "./AnnounceDetails.css";

const AnnounceDetails = (props) => {
  const deleteHandler = (id) => {
    deleteAnnounce(id);
    props.history.push("/announcements");
  };
  const { announce, auth, profile, deleteAnnounce, updateAnnounce, id } = props;

  const saveHandler = () => {
    updateAnnounce(id, { title: newTitle, content: newContent });
    setIsInEditMode(false);
  };

  
  let currentlikes = announce?.likes || [];
  const isLiked = currentlikes.includes(props.auth.uid);

  const handleLike = () => {
    if (isLiked) {
      updateAnnounce(id, {
        likes: currentlikes.filter((uid) => uid !== props.auth.uid),
      });
    } else {
      updateAnnounce(id, { likes: unique([...currentlikes, props.auth.uid]) });
    }
  };

  useEventListener("keydown", (e) => {
    if (e.keyCode == 27) setIsInEditMode(false);
  });

  const [IsInEditMode, setIsInEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const [newContent, setNewContent] = useState("");

  if (!auth.uid) return <Redirect to="/signin" />; // redirect to signin if user is not logged in

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  let hashtagsEmpty = true;
  if (announce) {
    if (!isEmpty(announce.hashtags)) {
      hashtagsEmpty = false;
    }

    // getAverageColor(announce.avatarURL).then(rgb => console.log("test"+rgb)) // { r: 66, g: 83, b: 25 }
    let image = announce.avatarsArray[0];
    let facColor;
    console.log(image)
    const fac = new FastAverageColor();
    fac.getColorAsync(image, {
      ignoredColor: [
        [255, 255, 255, 255], // white
        [0, 0, 0, 255] // black
    ]
    })
        .then(color => {
          facColor = color.rgba;
          console.log(color);
          // leftSection.style.color = color.isDark ? '#fff' : '#000';
        })
        .catch(e => {
            console.log(e);
        });
  
    return (
      <div>
        <div className="main-content">

              <div className="leftSection">
                {announce.avatarURL && (
                  <img
                    src={announce.avatarURL}
                    alt="image_content"
                  ></img>
                )}
                <div className="buttons">
                  <div className="action-buttons">
                    
                  <Modal
                    actions={[
                      <div>
                        <Button flat modal="close" node="button" waves="light">Cancel</Button>
                        <Button flat modal="close" flat node="button" waves="light" className="red" onClick={() => deleteHandler(id)}>Delete</Button>
                      </div>
                    ]}
                    header='Confirm Delete'
                    trigger={<span className="delete-button action-button"><FontAwesomeIcon icon={faTimes} /></span>}>
                    <Button waves="green" flat></Button>
                    

                  </Modal>

                    
                    {/* <span className="delete-button action-button" onClick={() => deleteHandler(id)}><FontAwesomeIcon icon={faTimes} /></span> */}
                    {!IsInEditMode ? (
                      <span className="edit-button action-button"
                        onClick={() => {
                          setIsInEditMode((IsInEditMode) => !IsInEditMode);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </span>
                    ) : (
                      <button onClick={() => saveHandler()}>Save Changes</button>
                    )}
                  </div>
                  <span
                    onClick={handleLike}
                    className="image-content-section__likeButton like-button action-button"
                  >
                    {isLiked ? (
                      <FontAwesomeIcon icon={faHeart} />
                    ) : (
                      <FontAwesomeIcon icon={faHeartOutline} />
                    )}
                    <span className="image-content-section__likesCounter">
                      {currentlikes.length}
                    </span>
                  </span>
                </div>
                 
              </div>
              <div className="right-section">
                <div className="right-section-details">

                
                <div className="row">
                  {IsInEditMode ? (
                    <>
                      <input
                        type="text"
                        placeholder="Change Title Here"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                      />
                    </>
                  ) : (
                    //   <input type="text">TestTitle</input>
                    <span
                      className="right-section-title"
                      onClick={() => {
                        setIsInEditMode((IsInEditMode) => !IsInEditMode);
                      }}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {announce.title}
                    </span>
                  )}

                  <span className="card-date">
                    <br />
                    {moment(Date(announce.createdAt)).format('DD/MM/YYYY')}
                  </span>
                </div>

              {IsInEditMode ? (
                <>
                  <input
                    type="text"
                    placeholder="Change Description Here"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                  />
                </>
              ) : (
                <p className="content-section">{announce.content}</p>
              )}

              <span className="hashtag-section">
                <p>Tags</p>
              </span>

              {announce.hashtags &&
                !hashtagsEmpty &&
                announce.hashtags.map((hashtag) => {
                  return (
                    <span className="chip red darken-3 white-text ">
                      {hashtag}
                    </span>
                  );
                })}

              {announce.videoURL && (
                <video width="320" height="240" controls>
                  <source src={announce.videoURL} type="video/mp4"></source>
                  <source src={announce.videoURL} type="video/ogg"></source>
                  Your browser does not support the video tag.
                </video>
              )}
               
            </div>
            <AnnounceComments
              announce={announce}
              updateAnnounce={updateAnnounce}
              id={id}
            />
          </div>
        </div>
        {/* <div className="container section announce-details "></div> */}
        
      </div>
    );
  } else {
    return (
      <div className="container center">
        <h5>Loading announcements...</h5>
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAnnounce: (announce) => dispatch(deleteAnnounce(announce)),
    updateAnnounce: (id, payload) => dispatch(updateAnnounce(id, payload)),
  };
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const announces = state.firestore.data.announces;
  const announce = announces ? announces[id] : null;
  return {
    announce: announce,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    id: ownProps.match.params.id,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "announces" }])
)(AnnounceDetails);
