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
            rel="noreferrer"
          >
            <span id="navbarLogo">&lt; / &gt;</span>
            <span className="navbar-text">Chase Forestello</span>
          </a>
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
        demo (~ 1 minute).
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
