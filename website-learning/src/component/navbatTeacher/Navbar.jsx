import React, { useState } from "react";
import "../../assets/css/Navbar.css";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { saveToLocalStorage } from "../../LocalStorage/localstorage";

function NavbarHead() {
  const signOut = () => {
    
    saveToLocalStorage("login", false);
    saveToLocalStorage("tch_auth", null);
  };
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
            <NavDropdown title="Test" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <NavLink to="test/createTest">
                  <div className="list">
                    <i>Create Test</i>
                  </div>
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="test/testRe">
                  <div className="list">
                    <i>Test Result</i>
                  </div>
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
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
            <NavLink to="MgtAssessment">
              <i>แบบประเมิน</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="/main">
              <i onClick={() => signOut()}>Sign Out</i>
              {/* {props.isSignedIn ? (
                <button className="bth-danger" onClick={props.signout}>
                  Sign out
                </button>
              ) : (
                <button className="bth-danger" onClick={props.signin}>
                  Sign in
                </button>
              )} */}
            </NavLink>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavbarHead;
