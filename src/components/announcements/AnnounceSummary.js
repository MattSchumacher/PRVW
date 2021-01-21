import React from "react";
import moment from "moment";
import "./AnnounceSummary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const AnnounceSummary = ({ announce }) => {
  let currentlikes = announce?.likes || [];
  console.log(announce, "==> announce details");
  return (
    <div class="col s12 m6 main-card">
      <div class="card post-card">
        <div class="card-image">
          <img
            src={
              announce.avatarURL ||
              "https://www.churchtrac.com/articles/apple/uploads/2017/09/Antu_insert-image.svg_-1184x1184.png"
            }
          />
          {/* <div className="glass-details" style={{ backgroundImage: `url(${announce.avatarURL})` }}></div>
          <span class="card-title-name">{announce.title}</span> */}
          <div class="card-details">
            <span class="card-title-name">{announce.title}</span>
            <div class="card-info">
              <span class="card-name">{`${announce.authorFirstName} ${announce.authorLastName}`}</span>
              <span class="card-likes"><FontAwesomeIcon icon={faHeart} /> {currentlikes.length}</span>
            </div>
          </div>

        </div>
        {/* <div class="card-content">
          <p>{announce.content}</p>
        </div> */}
      </div>
     
    </div>
  );
};

export default AnnounceSummary;