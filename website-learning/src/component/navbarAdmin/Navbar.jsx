import React, { useState } from "react";
import "../../assets/css/Navbar.css";
import { Navbar } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
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
            <NavLink to="mgtKindergartenroomlevel">
              <i>จัดการระดับชั้น/ห้อง</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="mgtYearTerm">
              <i>จัดการปีการศึกษา</i>
            </NavLink>
          </div>
          <div className="navbarCon">
            <NavLink to="mgtSyllabus">
              <i>หลักสูตร</i>
            </NavLink>
          </div>
          {/* <div className="navbarCon">
            <NavLink to="mgtSubject">
              <i>วิชา</i>
            </NavLink>
          </div> */}
          <div className="navbarCon">
            <NavLink to="mgtClassTimetable">
              <i>ตารางสอนครู</i>
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
