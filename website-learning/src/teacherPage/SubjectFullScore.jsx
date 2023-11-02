import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import { subfullscoretupdate } from "../slice/TeacherSlice";
import { shownamesyllabus, shownamesubject } from "../slice/SearchDataSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SubjectFullScore() {
  const dispatch = useDispatch();
  const yeartermid = getFromLocalStorage("yearfullid");
  const kinderid = getFromLocalStorage("kinfullid");
  const [showsubject, setshowsubject] = useState([]);
  const [showsylla, setshowsylla] = useState([]);
  const syllabus = showsylla.map((s) => s.sylla_name);
  const [showEdit, setshowEdit] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [update, setupdate] = useState({
    fullscore: "",
  });

  const loadsubject = () => {
    dispatch(shownamesubject({ yeartermid, kinderid }))
      .then((result) => {
        // console.log(result);
        setshowsubject(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadsyllabus = () => {
    dispatch(shownamesyllabus({ yeartermid, kinderid }))
      .then((result) => {
        // console.log(result);
        setshowsylla(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EditClose = () => {
    setshowEdit(false);
  };

  const EditShow = (sub_id) => {
    // Find the subject by sub_id and set it as the datamodal
    const subject = showsubject.find((data) => data.sub_id === sub_id);
    setDatamodal(subject);
    setshowEdit(true);
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setupdate({
      ...update,
      [name]: value,
    });
  };

  const onSave = () => {
    let body = {
      id: datamodal.sub_id,
      body: {
        fullscore:
          update.fullscore === "" ? datamodal.fullscore : update.fullscore,
      },
    };

    dispatch(subfullscoretupdate(body))
      .then((result) => {
        setshowEdit(false);
        setupdate({ fullscore: "" });
        loadsubject();
        loadsyllabus();
        toast.success("Subjectfullscore records inserted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to insert subjectfullscore records");
      });
  };

  useEffect(() => {
    loadsubject();
    loadsyllabus();
  }, []);

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
        <Link to={"/teacher/subjectScore"} className="back-font">
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
        <h2 className="h2">{syllabus}</h2>
      </div>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="TableHead">
            <TableRow>
              <TableCell>
                <p className="headerC">ชื่อวิชา</p>
              </TableCell>
              <TableCell>
                <p className="headerC">คะแนนเต็ม</p>
              </TableCell>
              <TableCell className="table-header th">
                <p className="headerC">แก้ไข</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showsubject?.map((data) => {
              const { sub_id, sub_name, fullscore } = data;
              return (
                <TableRow key={sub_id}>
                  <TableCell className="td"><p>{sub_name}</p></TableCell>
                  <TableCell className="td"><p>{fullscore}</p></TableCell>
                  <TableCell className="td">
                    <Button
                      variant="btn btn-secondary"
                      onClick={() => EditShow(data.sub_id)}
                    >
                      EDIT
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal show={showEdit} onHide={EditClose}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>คะแนนเต็ม</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                placeholder={datamodal.fullscore}
                onChange={(e) => handleChange(e)}
                name={"fullscore"}
              />
            </Form.Group>
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

export default SubjectFullScore;
