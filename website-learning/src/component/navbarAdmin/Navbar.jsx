import React, { useState } from "react";
import "../../assets/css/Navbar.css";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

function NavbarHead(props) {
  return (
    <div className="navbarHeader">
      <Navbar bg="dark" variant="dark" className="main-navbar">
        <Nav className="me-auto d-flex align-items-center">
          <div className="navbarCon">
            <NavLink to="admin">
              <i>Profile</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="mgtAcademic">
              <i>จัดการปีการศึกษา</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="mgtStudent">
              <i>นักเรียน</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="mgtTeacher">
              <i>ครู</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="mgtClass">
              <i>ห้องเรียน</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="search">
              <i>ค้นหา</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="/login ">
              <i>Sign Out</i>
            </NavLink>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavbarHead;
