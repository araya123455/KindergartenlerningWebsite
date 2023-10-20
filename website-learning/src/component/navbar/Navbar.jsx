import React, { useState } from "react";
import "../../assets/css/Navbar.css";
// import Container from "react-bootstrap/Container";
// import Navbar from "react-bootstrap/Navbar";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

function NavbarHead() {
  return (
    <div className="navbarHeader">
      <Navbar bg="dark" variant="dark" className="main-navbar">
        <Nav className="me-auto d-flex align-items-center">
          {/* <div className="navbarCon">
            <NavLink to="/main">
              <i>Home</i>
            </NavLink>
          </div> */}
          <div className="navbarCon">
            <a href="#main">Home</a>
          </div>
          <div className="navbarCon">
            <a href="#schoolHistory">ประวัติโรงเรียน</a>
          </div>
          <div className="navbarCon">
            <a href="#home">เนื้อหา</a>
          </div>
          <div className="navbarCon">
            <a href="#personnel">บุคลากร</a>
          </div>
          <div className="navbarCon">
            <a href="#contact">Contact</a>
          </div>
          <div className="navbarCon">
            <NavLink to="/login ">
              <i>Login</i>
            </NavLink>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavbarHead;
