import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // import the router
import LandingPage from "./components/LandingPage/LandingPage";
import ResponseCard from "./components/ResponseCard/ResponseCard";
import LoginPage from "./components/LoginPage/LoginPage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/hangry" element={<ResponseCard />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
