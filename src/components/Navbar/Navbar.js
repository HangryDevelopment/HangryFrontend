import "./Navbar.scss";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBurger } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const navigate = useNavigate();

  let user = JSON.parse(localStorage.getItem("user"));
  let username;
  let isAuthorized;
  if (user) {
    username = user.userName;
    isAuthorized = user.isAuthorized;
    console.log(isAuthorized);
  } else {
    console.log("Could not read from local storage, redirecting to login");
    navigate("/login");
  }

  const doLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar sticky-top bg-dark">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="https://github.com/Chase-Forestello"
            target="_blank"
            rel="noreferrer"
          >
            <span id="navbarLogo">&lt; / &gt;</span>
            <span className="navbar-text">{username}</span>
          </a>
          <NavLink
            exact="true"
            className={(navData) =>
              navData.isActive ? "home-link active" : "home-link"
            }
            to="/hangry"
          >
            <FontAwesomeIcon className="burger-nav-icon" icon={faBurger}>
              Hello
            </FontAwesomeIcon>
          </NavLink>
          {isAuthorized === true ? (
            <span className="logout-btn" onClick={doLogout}>
              Logout
            </span>
          ) : (
            <div></div>
          )}
          <a
            href="https://github.com/HangryDevelopment"
            rel="noreferrer"
            target="_blank"
          >
            <span className={"navbar-text"} id={"navbarCode"}>
              [CODE]
            </span>
          </a>
        </div>
      </nav>
      <div className="alert alert-info" role="alert">
        Hangry is in development. Working on HTTPS for back-end. Currently
        hosting the back-end on Glitch as a workaround. Enter a location and
        click the "Hangry!" button. Give the server some time to spin up for the
        demo (~1 minute).
      </div>
    </div>
  );
};

export default Navbar;
