import React from "react";
import NavbarHead from "./Navbar";
import { NavLink, Outlet } from "react-router-dom";
import "../../assets/css/Navbar.css";
function RouteAdmin(props) {
  let signin = props.signin;
  let signout = props.signout;
  let isSignedIn = props.isSignedIn;
  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="content-right">
          <NavbarHead signin={signin} signout={signout} isSignedIn={isSignedIn}/>
          <div className="main-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default RouteAdmin;
