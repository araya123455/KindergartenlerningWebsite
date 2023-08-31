import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import {
  showclasstime,
  insertclasstime,
  editclasstime,
  deleteclasstime,
  showsyllabus,
  showteacher,
  showkinroom,
  getDataAll,
} from "../slice/DataSlice";

function MgtClassroomTimetable() {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [showsylla, setshowsylla] = useState([]);
  const [showtea, setshowtea] = useState([]);
  const [showkinder, setshowkinder] = useState([]);
  const [showyear, setshowyear] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [insert, setinsert] = useState({
    kinder_id: "",
    yearterm_id: "",
    sylla_id: "",
    tch_id: "",
  });
  const [showEdit, setshowEdit] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [update, setupdate] = useState({
    kinder_id: "",
    yearterm_id: "",
    sylla_id: "",
    tch_id: "",
  });
  const AddClose = () => {
    setShowAdd(false);
    loadData();
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
  //   on click insert value
  const onInsrt = () => {
    let body = {
      kinder_id: insert.kinder_id,
      yearterm_id: insert.yearterm_id,
      sylla_id: insert.sylla_id,
      tch_id: insert.tch_id,
    };

    dispatch(insertclasstime(body))
      .then((result) => {
        setShow(false);
        setShowAdd({
          kinder_id: "",
          yearterm_id: "",
          sylla_id: "",
          tch_id: "",
        });
        useEffect(() => {
          loadData();
        }, []);
        // show success notification
        // notify();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // load classroomtimetable
  const loadData = () => {
    dispatch(showclasstime())
      .then((result) => {
        setshowdata(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // load syllabus
  const loadSyllabus = () => {
    dispatch(showsyllabus())
      .then((result) => {
        setshowsylla(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // load teacher
  const loadTeacher = () => {
    dispatch(showteacher())
      .then((result) => {
        setshowtea(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // load kindergarted room
  const loadkinder = () => {
    dispatch(showkinroom())
      .then((result) => {
        setshowkinder(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // load year term
  const loadyearterm = () => {
    dispatch(getDataAll())
      .then((result) => {
        setshowyear(result.payload);
      })
      .catch((err) => {
        console.log(err);
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
  //   on click save value edit
  const onSave = () => {
    let body = {
      id: datamodal.crt_id,
      body: {
        kinder_id:
          update.kinder_id === "" ? datamodal.kinder_id : update.kinder_id,
        yearterm_id:
          update.yearterm_id === ""
            ? datamodal.yearterm_id
            : update.yearterm_id,
        sylla_id: update.sylla_id === "" ? datamodal.sylla_id : update.sylla_id,
        tch_id: update.tch_id === "" ? datamodal.tch_id : update.tch_id,
      },
    };

    dispatch(editclasstime(body))
      .then((result) => {
        setshowEdit(false);
        setupdate({ kinder_id: "", yearterm_id: "", sylla_id: "", tch_id: "" });
        loadData();
        loadkinder();
        // notify();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   Delete
  const onDelete = (id) => {
    dispatch(deleteclasstime(id))
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
  // reload
  useEffect(() => {
    loadyearterm();
    loadkinder();
    loadTeacher();
    loadSyllabus();
    loadData();
  }, []);
  return (
    <>
      <Button className="button" variant="primary" onClick={AddShow}>
        ADD
      </Button>
      <table>
        <thead>
          <tr>
            <th>ชั้น/ห้อง</th>
            <th>เทอม/ปี</th>
            <th>หลักสูตร</th>
            <th>ครูผู้สอน</th>
            <th>confix</th>
          </tr>
        </thead>
        <tbody>
          {showdata.map((data) => {
            const { crt_id, kinder_id, yearterm_id, sylla_id, tch_id } = data;
            const syllabus = showsylla.find(
              (sylla) => sylla.sylla_id === sylla_id
            );
            const syllabusName = syllabus ? syllabus.sylla_name : "";
            const teacher = showtea.find((te) => te.tch_id === tch_id);
            const teacherName = teacher
              ? `${teacher.prefix} ${teacher.tch_Fname} ${teacher.tch_Lname}`
              : "";
            const kinder = showkinder.find(
              (kin) => kin.kinder_id === kinder_id
            );
            const kinderLevel = kinder ? kinder.kinde_level : "";
            const kinderRoom = kinder ? kinder.Kinder_room : "";

            const yearTerm = showyear.find(
              (term) => term.yearTerm_id === yearterm_id
            );
            const year = yearTerm ? yearTerm.year : "";
            const term = yearTerm ? yearTerm.term : "";
            return (
              <tr key={crt_id}>
                <td>
                  {kinderLevel}/{kinderRoom}
                </td>
                <td>
                  {term}/{year}
                </td>
                <td>{syllabusName}</td>
                <td>{teacherName}</td>
                <td>
                  <Button
                    variant="btn btn-secondary"
                    onClick={() => EditShow(data)}
                    // ส่งค่าผ่าน function ใช้ =>
                  >
                    EDIT
                  </Button>
                  <Button
                    className="buttonD"
                    variant="btn btn-danger"
                    onClick={() => onDelete(crt_id)}
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
              <Form.Label>ชั้น/ห้อง</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                name="kinder_id"
                onChange={(e) => handleInsert(e)}
              >
                <option value="">Choose Room/Level</option>
                {showkinder.map((kin) => (
                  <option key={kin.kinder_id} value={kin.kinder_id}>
                    {kin.kinde_level}/{kin.Kinder_room}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>เทอม/ปี</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                name="yearterm_id"
                onChange={(e) => handleInsert(e)}
              >
                <option value="">Choose Term/Year</option>
                {showyear.map((yearterm) => (
                  <option
                    key={yearterm.yearTerm_id}
                    value={yearterm.yearTerm_id}
                  >
                    {yearterm.term}/{yearterm.year}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ชื่อหลักสูตร</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                name="sylla_id"
                onChange={(e) => handleInsert(e)}
              >
                <option value="">Choose Syllabus</option>
                {showsylla.map((sylla) => (
                  <option key={sylla.sylla_id} value={sylla.sylla_id}>
                    {sylla.sylla_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ครูผู้สอน</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                name="tch_id"
                onChange={(e) => handleInsert(e)}
              >
                <option value="">Choose Teacher</option>
                {showtea.map((teac) => (
                  <option key={teac.tch_id} value={teac.tch_id}>
                    {teac.tch_Fname} {teac.tch_Lname}
                  </option>
                ))}
              </Form.Control>
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
              <Form.Label>ชั้น/ห้อง</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                placeholder={datamodal.kinder_id}
                onChange={(e) => handleChange(e)}
                name={"kinder_id"}
              >
                <option value="">Choose Room/Level</option>
                {showkinder.map((kin) => (
                  <option key={kin.kinder_id} value={kin.kinder_id}>
                    {kin.kinde_level}/{kin.Kinder_room}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>เทอม/ปี</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                placeholder={datamodal.yearterm_id}
                onChange={(e) => handleChange(e)}
                name={"yearterm_id"}
              >
                <option value="">Choose Term/Year</option>
                {showyear.map((yearterm) => (
                  <option
                    key={yearterm.yearTerm_id}
                    value={yearterm.yearTerm_id}
                  >
                    {yearterm.term}/{yearterm.year}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ชื่อหลักสูตร</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                value={update.sylla_id}
                onChange={(e) => handleChange(e)}
                name={"sylla_id"}
              >
                <option value="">Choose Syllabus</option> {/* Default option */}
                {showsylla.map((sylla) => (
                  <option key={sylla.sylla_id} value={sylla.sylla_id}>
                    {sylla.sylla_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ครูผู้สอน</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                placeholder={datamodal.tch_id}
                onChange={(e) => handleChange(e)}
                name={"tch_id"}
              >
                <option value="">Choose Teacher</option>
                {showtea.map((teac) => (
                  <option key={teac.tch_id} value={teac.tch_id}>
                    {teac.tch_Fname} {teac.tch_Lname}
                  </option>
                ))}
              </Form.Control>
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
    </>
  );
}

export default MgtClassroomTimetable;
