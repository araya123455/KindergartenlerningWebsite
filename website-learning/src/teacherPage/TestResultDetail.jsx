import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  testresultdetatil,
  testresultdetatiled,
  testresultdetail,
} from "../reducers/ReducerData";
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Adjust as needed

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

  useEffect(() => {
    loadtestred();
    loadtestre();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when the rows per page changes
  };

  const startIndex = page * rowsPerPage;
  // console.log(rowsPerPage);
  // console.log(page);
  const endIndex = startIndex + rowsPerPage;
  // console.log(endIndex);

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
      <button className="btn-back" role="button">
        <Link to={"/teacher/test/testRe"} className="back-font">
          <svg
            viewBox="0 0 96 96"
            height="24px"
            id="Layer_1"
            version="1.2"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z"
              fill="#ffffff"
            />
          </svg>
          ย้อนกลับ
        </Link>
      </button>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="TableHead">
            <TableRow>
              <TableCell>
                <p className="headerC">ชื่อ-นามสกุล</p>
              </TableCell>
              <TableCell>
                <p className="headerC">รหัสประจำตัว</p>
              </TableCell>
              <TableCell>
                <p className="headerC">คะแนนที่ได้</p>
              </TableCell>
              <TableCell>
                <p className="headerC">สถานะ</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ckeckred &&
              showtestred?.map((data) => {
                const { stu_id, prefix, stu_Fname, stu_Lname, stu_sn } = data;
                const totalScore = studentScores[stu_id] || 0;

                return (
                  <TableRow key={stu_id}>
                    <TableCell>
                      <p>{prefix} {stu_Fname} {stu_Lname}</p>
                    </TableCell>
                    <TableCell><p>{stu_sn}</p></TableCell>
                    <TableCell>
                      <p className="hstatus green">
                        {totalScore}{" "}
                        <Link
                          className="link-button"
                          onClick={() => DataShow(stu_id)}
                        >
                          (detail)
                        </Link>
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="hstatus green">ส่งแล้ว</p>
                    </TableCell>
                  </TableRow>
                );
              })}
            {ckeckre &&
              showtestre?.map((data) => {
                const { stu_id, prefix, stu_Fname, stu_Lname, stu_sn } = data;
                return (
                  <TableRow key={stu_id}>
                    <TableCell>
                      <p>{prefix} {stu_Fname} {stu_Lname}</p>
                    </TableCell>
                    <TableCell><p>{stu_sn}</p></TableCell>
                    <TableCell>
                      <p className="hstatus red">0</p>
                    </TableCell>
                    <TableCell>
                      <p className="hstatus red">ยังไม่ส่ง</p>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal show={showData} onHide={DataShow} className="modal-test">
        <Modal.Body>
          {/* Render the StudentResultDetail component with stu_id and test_id */}
          {selectedStudentId && (
            <StudentResultDetail stuid={selectedStudentId} testId={testId} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={DataClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Outlet />
    </div>
  );
}

export default TestResultDetail;
