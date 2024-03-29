import React from 'react'
import "../assets/css/clouds.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

function Report() {
  return (
    <div>
      <div id="clouds">
             <div className="cloud x1"></div>
             <div className="cloud x2"></div>
             <div className="cloud x3"></div>
             <div className="cloud x4"></div>
             <div className="cloud x5"></div>
             <div className="cloud x6"></div>
             <div className="cloud x7"></div>
           </div>
      <div className="split-screen">
      <div className="left-side">
      <Row>
            <Col md={6}>
              <h1>พัฒนาการ 5 ด้าน</h1>
               {/* Left side */}
              <Row>
                <Col className="center-button" >
                <Link to={"/teacher/ReportLearning"} >
                <button className="learn-more" type="button">
                  พัฒนาการ 5 ด้าน
                </button><br></br>
                </Link>
                </Col>
              </Row>
            </Col>
          </Row>
      </div>
      <div className="right-side">
      <br></br>
          <Col md={6}>
          <h1>ผลการเรียน</h1>
             <Row>
              <Col>
              <Link to={"/teacher/ReportSubject"}>
                <button className="learn-more" type="button">
                  ผลการเรียน
                </button>
              </Link>
              </Col>
             </Row>
          </Col>    
      </div>
    </div>      
      </div>
  )
}

export default Report;