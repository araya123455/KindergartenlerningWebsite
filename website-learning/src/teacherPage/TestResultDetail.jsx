import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import {
  testresultdetatil,
  testresultdetatiled,
  testresultdetail,
} from "../slice/StudentSlice";
import StudentResultDetail from "./StudentResultDetail";
import "../assets/css/testredetail.css";

function TestResultDetail() {
  const dispatch = useDispatch();
  const [showtestre, setshowtestre] = useState([]);
  const [showtestred, setshowtestred] = useState([]);
  const testdeId = getFromLocalStorage("testde_id");
  const testId = getFromLocalStorage("testedId");
  const [ckeckre, setckeckre] = useState(true);
  const [ckeckred, setckeckred] = useState(true);
  const [showData, setshowData] = useState(false);
  const [studentScores, setStudentScores] = useState({});
  const [selectedStudentId, setSelectedStudentId] = useState(null); // Add this state to track selected student

  const loadtestre = () => {
    dispatch(testresultdetatil({ testdeId }))
      .then((result) => {
        setshowtestre(result.payload);
        const mess = result.payload.message;
        if (mess === "No available for the student") {
          setckeckre(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadtestred = () => {
    dispatch(testresultdetatiled({ testdeId }))
      .then((result) => {
        setshowtestred(result.payload);
        const mess = result.payload.message;
        if (mess === "No available tests for the student") {
          setckeckred(false);
        }
        result.payload.forEach((item) => {
          const stuid = item.stu_id;
          // Load the student scores for each student
          loadTestdetail(stuid);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadTestdetail = async (stuid) => {
    dispatch(testresultdetail({ testId, stuid }))
      .then((result) => {
        if (Array.isArray(result.payload)) {
          const totalScore = result.payload.reduce(
            (acc, item) => acc + item.score,
            0
          );
          // Store the student score in the state
          setStudentScores((prevState) => ({
            ...prevState,
            [stuid]: totalScore,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DataClose = () => {
    setshowData(false);
  };

  const DataShow = (stuid) => {
    setSelectedStudentId(stuid);
    setshowData(true);
  };

  const onclick = () => {
    console.log("");
  };

  useEffect(() => {
    loadtestred();
    loadtestre();
  }, []);

  return (
    <div>
      <Link to={"/test/testRe"} onClick={() => onclick()}>
        <svg
          baseProfile="tiny"
          height="24px"
          id="Layer_1"
          version="1.2"
          viewBox="0 0 24 24"
          width="24px"
        >
          <g>
            <path d="M19.164,19.547c-1.641-2.5-3.669-3.285-6.164-3.484v1.437c0,0.534-0.208,1.036-0.586,1.414   c-0.756,0.756-2.077,0.751-2.823,0.005l-6.293-6.207C3.107,12.523,3,12.268,3,11.999s0.107-0.524,0.298-0.712l6.288-6.203   c0.754-0.755,2.073-0.756,2.829,0.001C12.792,5.463,13,5.965,13,6.499v1.704c4.619,0.933,8,4.997,8,9.796v1   c0,0.442-0.29,0.832-0.714,0.958c-0.095,0.027-0.19,0.042-0.286,0.042C19.669,19.999,19.354,19.834,19.164,19.547z M12.023,14.011   c2.207,0.056,4.638,0.394,6.758,2.121c-0.768-3.216-3.477-5.702-6.893-6.08C11.384,9.996,11,10,11,10V6.503l-5.576,5.496l5.576,5.5   V14C11,14,11.738,14.01,12.023,14.011z" />
          </g>
        </svg>
      </Link>
      <div>
        <table>
          <thead>
            <tr>
              <th>คำนำหน้า</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>เลขประจะตัว</th>
              <th>คะแนนที่ได้</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {ckeckred &&
              showtestred.map((data) => {
                const { stu_id, prefix, stu_Fname, stu_Lname, stu_sn } = data;
                const totalScore = studentScores[stu_id] || 0;

                return (
                  <tr key={stu_id}>
                    <td>{prefix}</td>
                    <td>{stu_Fname}</td>
                    <td>{stu_Lname}</td>
                    <td>{stu_sn}</td>
                    <td>
                      {totalScore} (
                      <button className="link-button" onClick={() => DataShow(stu_id)}>detail</button>)
                    </td>
                    <td>ส่งแล้ว</td>
                  </tr>
                );
              })}
            {ckeckre &&
              showtestre.map((data) => {
                const { stu_id, prefix, stu_Fname, stu_Lname, stu_sn } = data;
                return (
                  <tr key={stu_id}>
                    <td>{prefix}</td>
                    <td>{stu_Fname}</td>
                    <td>{stu_Lname}</td>
                    <td>{stu_sn}</td>
                    <td>0</td>
                    <td>ยังไม่ส่ง</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Modal show={showData} onHide={DataShow}>
        <Modal.Body>
          {/* Render the StudentResultDetail component with stu_id and test_id */}
          {selectedStudentId && (
            <StudentResultDetail stuid={selectedStudentId} testId={testId} />
          )}
        </Modal.Body>
          <Modal.Footer>
            <Button onClick={DataClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Outlet />
    </div>
  );
}

export default TestResultDetail;
