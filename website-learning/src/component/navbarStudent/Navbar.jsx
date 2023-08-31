import React, { useState } from "react";
import "../../assets/css/Navbar.css";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { saveToLocalStorage } from "../../LocalStorage/localstorage";

function NavbarHead({ signout }) {
  const signOut = () => {
    signout();
    // console.log("123");
    // saveToLocalStorage("auth", null);
  };
  return (
    <div className="navbarHeader">
      <Navbar bg="dark" variant="dark" className="main-navbar">
        <Nav className="me-auto d-flex align-items-center">
          <div className="navbarCon">
            <NavLink to="/student">
              <i>Student</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="checkScore">
              <i>ตรวจสอบคะแนน</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="test">
              <i>ทำแบบทดสอบ</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="/login ">
              <i onClick={() => signOut()}>Sign Out</i>
            </NavLink>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavbarHead;
