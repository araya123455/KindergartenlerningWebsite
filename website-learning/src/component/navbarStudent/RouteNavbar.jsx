import React from "react";
import NavbarHead from "./Navbar";
import { NavLink, Outlet } from "react-router-dom";
import "../../assets/css/Navbar.css";
function RouteStudent() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="content-right">
          <NavbarHead/>
          <div className="main-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default RouteStudent;
