import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
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
  showquestion,
  insertquestion,
  editquestion,
  deletequestion,
  showtest,
} from "../slice/TeacherSlice";
import { getFromLocalStorage } from "../LocalStorage/localstorage";

function CreateChoice() {
  const dispatch = useDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showdata, setshowdata] = useState([]);
  const [showTest, setShowTest] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const testId = getFromLocalStorage("teaTest_id");
  const [insert, setinsert] = useState({
    ques: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    answer: "",
    score_ques: "",
    test_id: "",
  });
  const [showEdit, setshowEdit] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [update, setUpdate] = useState({
    ques: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    answer: "",
    score_ques: "",
  });

  // select choice
  const [ch1, setCh1] = useState("");
  const [ch2, setCh2] = useState("");
  const [ch3, setCh3] = useState("");
  const [ch4, setCh4] = useState("");

  const testid = showTest.find((tes) => tes.test_id === testId);
  const testname = testid ? testid.test_detail : "";

  const loadData = () => {
    dispatch(showquestion())
      .then((result) => {
        const filteredData = result.payload.filter(
          (data) => data.test_id === testId
        );
        setshowdata(filteredData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadTest = () => {
    dispatch(showtest())
      .then((result) => {
        setShowTest(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const AddClose = () => {
    setShowAdd(false);
    clearChoiceData();
    loadData();
  };
  const AddShow = () => {
    setShowAdd(true);
    loadData();
    clearChoiceData();
  };
  const EditClose = () => {
    setshowEdit(false);
    clearChoiceData();
    loadData();
  };
  const EditShow = (data) => {
    setDatamodal(data);
    setshowEdit(true);
  };

  const handleInsert = (e) => {
    const { name, value } = e.target;

    // For question and score_ques fields
    if (name === "ques" || name === "score_ques") {
      setinsert((prevInsert) => ({
        ...prevInsert,
        [name]: value,
      }));
    } else if (name === "answer") {
      // For answer field
      setinsert((prevInsert) => ({
        ...prevInsert,
        answer: value,
      }));
    } else {
      setinsert((prevInsert) => ({
        ...prevInsert,
        [name]: value,
      }));
    }
  };

  const handleChoiceChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding choice state based on the input field name
    switch (name) {
      case "choice1":
        setCh1(value);
        break;
      case "choice2":
        setCh2(value);
        break;
      case "choice3":
        setCh3(value);
        break;
      case "choice4":
        setCh4(value);
        break;
      default:
        break;
    }
  };

  const clearChoiceData = () => {
    setCh1("");
    setCh2("");
    setCh3("");
    setCh4("");
  };

  const handleAnswerChange = (e) => {
    const { value } = e.target;
    setinsert((prevInsert) => ({
      ...prevInsert,
      answer: value,
    }));
  };

  //   on click insert value
  const onInsrt = () => {
    if (
      !insert.ques ||
      !insert.choice1 ||
      !insert.choice2 ||
      !insert.choice3 ||
      !insert.choice4 ||
      !insert.answer ||
      !insert.score_ques ||
      !testId
    ) {
      alert("กรุณาป้อนข้อมูลให้ครบก่อนบันทึก!!");
      return;
    }
    let body = {
      ques: insert.ques,
      choice1: insert.choice1,
      choice2: insert.choice2,
      choice3: insert.choice3,
      choice4: insert.choice4,
      answer: insert.answer,
      score_ques: insert.score_ques,
      test_id: testId,
    };

    dispatch(insertquestion(body))
      .then((result) => {
        setShowAdd(false);
        setinsert({
          ques: "",
          choice1: "",
          choice2: "",
          choice3: "",
          choice4: "",
          answer: "",
          score_ques: "",
          test_id: "",
        });
        useEffect(() => {
          loadData();
        }, []);
        AddClose();
        clearChoiceData();
        toast.success("Create choice records inserted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to insert create choice records");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For question and score_ques fields
    if (name === "ques" || name === "score_ques") {
      setUpdate((prevUpdate) => ({
        ...prevUpdate,
        [name]: value,
      }));
    } else if (name === "answer") {
      // For answer field
      setUpdate((prevUpdate) => ({
        ...prevUpdate,
        answer: value,
      }));
    } else {
      setUpdate((prevUpdate) => ({
        ...prevUpdate,
        [name]: value,
      }));
    }
  };
  //   on click save value edit
  const onSave = () => {
    let body = {
      id: datamodal.ques_id,
      body: {
        ques: update.ques === "" ? datamodal.ques : update.ques,
        choice1: update.choice1 === "" ? datamodal.choice1 : update.choice1,
        choice2: update.choice2 === "" ? datamodal.choice2 : update.choice2,
        choice3: update.choice3 === "" ? datamodal.choice3 : update.choice3,
        choice4: update.choice4 === "" ? datamodal.choice4 : update.choice4,
        answer: update.answer === "" ? datamodal.answer : update.answer,
        score_ques:
          update.score_ques === "" ? datamodal.score_ques : update.score_ques,
      },
    };

    dispatch(editquestion(body))
      .then((result) => {
        setshowEdit(false);
        setUpdate({
          ques: "",
          choice1: "",
          choice2: "",
          choice3: "",
          choice4: "",
          answer: "",
          score_ques: "",
        });
        loadData();
        toast.success("Create choice records have been edited successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to insert create choice records");
      });
  };

  const handleDeleteConfirmation = (ques_id) => {
    setDatamodal({ ques_id }); // Store the ID of the record to be deleted
    setShowDeleteConfirmation(true); // Show the delete confirmation modal
  };

  const onDelete = (id) => {
    dispatch(deletequestion(id))
      .then((result) => {
        if (result.payload && result.payload.error) {
          console.log(result.payload.error);
        } else {
          loadData();
          setShowDeleteConfirmation(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
    loadTest();
  }, []);

  // set value for answer
  useEffect(() => {
    if (showEdit) {
      setCh1(datamodal.choice1);
      setCh2(datamodal.choice2);
      setCh3(datamodal.choice3);
      setCh4(datamodal.choice4);
    }
  }, [showEdit, datamodal]);

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
        <Link to={"/teacher/test/CreateTest"} className="back-font">
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
        <h2 className="h2">{testname}</h2>
      </div>
      <div>
        <Button className="button" variant="primary" onClick={AddShow}>
          ADD
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="TableHead">
            <TableRow>
              <TableCell>
                <p className="headerC">คำถาม</p>
              </TableCell>
              <TableCell>
                <p className="headerC">ข้อที่1</p>
              </TableCell>
              <TableCell>
                <p className="headerC">ข้อที่2</p>
              </TableCell>
              <TableCell>
                <p className="headerC">ข้อที่3</p>
              </TableCell>
              <TableCell>
                <p className="headerC">ข้อที่4</p>
              </TableCell>
              <TableCell>
                <p className="headerC">คำตอบ</p>
              </TableCell>
              <TableCell>
                <p className="headerC">คะแนน</p>
              </TableCell>
              <TableCell>
                <p className="headerC">แก้ไข</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showdata.map((data) => {
              const {
                ques_id,
                ques,
                choice1,
                choice2,
                choice3,
                choice4,
                answer,
                score_ques,
              } = data;
              return (
                <TableRow key={ques_id}>
                  <TableCell><p>{ques}</p></TableCell>
                  <TableCell><p>{choice1}</p></TableCell>
                  <TableCell><p>{choice2}</p></TableCell>
                  <TableCell><p>{choice3}</p></TableCell>
                  <TableCell><p>{choice4}</p></TableCell>
                  <TableCell><p>{answer}</p></TableCell>
                  <TableCell><p>{score_ques}</p></TableCell>
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
                      onClick={() => handleDeleteConfirmation(ques_id)}
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
      {/* Insert Data */}
      <Modal show={showAdd} onHide={AddClose}>
        <Modal.Header closeButton>
          <Modal.Title>INSERT DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>คำถาม</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name="ques"
                onChange={(e) => handleInsert(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ตัวเลือกที่ 1</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name="choice1"
                onChange={(e) => {
                  handleInsert(e); // Update 'insert' state
                  handleChoiceChange(e); // Update 'ch1' state
                }}
                value={ch1 !== "" ? ch1 : undefined}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ตัวเลือกที่ 2</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name="choice2"
                onChange={(e) => {
                  handleInsert(e); // Update 'insert' state
                  handleChoiceChange(e); // Update 'ch1' state
                }}
                value={ch2 !== "" ? ch2 : undefined}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ตัวเลือกที่ 3</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name="choice3"
                onChange={(e) => {
                  handleInsert(e); // Update 'insert' state
                  handleChoiceChange(e); // Update 'ch1' state
                }}
                value={ch3 !== "" ? ch3 : undefined}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ตัวเลือกที่ 4</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name="choice4"
                onChange={(e) => {
                  handleInsert(e); // Update 'insert' state
                  handleChoiceChange(e); // Update 'ch1' state
                }}
                value={ch4 !== "" ? ch4 : undefined}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>คำตอบ</Form.Label>
              <Form.Control
                className="input-line"
                as="select"
                name="answer"
                value={insert.answer}
                onChange={(e) => {
                  handleInsert(e); // Update 'insert' state
                  handleAnswerChange(e); // Update 'answer' field in 'insert' state
                }}
              >
                <option value="">Select Answer</option>
                <option value={ch1}>{ch1}</option>
                <option value={ch2}>{ch2}</option>
                <option value={ch3}>{ch3}</option>
                <option value={ch4}>{ch4}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>คะแนน</Form.Label>
              <Form.Control
                className="input-line"
                type="number"
                name="score_ques"
                onChange={(e) => handleInsert(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={AddClose}>
            Close
          </Button>
          <Button variant="btn btn-outline-secondary" onClick={onInsrt}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Data */}
      <Modal show={showEdit} onHide={EditClose}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>คำถาม</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                placeholder={datamodal.ques}
                onChange={(e) => handleChange(e)}
                name={"ques"}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ตัวเลือกที่ 1</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name={"choice1"}
                placeholder={datamodal.choice1}
                onChange={(e) => {
                  handleChange(e); // Update 'insert' state
                  handleChoiceChange(e); // Update 'ch1' state
                }}
                value={ch1 !== "" ? ch1 : ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ตัวเลือกที่ 2</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name={"choice2"}
                placeholder={datamodal.choice2}
                onChange={(e) => {
                  handleChange(e); // Update 'insert' state
                  handleChoiceChange(e); // Update 'ch2' state
                }}
                value={ch2 !== "" ? ch2 : ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ตัวเลือกที่ 3</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name={"choice3"}
                placeholder={datamodal.choice3}
                onChange={(e) => {
                  handleChange(e); // Update 'insert' state
                  handleChoiceChange(e); // Update 'ch3' state
                }}
                value={ch3 !== "" ? ch3 : ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ตัวเลือกที่ 4</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name={"choice4"}
                placeholder={datamodal.choice4}
                onChange={(e) => {
                  handleChange(e); // Update 'insert' state
                  handleChoiceChange(e); // Update 'ch4' state
                }}
                value={ch4 !== "" ? ch4 : ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>คำตอบ</Form.Label>
              <Form.Control
                className="input-line"
                as="select"
                name="answer"
                value={update.answer} // Use 'update.answer' from state instead of 'insert.answer'
                onChange={(e) => handleChange(e)}
              >
                <option value="">Select Answer</option>
                <option value={ch1}>
                  {ch1 !== "" ? ch1 : datamodal.choice1}
                </option>
                <option value={ch2}>
                  {ch2 !== "" ? ch2 : datamodal.choice2}
                </option>
                <option value={ch3}>
                  {ch3 !== "" ? ch3 : datamodal.choice3}
                </option>
                <option value={ch4}>
                  {ch4 !== "" ? ch4 : datamodal.choice4}
                </option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>คะแนน</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                placeholder={datamodal.score_ques}
                onChange={(e) => handleChange(e)}
                name={"score_ques"}
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
            onClick={() => onDelete(datamodal.ques_id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Outlet />
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

export default CreateChoice;
