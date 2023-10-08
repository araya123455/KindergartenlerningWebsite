import React, { useState, useEffect } from "react";
import "../assets/css/particlesanimation.css";
import { Link } from "react-router-dom";

function ClickForStart() {
  return (
    <div className="particle">
      <div className="glowing">
        <span className="red" style={{ "--i": 1 }}></span>
        <span className="yellow" style={{ "--i": 2 }}></span>
        <span className="blue" style={{ "--i": 3 }}></span>
      </div>
      <div className="centered">
        <button className="button-55 " role="button">
          <Link
            className="fontbutton"
            to="/student/starttest"
          >
            เริ่มทำแบบทดสอบ
          </Link>
        </button>
      </div>
    </div>
  );
}

export default ClickForStart;
