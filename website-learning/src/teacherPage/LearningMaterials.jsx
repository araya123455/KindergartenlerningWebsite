import React from "react";
// import "../assets/css/learning.css";
import "../assets/css/clouds.css";
import "../assets/css/ButtonPink.css";
import "../assets/css/Split.css";
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
           <div className="split-screen">
      <div className="left-side">
      <Row>
            <Col md={6}>
              <h1>วีดีโอสื่อการสอน</h1>
               {/* Left side */}
              <Row>
                <Col className="center-button" >
                <a href="movenment">
                <button className="learn-more" type="button">
                  เสริมประสบการณ์
                </button><br></br>
                </a>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col className="center-button">
                <a href="EnhanceTheexperience">
                <button className="learn-more" type="button">
                  การเคลื่อนไหว
                </button>
              </a>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col className="center-button">
                <a href="Freeactivities">
                <button className="learn-more" type="button">
                  กิจกรรมเสรี
                </button>
              </a>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col className="center-button">
                <a href="Artactivities">
                <button className="learn-more" type="button">
                  กิจกรรมศิลปะ
                </button>
              </a>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col className="center-button">
                <a href="Outdooractivities">
                <button className="learn-more" type="button">
                  กิจกรรมกลางเเจ้ง
                </button>
              </a>
                </Col>
              </Row>
            </Col>
          </Row>
      </div>
      <div className="right-side">
      <br></br>
          <Col md={6}>
          <h1>ไฟล์ PDF</h1>
             <Row>
              <Col>
                <a href="LearningFile">
                  <button className="learn-more" type="button">
                    สื่อการสอน
                  </button>
                </a>
              </Col>
             </Row>
             <br></br>
             <Row>
              <Col>
              <a href="SubjectFileEnglish">
                <button className="learn-more" type="button">
                  วิชาภาษาอังกฤษ
                </button>
              </a>
              </Col>
             </Row>
             <br></br>
             <Row>
              <Col>
              <a href="SubjectFileThai">
                <button className="learn-more" type="button">
                  วิชาภาษาไทย
                </button>
              </a>
              </Col>
             </Row>
             <br></br>
             <Row>
              <Col>
              <a href="SubjectFileMath">
                <button className="learn-more" type="button">
                  วิชาคณิตศาสตร์
                </button>
              </a>
              </Col>
             </Row>
             <br></br>
             <Row>
              <Col>
              <a href="SubjectFileEnhance">
                <button className="learn-more" type="button">
                  เสริมประสบการณ์
                </button>
              </a>
              </Col>
             </Row>
          </Col>    
      </div>
    </div>
        
               
        </Container>
      </div>
  );
};

export default LearningMaterials;
