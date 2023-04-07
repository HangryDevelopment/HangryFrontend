import React from "react";
import "./LandingPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="landing-page-cont">
      <div className="card text-center welcome-card">
        <h4>Hello and Welcome to Hangry!</h4>
        <p className="landing-page-p">
          Hangry is a random restaurant generator for helping you decide where
          to eat!
          <br />
          Click the burger to get started!
        </p>
        <Link to="/login">
          <FontAwesomeIcon className="burger-link" icon={faBurger} />
        </Link>
      </div>
    </div>
  );
};

export default Layout;
