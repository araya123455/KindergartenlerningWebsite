import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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
    if (
      !insert.kinder_id ||
      !insert.yearterm_id ||
      !insert.sylla_id ||
      !insert.tch_id
    ) {
      alert("กรุณาป้อนข้อมูลให้ครบก่อนบันทึก!!");
      return;
    }
    let body = {
      kinder_id: insert.kinder_id,
      yearterm_id: insert.yearterm_id,
      sylla_id: insert.sylla_id,
      tch_id: insert.tch_id,
    };

    dispatch(insertclasstime(body))
      .then((result) => {
        setinsert({
          kinder_id: "",
          yearterm_id: "",
          sylla_id: "",
          tch_id: "",
        });
        loadData();
        setShowAdd(false);
        toast.success("Classroom Timetable records inserted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to insert Classroom Timetable records");
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
        toast.success(
          "Classroom Timetable records have been edited successfully"
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to insert Classroom Timetable records");
      });
  };

  const handleDeleteConfirmation = (crt_id) => {
    setDatamodal({ crt_id }); // Store the ID of the record to be deleted
    setShowDeleteConfirmation(true); // Show the delete confirmation modal
  };

  //   Delete
  const onDelete = (id) => {
    dispatch(deleteclasstime(id))
      .unwrap()
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
        setShowDeleteConfirmation(false);
        alert(err.message);
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
      <Table stickyHeader aria-label="sticky table">
        <TableHead className="TableHead">
          <TableRow>
            <TableCell>
              <p className="headerC">ชั้น/ห้อง</p>
            </TableCell>
            <TableCell>
              <p className="headerC">เทอม/ปี</p>
            </TableCell>
            <TableCell>
              <p className="headerC">หลักสูตร</p>
            </TableCell>
            <TableCell>
              <p className="headerC">ครูผู้สอน</p>
            </TableCell>
            <TableCell>
              <p className="headerC">แก้ไข</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
              <TableRow key={crt_id}>
                <TableCell>
                  <p>
                    {kinderLevel}/{kinderRoom}
                  </p>
                </TableCell>
                <TableCell>
                  <p>
                    {term}/{year}
                  </p>
                </TableCell>
                <TableCell>
                  <p>{syllabusName}</p>
                </TableCell>
                <TableCell>
                  <p>{teacherName}</p>
                </TableCell>
                <TableCell>
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
                    onClick={() => handleDeleteConfirmation(crt_id)}
                  >
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
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
            onClick={() => onDelete(datamodal.crt_id)}
          >
            Delete
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
    </>
  );
}

export default MgtClassroomTimetable;
