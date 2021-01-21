import React, { useState } from "react";
import { useSelector } from "react-redux";
import ISOStringToReadableDate from "../../util/ISOStringToReadableDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./AnnounceComments.css";
// import { useSelector, useDispatch} from "react-redux";
// import "./AnnounceComments.css";

// Add a new comment
const NewCommentSection = ({ addNewComment }) => {
  const profile = useSelector((state) => state.firebase.profile);

  const [commentText, setCommentText] = useState("");
  const handleSumbit = (e) => {
    e.preventDefault();
    addNewComment({
      fullName: `${profile.firstName} ${profile.lastName}`,
      date: new Date().toString(),
      content: commentText,
    });
    setCommentText("");
  };

  return (
    <form className="form-section" onSubmit={(e) => handleSumbit(e)}>
      <textarea
        className="comment-textarea"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Leave your comments here"
      />
      <button className="submit-button" type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
    </form>
  );
};

// Individual Comment
const Comment = ({ comment }) => (
  <div className="comment">
    <strong className="comment__fullName">{comment?.fullName}</strong>
    {comment.date && (
      <span className="comment__date">
        {ISOStringToReadableDate(comment.date)}
      </span>
    )}
    <p>{comment.content}</p>
  </div>
);

// Entire comments section
const AnnounceComments = ({ announce, updateAnnounce, id }) => {
  

  const addNewComment = (newComment) => {
    let currentComments = announce.comments || [];

    updateAnnounce(id, {
      comments: [newComment, ...currentComments],
    });
  };
  return (
    <section className="announce-comments-section">
      <NewCommentSection addNewComment={addNewComment} />
      {/* <hr /> */}
      {announce.comments &&
        announce.comments.map((comment) => <Comment comment={comment} />)}
    </section>
  );
};

export default AnnounceComments;
