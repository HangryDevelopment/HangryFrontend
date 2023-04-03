import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ResponseCard from "./components/ResponseCard/ResponseCard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<ResponseCard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
