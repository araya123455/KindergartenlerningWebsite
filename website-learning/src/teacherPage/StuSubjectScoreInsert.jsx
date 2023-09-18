import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
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
import { th } from "date-fns/locale";

function StuSubjectScoreInsert() {
  const dispatch = useDispatch();
  const yeartermid = getFromLocalStorage("yearscoreid");
  const kinderid = getFromLocalStorage("kinscoreid");
  const [showstudata, setshowstudata] = useState([]);
  const [showsubject, setshowsubject] = useState([]);
  const [showsylla, setshowsylla] = useState([]);
  const syllabus = showsylla.map((s) => s.sylla_name);
  const [showsubscore, setshowsubscore] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [insert, setinsert] = useState({});
  const [stuid, setstuid] = useState([]);
  const [showEdit, setshowEdit] = useState(false);
  const [datamodal, setDatamodal] = useState([]);

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

  const AddClose = () => {
    setShowAdd(false);
  };

  const AddShow = (id) => {
    setShowAdd(true);
    console.log(id);
    setstuid(id);
  };

  const handleInsert = (subId, value) => {
    // console.log(subId, value);
    setinsert({
      ...insert,
      [subId]: value,
    });
  };

  const onInsert = () => {
    const body = Object.keys(insert).map((subId) => ({
      subscore: insert[subId],
      sub_id: subId,
      stu_id: stuid,
    }));
    // console.log(body);

    Promise.all(body.map((item) => dispatch(subjectscoreinsert(item))))
      .then((result) => {
        // console.log(body);
        // console.log(result);
        setinsert({});
        loadsubject();
        loadsyllabus();
        loadsubscore();
        setShowAdd(false);
      })
      .catch((err) => {
        console.log(err);
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

  const handleEdit = (sub_id, value) => {
    // console.log(sub_id);
    setDatamodal((prevDataModal) =>
      prevDataModal.map((score) =>
        score.sub_id === sub_id ? { ...score, subscore: value } : score
      )
    );
  };

  // Updated onSave function
  const onSave = () => {
    const body = datamodal.map((score) => ({
      id: score.subscore_id,
      body: {
        subscore: score.subscore === "" ? null : parseInt(score.subscore),
      },
    }));

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
    loadshowstudent();
    loadsubject();
    loadsyllabus();
    loadsubscore();
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
            <th className="table-header th">ชื่อ-นามสกุล</th>
            <th className="table-header th">รหัสประจำตัว</th>
            {showsubject?.map((data) => {
              const { sub_id, sub_name } = data;
              return (
                <th className="table-header th" key={sub_id}>
                  {sub_name}
                </th>
              );
            })}
            <th className="table-header th">Confix</th>
          </tr>
        </thead>
        <tbody>
          {showstudata?.map((student, index) => {
            const { stu_id, prefix, stu_Fname, stu_Lname, stu_sn } = student;
            // Find student subject score
            const studentsubscore = showsubscore?.filter(
              (score) => score?.stu_id === stu_id
            );

            return (
              <tr key={stu_id}>
                <td className="td">
                  {prefix} {stu_Fname} {stu_Lname}
                </td>
                <td className="td">{stu_sn}</td>
                {showsubject?.map((data) => {
                  const { sub_id } = data;
                  const subjectscore = studentsubscore?.find(
                    (score) => score?.sub_id === sub_id
                  );
                  return (
                    <td className="td" key={sub_id}>
                      {subjectscore ? subjectscore?.subscore : "0"}
                    </td>
                  );
                })}
                <td>
                  <Button
                    variant="btn btn-primary"
                    onClick={() => AddShow(stu_id)}
                    disabled={studentsubscore.length > 0 ? true : false} // Disable the button if scores exist
                  >
                    ADD
                  </Button>
                  <Button
                    className="buttonD"
                    variant="btn btn-secondary"
                    onClick={() => EditShow(studentsubscore)}
                    disabled={studentsubscore.length > 0 ? false : true} // Disable the button if scores exist
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal show={showAdd} onHide={AddClose}>
        <Modal.Header closeButton>
          <Modal.Title>INSERT DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {showsubject?.map((data) => {
              const { sub_id, sub_name } = data;
              return (
                <Form.Group
                  className="mb-3"
                  controlId={`subject_score_${sub_id}`}
                  key={sub_id}
                >
                  <Form.Label>ป้อนคะแนนวิชา {sub_name}</Form.Label>
                  <Form.Control
                    className="input-line"
                    type="number"
                    name={`subject_score_${sub_id}`}
                    value={insert[`${sub_id}`] || ""}
                    onChange={(e) => handleInsert(`${sub_id}`, e.target.value)}
                  />
                </Form.Group>
              );
            })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={AddClose}>
            Close
          </Button>
          <Button
            variant="btn btn-outline-secondary"
            onClick={() => onInsert()}
          >
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
            {showsubject?.map((data) => {
              const { sub_id, sub_name } = data;
              const subjectScore = datamodal.find((s) => s?.sub_id === sub_id);
              return (
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                  key={sub_id}
                >
                  <Form.Label>ป้อนคะแนนวิชา {sub_name}</Form.Label>
                  <Form.Control
                    className="input-line"
                    type="number"
                    name={`sub_score_${sub_id}`}
                    placeholder={subjectScore ? subjectScore?.subscore : ""}
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
