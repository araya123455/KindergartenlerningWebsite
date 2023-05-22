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
          <div className="navbarCon">
            <NavLink to="home">
              <i>Home</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="schoolHistory">
              <i>ประวัติโรงเรียน</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="personel">
              <i>บุคลากร</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="contact">
              <i>ติดต่อเรา</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="login ">
              <i>Login</i>
            </NavLink>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavbarHead;
