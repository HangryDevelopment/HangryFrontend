import logo from './logo.svg';
import './App.css';
import AxiosTest from "./components/AxiosTest";
import axios from "axios";

function App() {
    return (
        <div className="App">
            <nav className="navbar sticky-top bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="https://github.com/Chase-Forestello" target="_blank">
                        <span id="navbarLogo">&lt; / &gt;</span><span className="navbar-text">Chase Forestello</span>
                    </a>
                    <a href="https://github.com/HangryDevelopment" target="_blank">
                        <span className={"navbar-text"} id={"navbarCode"}>[CODE]</span>
                    </a>
                </div>
            </nav>
            <div className="alert alert-info" role="alert">
                Hangry is using a server provided by <a href={"https://github.com/productioncoder"} target={"_blank"}>productioncoder</a> to resolve CORS issues.
            </div>
            <div className="card outerCard">
                <div className="card innerCard">
                    <AxiosTest/>
                </div>
            </div>
        </div>
    );
}

export default App;

setUrl(`http://localhost:8080/api/yelpFetch/${searchLoc}`)