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
import { findstudent, findassessment } from "../slice/StudentSlice";
import "../assets/css/attendance.css";

function StudentAssessment() {
  const dispatch = useDispatch();
  const yeartermid = getFromLocalStorage("yearassid");
  const kinderid = getFromLocalStorage("kinassid");
  const [showstudata, setshowstudata] = useState([]);
  const [showaeesedata, setshowaeesedata] = useState([]);
  const [showasses, setshowasses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [stuid, setstuid] = useState([]);
  const [insert, setinsert] = useState({});
  const [fullScores, setFullScores] = useState({});
  const [showEdit, setshowEdit] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  var check;

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

  const AddClose = () => {
    setShowAdd(false);
  };

  const AddShow = (id) => {
    setShowAdd(true);
    setstuid(id);
  };

  const handleInsert = (assesId, value) => {
    setinsert({
      ...insert,
      [assesId]: value,
    });
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

  const onInsert = () => {
    const body = Object.keys(insert).map((assesId) => ({
      asses_score: insert[assesId],
      stu_id: stuid,
      asses_id: assesId,
    }));

    // Check if the scores are within the valid range
    if (valid(body)) {
      dispatch(assessmentstuinsert(body))
        .then((result) => {
          // console.log(body);
          // console.log(result);
          setinsert({});
          loadshowstudata();
          loadassesstu();
          setShowAdd(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("กรุณากรอกคะแนนให้อยู่ในช่วงของคะแนนเต็ม!!");
    }
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
          console.log(results);
          setshowEdit(false);
          loadshowasses();
          loadshowstudata();
          loadassesstu();
        })
        .catch((err) => {
          console.log(err);
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

  return (
    <div>
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
      <table>
        <thead>
          <tr>
            <th className="table-header th">ชื่อ-นามสกุล</th>
            <th className="table-header th">รหัสประจำตัว</th>
            {showaeesedata?.map((data) => {
              const { asses_id, assess_name, full_score } = data;
              return (
                <th className="table-header th" key={asses_id}>
                  {assess_name}({full_score})
                </th>
              );
            })}
            <th>Confix</th>
          </tr>
        </thead>
        <tbody>
          {/* Student rows */}
          {showstudata?.map((student, index) => {
            const { stu_id, prefix, stu_Fname, stu_Lname, stu_sn } = student;
            // Find assessment scores for this student
            const studentAssessmentScores = showasses?.filter(
              (score) => score?.stu_id === stu_id
            );
            check = studentAssessmentScores;
            // console.log(check);
            // console.log(check.length);
            return (
              <tr key={stu_id}>
                <td className="td">
                  {prefix} {stu_Fname} {stu_Lname}
                </td>
                <td className="td">{stu_sn}</td>
                {/* Assessment scores */}
                {showaeesedata?.map((data) => {
                  const { asses_id } = data;
                  // Students who have already scored
                  const assessmentScore = studentAssessmentScores?.find(
                    (score) => score?.asses_id === asses_id
                  );
                  return (
                    <td className="td" key={asses_id}>
                      {assessmentScore ? assessmentScore?.asses_score : "0"}
                    </td>
                  );
                })}
                <td>
                  <Button
                    variant="btn btn-primary"
                    onClick={() => AddShow(stu_id)}
                    disabled={studentAssessmentScores.length > 0 ? true : false} // Disable the button if scores exist
                  >
                    ADD
                  </Button>
                  <Button
                    className="buttonD"
                    variant="btn btn-secondary"
                    onClick={() => EditShow(studentAssessmentScores)}
                    disabled={studentAssessmentScores.length > 0 ? false : true} // Disable the button if scores exist
                  >
                    EDIT
                  </Button>
                  <Button
                    className="buttonD"
                    variant="btn btn-danger"
                    onClick={() => onDelete(studentAssessmentScores)}
                    disabled={studentAssessmentScores.length > 0 ? false : true}
                  >
                    DELETE
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Modal for inserting scores */}
      <Modal show={showAdd} onHide={AddClose}>
        <Modal.Header closeButton>
          <Modal.Title>INSERT DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {showaeesedata?.map((data) => {
              const { asses_id, assess_name, full_score } = data;
              return (
                <Form.Group
                  className="mb-3"
                  controlId={`asses_score_${asses_id}`}
                  key={asses_id}
                >
                  <Form.Label>
                    {assess_name} คะแนนเต็ม: {full_score} คะแนน
                  </Form.Label>
                  <Form.Control
                    className="input-line"
                    type="number"
                    name={`asses_score_${asses_id}`}
                    value={insert[`${asses_id}`] || ""}
                    onChange={(e) =>
                      handleInsert(`${asses_id}`, e.target.value)
                    }
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
    </div>
  );
}

export default StudentAssessment;
