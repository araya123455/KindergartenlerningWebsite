import React from "react";
// import "../assets/css/learning.css";
import "../assets/css/clouds.css";
import "../assets/css/ButtonPink.css";
import { Container, Row, Col } from "react-bootstrap";


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
            <Col md={6}>
               {/* Left side */}
              <Row>
                <Col>
                <a href="movenment">
                <button className="learn-more" type="button">
                  เสริมประสบการณ์
                </button><br></br>
                </a>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col>
                <a href="EnhanceTheexperience">
                <button className="learn-more" type="button">
                  การเคลื่อนไหว
                </button>
              </a>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col>
                <a href="Freeactivities">
                <button className="learn-more" type="button">
                  กิจกรรมเสรี
                </button>
              </a>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col>
                <a href="Artactivities">
                <button className="learn-more" type="button">
                  กิจกรรมศิลปะ
                </button>
              </a>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col>
                <a href="Outdooractivities">
                <button className="learn-more" type="button">
                  กิจกรรมกลางเเจ้ง
                </button>
              </a>
                </Col>
              </Row>
            </Col>
          </Row>
          <br></br>
          <Col md={6}>
             {/* Right side */}
             <Row>
              <Col>
                <a href="LearningFile">
                  <button className="learn-more" type="button">
                    Download PDF
                  </button>
                </a>
              </Col>
             </Row>
             <br></br>
             <Row>
              <Col>
              <a href="SubjectFileEnglish">
                <button className="learn-more" type="button">
                  Download PDF Subject English
                </button>
              </a>
              </Col>
             </Row>
             <br></br>
             <Row>
              <Col>
              <a href="SubjectFileThai">
                <button className="learn-more" type="button">
                  Download PDF Subject Thai
                </button>
              </a>
              </Col>
             </Row>
             <br></br>
             <Row>
              <Col>
              <a href="SubjectFileMath">
                <button className="learn-more" type="button">
                  Download PDF Subject Math
                </button>
              </a>
              </Col>
             </Row>
             <br></br>
             <Row>
              <Col>
              <a href="SubjectFileEnhance">
                <button className="learn-more" type="button">
                  Download PDF Subject Enhance The Experience
                </button>
              </a>
              </Col>
             </Row>
          </Col>         
        </Container>
      </div>
  );
};

export default LearningMaterials;
