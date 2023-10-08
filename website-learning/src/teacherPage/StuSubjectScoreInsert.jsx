import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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
  showstusubscore,
  subjectscoreinsert,
  subjectscoreupdate,
  subjectscoredelete,
} from "../slice/TeacherSlice";
import {
  findstudent,
  shownamesyllabus,
  shownamesubject,
} from "../slice/StudentSlice";
import "../assets/css/attendance.css";

function StuSubjectScoreInsert() {
  const dispatch = useDispatch();
  const yeartermid = getFromLocalStorage("yearscoreid");
  const kinderid = getFromLocalStorage("kinscoreid");
  const [showstudata, setshowstudata] = useState([]);
  const [showsubject, setshowsubject] = useState([]);
  const [showsylla, setshowsylla] = useState([]);
  const syllabus = showsylla.map((s) => s.sylla_name);
  const [showsubscore, setshowsubscore] = useState([]);

  // Initialize insert state with default values for all students and subjects
  const initialInsert = {};
  showstudata.forEach((student) => {
    initialInsert[student.stu_id] = {};
    showsubject.forEach((subject) => {
      initialInsert[student.stu_id][subject.sub_id] = "";
    });
  });
  const [insert, setInsert] = useState(initialInsert);
  const [showEdit, setshowEdit] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [fullScores, setFullScores] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const loadshowstudent = () => {
    dispatch(findstudent({ yeartermid, kinderid }))
      .then((result) => {
        setshowstudata(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadsubject = () => {
    dispatch(shownamesubject({ yeartermid, kinderid }))
      .then((result) => {
        setshowsubject(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadsyllabus = () => {
    dispatch(shownamesyllabus({ yeartermid, kinderid }))
      .then((result) => {
        setshowsylla(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadsubscore = () => {
    dispatch(showstusubscore())
      .then((result) => {
        setshowsubscore(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const valid = (body) => {
    return body.every((scoreObj) => {
      const score = parseInt(scoreObj.subscore);
      const fullScore = parseInt(fullScores[scoreObj.sub_id]);
      return !isNaN(score) && score >= 0 && score <= fullScore;
    });
  };

  const AddShow = (id) => {
    const body = Object.keys(insert[id] || {}).map((subId) => ({
      subscore: insert[id][subId],
      sub_id: subId,
      stu_id: id,
    }));
  
    if (valid(body)) {
      Promise.all(body.map((item) => dispatch(subjectscoreinsert(item))))
        .then(() => {
          setInsert((prevInsert) => ({ ...prevInsert, [id]: {} }));
          loadsubject();
          loadsyllabus();
          loadsubscore();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("กรุณากรอกคะแนนให้อยู่ในช่วงของคะแนนเต็ม!!");
    }
  };

  const handleInsert = (stuId, subId, value) => {
    setInsert((prevInsert) => ({
      ...prevInsert,
      [stuId]: {
        ...prevInsert[stuId],
        [subId]: value,
      },
    }));
  };

  const EditClose = () => {
    setshowEdit(false);
  };

  const EditShow = (data) => {
    setDatamodal([...data]); // Convert data to an array if it's not already
    setshowEdit(true);
  };

  const handleEdit = (sub_id, value) => {
    setDatamodal((prevDataModal) =>
      prevDataModal.map((score) =>
        score.sub_id === sub_id ? { ...score, subscore: value } : score
      )
    );
  };

  const onSave = () => {
    const body = datamodal.map((score) => ({
      id: score.subscore_id,
      body: {
        subscore: score.subscore === "" ? null : parseInt(score.subscore),
      },
    }));
    // console.log(body);

    if (valid(datamodal)) {
      Promise.all(body.map((item) => dispatch(subjectscoreupdate(item))))
        .then(() => {
          setshowEdit(false);
          loadsubject();
          loadsyllabus();
          loadsubscore();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("กรุณากรอกคะแนนให้อยู่ในช่วงของคะแนนเต็ม!!");
    }
  };

  const onDelete = (studentsubscore) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const body = studentsubscore.map((item) => item.subscore_id);
      Promise.all(body.map((item) => dispatch(subjectscoredelete(item))))
        .then((result) => {
          if (result.payload && result.payload.error) {
            console.log(result.payload.error);
          } else {
            loadsubject();
            loadsyllabus();
            loadsubscore();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const fullScoreObj = {};
    showsubject?.forEach((data) => {
      fullScoreObj[data.sub_id] = data.fullscore;
    });
    setFullScores(fullScoreObj);
  }, [showsubject]);

  useEffect(() => {
    loadshowstudent();
    loadsubject();
    loadsyllabus();
    loadsubscore();
  }, []);

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
      <button className="btn-back" role="button">
        <Link to={"/subjectScore"} className="back-font">
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
      <div>
        <h2>{syllabus}</h2>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="TableHead">
            <TableRow>
              <TableCell>
                <p className="headerC">ชื่อ-นามสกุล</p>
              </TableCell>
              <TableCell>
                <p className="headerC">รหัสประจำตัว</p>
              </TableCell>
              {showsubject?.map((data) => {
                const { sub_id, sub_name, fullscore } = data;
                return (
                  <TableCell className="table-header th" key={sub_id}>
                    <p className="headerC">
                      {sub_name}({fullscore})
                    </p>
                  </TableCell>
                );
              })}
              <TableCell>
                <p className="headerC">Confix</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showstudata?.slice(startIndex, endIndex)?.map((student, index) => {
              const { stu_id, prefix, stu_Fname, stu_Lname, stu_sn } = student;
              const studentsubscore = showsubscore?.filter(
                (score) => score?.stu_id === stu_id
              );

              return (
                <TableRow key={stu_id}>
                  <TableCell className="td">
                    {prefix} {stu_Fname} {stu_Lname}
                  </TableCell>
                  <TableCell className="td">{stu_sn}</TableCell>
                  {showsubject?.map((data) => {
                    const { sub_id } = data;
                    const subjectscore = studentsubscore?.find(
                      (score) => score?.sub_id === sub_id
                    );
                    return (
                      <TableCell className="td" key={sub_id}>
                        {subjectscore ? (
                          subjectscore?.subscore
                        ) : (
                          <Form className="score-input">
                            <Form.Group
                              className="mb-3"
                              controlId={`subject_score_${stu_id}_${sub_id}`}
                              key={`${stu_id}_${sub_id}`}
                            >
                              <Form.Control
                                className="input-line"
                                type="number"
                                name={`subject_score_${stu_id}_${sub_id}`}
                                value={insert[stu_id]?.[sub_id] || ""}
                                onChange={(e) =>
                                  handleInsert(stu_id, sub_id, e.target.value)
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
                      disabled={studentsubscore.length > 0 ? true : false}
                    >
                      ADD
                    </Button>
                    <Button
                      className="buttonD"
                      variant="btn btn-secondary"
                      onClick={() => EditShow(studentsubscore)}
                      disabled={studentsubscore.length > 0 ? false : true}
                    >
                      EDIT
                    </Button>
                    <Button
                      className="buttonD"
                      variant="btn btn-danger"
                      onClick={() => onDelete(studentsubscore)}
                      disabled={studentsubscore.length > 0 ? false : true}
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
      <Modal show={showEdit} onHide={EditClose}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {showsubject?.map((data) => {
              const { sub_id, sub_name, fullscore } = data;
              const subjectScore = datamodal?.find((s) => s?.sub_id === sub_id);
              return (
                <Form.Group
                  className="mb-3"
                  controlId={`sub_score_${sub_id}`}
                  key={sub_id}
                >
                  <Form.Label>
                    ป้อนคะแนนวิชา {sub_name} คะแนนเต็ม {fullscore}
                  </Form.Label>
                  <Form.Control
                    className="input-line"
                    type="number"
                    name={`sub_score_${sub_id}`}
                    placeholder={subjectScore ? subjectScore.subscore : ""}
                    onChange={(e) => handleEdit(sub_id, e.target.value)}
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
    </div>
  );
}

export default StuSubjectScoreInsert;
