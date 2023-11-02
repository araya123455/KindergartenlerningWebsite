import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import { saveToLocalStorage } from "../LocalStorage/localstorage";
import "../assets/css/clouds.css";
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
import {
  insertassessment,
  editassessment,
  deleteassessment,
  showkinroom,
  getDataAll,
} from "../slice/DataSlice";
import { findassessment } from "../slice/SearchDataSlice";

function MgtAssessmentClass() {
  const dispatch = useDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [Show, setshowdata] = useState([]);
  const [showkinder, setShowKinder] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [insert, setinsert] = useState({
    assess_name: "",
    full_score: "",
  });
  const [showEdit, setshowEdit] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [showyear, setShowYear] = useState([]);
  const [showasses, setshowasses] = useState([]);
  const [update, setupdate] = useState({
    assess_name: "",
    full_score: "",
  });
  // select id from onClick in MghAssessment
  const yeartermid = getFromLocalStorage("yearassid");
  const kinderid = getFromLocalStorage("kinassid");
  // console.log(kinderid, yeartermid);

  const loadKinder = () => {
    dispatch(showkinroom())
      .then((result) => {
        setShowKinder(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadyearterm = () => {
    dispatch(getDataAll())
      .then((result) => {
        setShowYear(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadassessment = () => {
    dispatch(findassessment({ yeartermid, kinderid }))
      .then((result) => {
        setshowasses(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadData = () => {
    dispatch(showkinroom())
      .then((result) => {
        setshowdata(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AddClose = () => {
    setShowAdd(false);
  };
  const AddShow = () => {
    setShowAdd(true);
  };

  //   recomment
  const handleInsert = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setinsert({
      ...insert,
      [name]: value,
    });
  };

  //insert
  const onInsert = () => {
    if (!insert.assess_name || !insert.full_score || !kinderid || !yeartermid) {
      alert("กรุณาป้อนข้อมูลให้ครบก่อนบันทึก!!");
      return;
    }
    let body = {
      assess_name: insert.assess_name,
      full_score: insert.full_score,
      kinder_id: kinderid,
      yearterm_id: yeartermid,
    };

    dispatch(insertassessment(body))
      .then((result) => {
        setinsert({
          assess_name: "",
          full_score: "",
        });
        loadassessment();
        setShowAdd(false);
        toast.success("Assessment records inserted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to insert assessment records");
      });
  };

  const EditClose = () => {
    setshowEdit(false);
  };

  const EditShow = (data) => {
    setDatamodal(data);
    setshowEdit(true);
  };

  //   recomment
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setupdate({
      ...update,
      [name]: value,
    });
  };

  //EDIT
  const onSave = () => {
    let body = {
      id: datamodal.asses_id,
      body: {
        assess_name:
          update.assess_name === ""
            ? datamodal.assess_name
            : update.assess_name,
        full_score:
          update.full_score === "" ? datamodal.full_score : update.full_score,
      },
    };

    dispatch(editassessment(body))
      .then((result) => {
        setshowEdit(false);
        setupdate({
          assess_name: "",
          full_score: "",
        });
        loadassessment();
        setshowEdit(false);
        toast.success("Assessment records have been edited successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to insert assessment records");
      });
  };

  const handleDeleteConfirmation = (asses_id) => {
    setDatamodal({ asses_id }); // Store the ID of the record to be deleted
    setShowDeleteConfirmation(true); // Show the delete confirmation modal
  };

  const onDelete = (id) => {
    dispatch(deleteassessment(id))
      .unwrap() 
      .then((result) => {
        if (result.payload && result.payload.error) {
          console.log(result.payload.error); // You can log the error or show it to the user
        } else {
          // Deletion successful, reload the data
          loadassessment();
        }
        setShowDeleteConfirmation(false);
      })
      .catch((err) => {
        console.log(err);
        setShowDeleteConfirmation(false);
        alert(err.message);
      });
  };

  const yearTerm = showyear.find((data) => data.yearTerm_id === yeartermid);
  const getyear = yearTerm ? yearTerm.year : "";
  const getterm = yearTerm ? yearTerm.term : "";
  const kinroom = showkinder.find((data) => data.kinder_id === kinderid);
  const getkin = kinroom ? kinroom.kinde_level : "";
  const getroom = kinroom ? kinroom.Kinder_room : "";

  useEffect(() => {
    loadData();
    loadKinder();
    loadyearterm();
    loadassessment();
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
      <h1>
        ห้องอนุบาล {getkin}/{getroom} ปีการศึกษา {getyear} เทอม {getterm}
      </h1>
      <div>
        <Button className="button" variant="primary" onClick={AddShow}>
          ADD
        </Button>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className="TableHead">
              <TableRow>
                <TableCell>
                  <p className="headerC">ชื่อประเมิน</p>
                </TableCell>
                <TableCell>
                  <p className="headerC">คะแนนเต็ม</p>
                </TableCell>
                <TableCell>
                  <p className="headerC">แก้ไข</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showasses?.map((data) => {
                const { asses_id, assess_name, full_score } = data;
                return (
                  <TableRow key={asses_id}>
                    <TableCell>
                      <p>{assess_name}</p>
                    </TableCell>
                    <TableCell>
                      <p>{full_score}</p>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="btn btn-secondary"
                        onClick={() => EditShow(data)}
                      >
                        EDIT
                      </Button>
                      <Button
                        className="buttonD"
                        variant="btn btn-danger"
                        onClick={() => handleDeleteConfirmation(asses_id)}
                      >
                        DELETE
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          show={showDeleteConfirmation}
          onHide={() => setShowDeleteConfirmation(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteConfirmation(false)}
            >
              Cancel
            </Button>
            <Button
              variant="btn btn-danger"
              onClick={() => onDelete(datamodal.asses_id)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showAdd} onHide={AddClose}>
          <Modal.Header closeButton>
            <Modal.Title>INSERT ASSESSMENT</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>ชื่อแบบประเมิน</Form.Label>
                <Form.Control
                  className="input-line"
                  type="text"
                  name="assess_name"
                  onChange={(e) => handleInsert(e)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>คะแนนเต็ม</Form.Label>
                <Form.Control
                  className="input-line"
                  type="text"
                  name="full_score"
                  onChange={(e) => handleInsert(e)}
                ></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={AddClose}>
              Close
            </Button>
            <Button variant="btn btn-outline-secondary" onClick={onInsert}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showEdit} onHide={EditClose}>
          <Modal.Header closeButton>
            <Modal.Title>EDIT DATA</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>ชื่อแบบประเมิน</Form.Label>
                <Form.Control
                  className="input-line"
                  type="text"
                  name={"assess_name"}
                  placeholder={datamodal.assess_name}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>คะแนนเต็ม</Form.Label>
                <Form.Control
                  className="input-line"
                  type="text"
                  name={"full_score"}
                  placeholder={datamodal.full_score}
                  onChange={(e) => handleChange(e)}
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
    </div>
  );
}

export default MgtAssessmentClass;
