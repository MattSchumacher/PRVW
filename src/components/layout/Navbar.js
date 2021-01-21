import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import SchoolLinks from "./SchoolLinks";
import { connect } from "react-redux";

const Navbar = (props) => {
  const { auth, profile } = props;
  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );

  if (auth.uid) {
    return (
      <div>
        <nav className="nav-wrapper nav-wrapper-blue">
          <div className="container">
            <Link to="/" className="brand-logo left">
              <img src="/img/prvw-logo.svg" alt="yeah"></img>
            </Link>
            {links}
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <nav className="nav-wrapper nav-wrapper-blue">
        <div className="container">
          <Link to="/" className="brand-logo left">
            <img src="/img/prvw-logo.svg" alt="yeah"></img>
          </Link>
          <SignedOutLinks />
        </div>
      </nav>
    );
  }
};


const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Navbar);
