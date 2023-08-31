import React from "react";
import NavbarHead from "./Navbar";
import "../../assets/css/Navbar.css";
import Home from "../../mainPage/home/Home";
import Contact from "../../mainPage/home/Contact";
import Personnel from "../../mainPage/home/Personnel";
import SchoolHistory from "../../mainPage/home/SchoolHistory";
function RouteNavbar() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="content-right">
          <NavbarHead />
          <div className="main-content">
            <Home />
            <Contact />
            <Personnel />
            <SchoolHistory />
          </div>
        </div>
      </div>
    </>
  );
}

export default RouteNavbar;
