import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import { subfullscoretupdate } from "../slice/TeacherSlice";
import { shownamesyllabus, shownamesubject } from "../slice/StudentSlice";

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadsubject();
    loadsyllabus();
  }, []);

  return (
    <div>
      <Link to={"/subjectScore"}>
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
        <h2>{syllabus}</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>ชื่อวิชา</th>
            <th>คะแนนเต็ม</th>
            <th className="table-header th">Confix</th>
          </tr>
        </thead>
        <tbody>
          {showsubject?.map((data) => {
            const { sub_id, sub_name, fullscore } = data;
            return (
              <tr key={sub_id}>
                <td className="td">{sub_name}</td>
                <td className="td">{fullscore}</td>
                <td className="td">
                  <Button
                    variant="btn btn-secondary"
                    onClick={() => EditShow(data.sub_id)}
                  >
                    EDIT
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
    </div>
  );
}

export default SubjectFullScore;
