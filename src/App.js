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
        Hangry is in development. Working on HTTPS for backend. Currently
        hosting the back-end on Glitch as a workaround. Click the "Hangry!" button a few times and then give the server some
        time to spin up for a demo. Check out the GitHub repo to try it out
        yourself!
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
