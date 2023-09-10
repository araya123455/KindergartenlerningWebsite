import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
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
        setShowAdd({
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
      })
      .catch((err) => {
        console.log(err);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDelete = (id) => {
    dispatch(deletequestion(id))
      .then((result) => {
        if (result.payload && result.payload.error) {
          console.log(result.payload.error);
        } else {
          loadData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onClickId = (id) => {
    console.log("id: ", id);
    props.set(testId * id);
  };

  useEffect(() => {
    loadData();
    loadTest();
  }, []);

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
      <Link to={"/test/CreateTest"}>
        <svg
          baseProfile="tiny"
          height="24px"
          id="Layer_1"
          version="1.2"
          viewBox="0 0 24 24"
          width="24px"
          //   xml:space="preserve"
          //   xmlns="http://www.w3.org/2000/svg"
          //   xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g>
            <path d="M19.164,19.547c-1.641-2.5-3.669-3.285-6.164-3.484v1.437c0,0.534-0.208,1.036-0.586,1.414   c-0.756,0.756-2.077,0.751-2.823,0.005l-6.293-6.207C3.107,12.523,3,12.268,3,11.999s0.107-0.524,0.298-0.712l6.288-6.203   c0.754-0.755,2.073-0.756,2.829,0.001C12.792,5.463,13,5.965,13,6.499v1.704c4.619,0.933,8,4.997,8,9.796v1   c0,0.442-0.29,0.832-0.714,0.958c-0.095,0.027-0.19,0.042-0.286,0.042C19.669,19.999,19.354,19.834,19.164,19.547z M12.023,14.011   c2.207,0.056,4.638,0.394,6.758,2.121c-0.768-3.216-3.477-5.702-6.893-6.08C11.384,9.996,11,10,11,10V6.503l-5.576,5.496l5.576,5.5   V14C11,14,11.738,14.01,12.023,14.011z" />
          </g>
        </svg>
      </Link>
      <div>
        <h2>{testname}</h2>
      </div>
      <div>
        <Button className="button" variant="primary" onClick={AddShow}>
          ADD
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>คำถาม</th>
            <th>ข้อที่1</th>
            <th>ข้อที่2</th>
            <th>ข้อที่3</th>
            <th>ข้อที่4</th>
            <th>คำตอบ</th>
            <th>คะแนน</th>
            <th>Confix</th>
          </tr>
        </thead>
        <tbody>
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
              <tr key={ques_id}>
                <td>{ques}</td>
                <td>{choice1}</td>
                <td>{choice2}</td>
                <td>{choice3}</td>
                <td>{choice4}</td>
                <td>{answer}</td>
                <td>{score_ques}</td>
                <td>
                  <Button
                    variant="btn btn-secondary"
                    onClick={() => EditShow(data)}
                  >
                    EDIT
                  </Button>
                  <Button
                    className="buttonD"
                    variant="btn btn-danger"
                    onClick={() => onDelete(ques_id)}
                  >
                    DELETE
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
      <Outlet />
    </div>
  );
}

export default CreateChoice;
