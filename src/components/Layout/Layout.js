import "./Layout.scss";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="outerCard">
        <div className="card innerCard">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
