import logo from './logo.svg';
import './App.css';
import AxiosTest from "./components/AxiosTest";

function App() {
  console.log(AxiosTest)
  return (
    <div className="App">
      <AxiosTest/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
