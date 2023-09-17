import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import { saveToLocalStorage } from "../LocalStorage/localstorage";
import "../assets/css/clouds.css";
import {
  showassessment,
  insertassessment,
  editassessment,
  deleteassessment,
  showkinroom,
  getDataAll,
} from "../slice/DataSlice";

function MgtAssessmentClass() {
  const dispatch = useDispatch();
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

  const AddClose = () => {
    setShowAdd(false);
  };
  const AddShow = () => {
    setShowAdd(true);
  };
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
    dispatch(showassessment())
      .then((result) => {
        setshowasses(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
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
    let body = {
      assess_name: insert.assess_name,
      full_score: insert.full_score,
      kinder_id: kinderid,
      yearterm_id: yeartermid,
    };
    dispatch(insertassessment(body))
      .then((result) => {
        setShowAdd({
          assess_name: "",
          full_score: "",
        });
        loadassessment();
        setShowAdd(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    dispatch(showkinroom())
      .then((result) => {
        setshowdata(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

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
          update.full_score === "" 
          ? datamodal.full_score 
          : update.full_score,
      },
    };
    dispatch(editassessment(body))
      .then((result) => {
        setshowEdit(false);
        setupdate({
          assess_name: "",
          full_score: "",
        });
        loadData();
        AddClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //--------------------
  useEffect(() => {
    loadData();
    loadKinder();
    loadyearterm();
    loadassessment();
  }, []);

  const yearTerm = showyear.find((data) => data.yearTerm_id === yeartermid);
  const getyear = yearTerm ? yearTerm.year : "";
  const getterm = yearTerm ? yearTerm.term : "";
  const kinroom = showkinder.find((data) => data.kinder_id === kinderid);
  const getkin = kinroom ? kinroom.kinde_level : "";
  const getroom = kinroom ? kinroom.Kinder_room : "";

  const onDelete = (id) => {
    dispatch(deleteassessment(id))
      .then((result) => {
        if (result.payload && result.payload.error) {
          console.log(result.payload.error); // You can log the error or show it to the user
        } else {
          // Deletion successful, reload the data
          loadData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const yeartermid = getFromLocalStorage("yearassid");
  // const kinderid = getFromLocalStorage("kinassid");

  getFromLocalStorage("yeartermid", null);
  getFromLocalStorage("kinderid", null);
  const onClickId = (id) => {
    saveToLocalStorage("yeartermid", id);
    saveToLocalStorage("kinderid", id);
  };
  // reload
  useEffect(() => {
    loadData();
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
      <h1>
        ห้องอนุบาล {getkin}/{getroom} ปีการศึกษา {getyear} เทอม {getterm}
      </h1>
      <Link to={"/MgtAssessment"}>
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
        <Button className="button" variant="primary" onClick={AddShow}>
          ADD
        </Button>
        <table>
          <thead>
            <tr>
              <th>ชื่อประเมิน</th>
              <th>คะแนนเต็ม</th>
              <th>Confix</th>
            </tr>
          </thead>
          <tbody>
            {showasses?.map((data) => {
              const { asses_id, assess_name, full_score } = data;
              return (
                <tr key={asses_id}>
                  <td>{assess_name}</td>
                  <td>{full_score}</td>
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
                      onClick={() => onDelete(asses_id)}
                    >
                      DELETE
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

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
                <Form.Label>คะแนนที่ได้</Form.Label>
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
                  name="assess_name"
                  placeholder={datamodal.assess_name}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>คะแนนที่ได้</Form.Label>
                <Form.Control
                  className="input-line"
                  type="text"
                  name="full_score"
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
      </div>
    </div>
  );
}

export default MgtAssessmentClass;
