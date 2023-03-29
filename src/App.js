import "./App.css";
import AxiosTest from "./components/AxiosTest";

function App() {
  return (
    <div className="App">
      <nav className="navbar sticky-top bg-dark">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="https://github.com/Chase-Forestello"
            target="_blank"
          >
            <span id="navbarLogo">&lt; / &gt;</span>
            <span className="navbar-text">Chase Forestello</span>
          </a>
          <a href="https://github.com/HangryDevelopment" target="_blank">
            <span className={"navbar-text"} id={"navbarCode"}>
              [CODE]
            </span>
          </a>
        </div>
      </nav>
      <div className="alert alert-info" role="alert">
        Hangry is in development and is currently not functional. Working on
        HTTPS for backend to enable Yelp Fusion API calls.<br/>Check out the GitHub repo to try it out yourself!
      </div>
      <div className="outerCard">
        <div className="card innerCard">
          <AxiosTest />
        </div>
      </div>
    </div>
  );
}

export default App;
