import "./Layout.scss";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Layout = () => {
  function handleClick() {
    let welcomeCard = document.querySelector(".welcome-card");
    welcomeCard.remove();
  }
  return (
    <div className="App">
      <Navbar />
      <div className="outerCard">
        <div className="card innerCard">
          <div className="card text-center welcome-card">
            <h4>Hello and Welcome to Hangry!</h4>
            <p className="landing-page-p">
              Hangry is a random restaurant generator for helping you decide
              where to eat!
              <br />
              Click the burger to get started!
            </p>
            <Link to="/hangry" onClick={handleClick}>
              <FontAwesomeIcon className="burger-link" icon={faBurger} />
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
