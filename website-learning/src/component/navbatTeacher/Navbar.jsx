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
            <NavLink to="teacher">
              <i>Teacher Profile</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="learning">
              <i>สื่อการเรียนรู้</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="attendance">
              <i>เช็คชื่อ</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="subjectScore">
              <i>การจัดการคะแนน</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="test">
              <i>แบบทดสอบ</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="teaSeacher">
              <i>ค้นหา</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="report">
              <i>รายงาน</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="/login ">
              {props.isSignedIn ? (
                <button className="bth-danger" onClick={props.signout}>
                  Sign out
                </button>
              ) : (
                <button className="bth-danger" onClick={props.signin}>
                  Sign in
                </button>
              )}
            </NavLink>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavbarHead;
