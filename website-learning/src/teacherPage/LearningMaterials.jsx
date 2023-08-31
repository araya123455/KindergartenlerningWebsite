import React from "react";
import "../assets/css/learning.css";
import "../assets/css/clouds.css";
import { Container, Row, Col } from "react-bootstrap";
// import movenment from "./Movement";

const LearningMaterials = () => {
  return (  
      <div className="App">   
        <Container className="p-4"> 
        <div id="clouds">
             <div className="cloud x1"></div>
             <div className="cloud x2"></div>
             <div className="cloud x3"></div>
             <div className="cloud x4"></div>
             <div className="cloud x5"></div>
             <div className="cloud x6"></div>
             <div className="cloud x7"></div>
           </div>
          <Row>
            <Col>
              <a href="movenment">
                <button className="glow-on-hover" type="button">
                  เสริมประสบการณ์
                </button><br></br>
              </a>
            </Col>
          </Row>
          <Row>
            <Col>
              <a href="EnhanceTheexperience">
                <button className="glow-on-hover" type="button">
                  การเคลื่อนไหว
                </button>
              </a>
            </Col>
          </Row>
          <Row>
            <Col>
              <a href="Freeactivities">
                <button className="glow-on-hover" type="button">
                  กิจกรรมเสรี
                </button>
              </a>
            </Col>
          </Row>
          <Row>
            <Col>
              <a href="Artactivities">
                <button className="glow-on-hover" type="button">
                  กิจกรรมศิลปะ
                </button>
              </a>
            </Col>
          </Row>
          <Row>
            <Col>
              <a href="Outdooractivities">
                <button className="glow-on-hover" type="button">
                  กิจกรรมกลางเเจ้ง
                </button>
              </a>
            </Col>
          </Row>
          <Row>
            <Col>
              <a href="LearningFile">
                <button className="glow-on-hover" type="button">
                  Download PDF
                </button>
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    
  );
};

export default LearningMaterials;
