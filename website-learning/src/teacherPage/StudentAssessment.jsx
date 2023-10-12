import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import {
  showassessmentstu,
  assessmentstuinsert,
  assessmentstuupdate,
  assessmentstudelete,
} from "../slice/DataSlice";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { findstudent, findassessment } from "../slice/StudentSlice";
import "../assets/css/attendance.css";

function StudentAssessment() {
  const dispatch = useDispatch();
  const yeartermid = getFromLocalStorage("yearassid");
  const kinderid = getFromLocalStorage("kinassid");
  const [showstudata, setshowstudata] = useState([]);
  const [showaeesedata, setshowaeesedata] = useState([]);
  const [showasses, setshowasses] = useState([]);
  // Initialize insert state with default values for all students and subjects
  const initialInsert = {};
  showstudata.forEach((student) => {
    initialInsert[student.stu_id] = {};
    showaeesedata.forEach((asses) => {
      initialInsert[student.stu_id][asses.asses_id] = "";
    });
  });
  const [insert, setinsert] = useState(initialInsert);
  const [fullScores, setFullScores] = useState({});
  const [showEdit, setshowEdit] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const loadshowasses = () => {
    dispatch(findstudent({ yeartermid, kinderid }))
      .then((result) => {
        setshowstudata(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadshowstudata = () => {
    dispatch(findassessment({ yeartermid, kinderid }))
      .then((result) => {
        setshowaeesedata(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadassesstu = () => {
    dispatch(showassessmentstu())
      .then((result) => {
        setshowasses(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AddShow = (id) => {
    const body = Object.keys(insert[id] || {}).map((assesId) => ({
      asses_score: insert[id][assesId],
      stu_id: id,
      asses_id: assesId,
    }));

    // Check if the scores are within the valid range
    if (valid(body)) {
      Promise.all(body.map((item) => dispatch(assessmentstuinsert(item))))
        .then((result) => {
          // console.log(body);
          // console.log(result);
          setinsert((prevInsert) => ({ ...prevInsert, [id]: {} }));
          loadshowstudata();
          loadassesstu();
          toast.success("Score records inserted successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to insert score records");
        });
    } else {
      alert("กรุณากรอกคะแนนให้อยู่ในช่วงของคะแนนเต็ม!!");
    }
  };

  const handleInsert = (stuId, assesId, value) => {
    setinsert((prevInsert) => ({
      ...prevInsert,
      [stuId]: {
        ...prevInsert[stuId],
        [assesId]: value,
      },
    }));
  };

  // Check if the scores are within the valid range
  const valid = (body) => {
    // console.log(body);
    return body.every((scoreObj) => {
      const score = parseInt(scoreObj.asses_score);
      const fullScore = parseInt(fullScores[scoreObj.asses_id]);
      // Ensure that score is not NaN and within the valid range
      return !isNaN(score) && score >= 0 && score <= fullScore;
    });
  };

  const EditClose = () => {
    setshowEdit(false);
  };
  const EditShow = (data) => {
    // console.log(data);
    setDatamodal([...data]); // Convert data to an array if it's not already
    setshowEdit(true);
  };

  // Updated handleEdit function
  const handleEdit = (assesId, value) => {
    // console.log(assesId);
    // console.log(value);
    setDatamodal((prevDataModal) =>
      prevDataModal.map((score) =>
        score.asses_id === assesId ? { ...score, asses_score: value } : score
      )
    );
  };

  // Updated onSave function
  const onSave = () => {
    const body = datamodal.map((score) => ({
      id: score.assesSc_id,
      body: {
        asses_score:
          score.asses_score === "" ? null : parseInt(score.asses_score),
      },
    }));
    // console.log(body);
    // Check if the scores are within the valid range
    if (valid(datamodal)) {
      Promise.all(body.map((item) => dispatch(assessmentstuupdate(item))))
        .then((results) => {
          // console.log(results);
          setshowEdit(false);
          loadshowasses();
          loadshowstudata();
          loadassesstu();
          toast.success("Score records have been edited successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to insert score records");
        });
    } else {
      alert("กรุณากรอกคะแนนให้อยู่ในช่วงของคะแนนเต็ม!!");
    }
  };

  const onDelete = (studentAssessmentScores) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const body = studentAssessmentScores.map((item) => item.assesSc_id);
      Promise.all(body.map((item) => dispatch(assessmentstudelete(item))))
        .then((result) => {
          if (result.payload && result.payload.error) {
            console.log(result.payload.error);
          } else {
            loadshowasses();
            loadshowstudata();
            loadassesstu();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    loadshowasses();
    loadshowstudata();
    loadassesstu();
  }, []);

  useEffect(() => {
    const fullScoreObj = {};
    showaeesedata?.forEach((data) => {
      fullScoreObj[data.asses_id] = data.full_score;
    });
    setFullScores(fullScoreObj);
  }, [showaeesedata]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

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
        <Link to={"/teacher/MgtAssessment"} className="back-font">
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
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="TableHead">
            <TableRow>
              <TableCell className="table-header th">
                <p className="headerC">ชื่อ-นามสกุล</p>
              </TableCell>
              <TableCell className="table-header th">
                <p className="headerC">รหัสประจำตัว</p>
              </TableCell>
              {showaeesedata?.map((data) => {
                const { asses_id, assess_name, full_score } = data;
                return (
                  <TableCell className="table-header th" key={asses_id}>
                    <p className="headerC">
                      {assess_name}({full_score})
                    </p>
                  </TableCell>
                );
              })}
              <TableCell>
                <p className="headerC">แก้ไข</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Student rows */}
            {showstudata?.slice(startIndex, endIndex)?.map((student, index) => {
              const { stu_id, prefix, stu_Fname, stu_Lname, stu_sn } = student;
              // Find assessment scores for this student
              const studentAssessmentScores = showasses?.filter(
                (score) => score?.stu_id === stu_id
              );
              return (
                <TableRow key={stu_id}>
                  <TableCell className="td">
                    {prefix} {stu_Fname} {stu_Lname}
                  </TableCell>
                  <TableCell className="td">{stu_sn}</TableCell>
                  {/* Assessment scores */}
                  {showaeesedata?.map((data) => {
                    const { asses_id } = data;
                    // Students who have already scored
                    const assessmentScore = studentAssessmentScores?.find(
                      (score) => score?.asses_id === asses_id
                    );
                    return (
                      <TableCell className="td" key={asses_id}>
                        {assessmentScore ? (
                          assessmentScore?.asses_score
                        ) : (
                          <Form className="score-input">
                            <Form.Group
                              className="mb-3"
                              controlId={`asses_score_${stu_id}_${asses_id}`}
                              key={`${stu_id}_${asses_id}`}
                            >
                              <Form.Control
                                className="input-line"
                                type="number"
                                name={`asses_score_${stu_id}_${asses_id}`}
                                value={insert[stu_id]?.[`${asses_id}`] || ""}
                                onChange={(e) =>
                                  handleInsert(stu_id, asses_id, e.target.value)
                                }
                              />
                            </Form.Group>
                          </Form>
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Button
                      variant="btn btn-primary"
                      onClick={() => AddShow(stu_id)}
                      disabled={
                        studentAssessmentScores.length > 0 ? true : false
                      } // Disable the button if scores exist
                    >
                      ADD
                    </Button>
                    <Button
                      className="buttonD"
                      variant="btn btn-secondary"
                      onClick={() => EditShow(studentAssessmentScores)}
                      disabled={
                        studentAssessmentScores.length > 0 ? false : true
                      } // Disable the button if scores exist
                    >
                      EDIT
                    </Button>
                    <Button
                      className="buttonD"
                      variant="btn btn-danger"
                      onClick={() => onDelete(studentAssessmentScores)}
                      disabled={
                        studentAssessmentScores.length > 0 ? false : true
                      }
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={showstudata?.length || 1}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      {/* Modal for editing scores */}
      <Modal show={showEdit} onHide={EditClose}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {showaeesedata?.map((data) => {
              const { asses_id, assess_name, full_score } = data;

              // Find the assessment score for this student and assessment
              const assessmentScore = datamodal.find(
                (score) => score?.asses_id === asses_id
              );

              return (
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                  key={asses_id}
                >
                  <Form.Label>
                    {assess_name} คะแนนเต็ม: {full_score} คะแนน
                  </Form.Label>
                  <Form.Control
                    className="input-line"
                    type="number"
                    name={`asses_score_${asses_id}`}
                    placeholder={
                      assessmentScore ? assessmentScore?.asses_score : ""
                    }
                    // value={assessmentScore ? assessmentScore.asses_score : ""}
                    onChange={(e) => handleEdit(asses_id, e.target.value)}
                  />
                </Form.Group>
              );
            })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={EditClose}>
            Close
          </Button>
          <Button variant="btn btn-outline-secondary" onClick={onSave}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default StudentAssessment;
