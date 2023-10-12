import React from "react";
// import "../assets/css/learning.css";
import "../assets/css/clouds.css";
import "../assets/css/ButtonPink.css";
import "../assets/css/Split.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

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
                  <Col className="center-button">
                    <Link to="/teacher/movenment">
                      <button className="learn-more" type="button">
                        เสริมประสบการณ์
                      </button>
                      <br></br>
                    </Link>
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col className="center-button">
                    <Link to="/teacher/EnhanceTheexperience">
                      <button className="learn-more" type="button">
                        การเคลื่อนไหว
                      </button>
                    </Link>
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col className="center-button">
                    <Link to="/teacher/Freeactivities">
                      <button className="learn-more" type="button">
                        กิจกรรมเสรี
                      </button>
                    </Link>
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col className="center-button">
                    <Link to="/teacher/Artactivities">
                      <button className="learn-more" type="button">
                        กิจกรรมศิลปะ
                      </button>
                    </Link>
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col className="center-button">
                    <Link to="/teacher/Outdooractivities">
                      <button className="learn-more" type="button">
                        กิจกรรมกลางเเจ้ง
                      </button>
                    </Link>
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
                  <Link to="/teacher/LearningFile">
                    <button className="learn-more" type="button">
                      สื่อการสอน
                    </button>
                  </Link>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col>
                  <Link to="/teacher/SubjectFileEnglish">
                    <button className="learn-more" type="button">
                      วิชาภาษาอังกฤษ
                    </button>
                  </Link>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col>
                  <Link to="/teacher/SubjectFileThai">
                    <button className="learn-more" type="button">
                      วิชาภาษาไทย
                    </button>
                  </Link>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col>
                  <Link to="/teacher/SubjectFileMath">
                    <button className="learn-more" type="button">
                      วิชาคณิตศาสตร์
                    </button>
                  </Link>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col>
                  <Link to="/teacher/SubjectFileEnhance">
                    <button className="learn-more" type="button">
                      เสริมประสบการณ์
                    </button>
                  </Link>
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
