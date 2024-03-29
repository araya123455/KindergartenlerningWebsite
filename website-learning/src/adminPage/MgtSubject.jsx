import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import {
  insertsubject,
  editsubject,
  deletesubject,
  showsyllabus,
} from "../slice/DataSlice";
import { selectsubject } from "../slice/SearchDataSlice";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MgtSubject() {
  const dispatch = useDispatch();
  const [showsylla, setshowsylla] = useState([]);
  const [selectsub, setselectsub] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const syllaId = getFromLocalStorage("syllaId");
  const [insert, setinsert] = useState({ sub_name: "" });
  const [showEdit, setshowEdit] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [update, setupdate] = useState({ sub_name: "" });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // show syllabus
  const loadSyllabus = () => {
    dispatch(showsyllabus())
      .then((result) => {
        setshowsylla(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadselectsub = () => {
    dispatch(selectsubject({ syllaId }))
      .then((result) => {
        setselectsub(result.payload);
        // console.log(selectsub);
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

  //   on click insert value
  const onInsrt = () => {
    if (!insert.sub_name || !syllaId) {
      alert("กรุณาป้อนข้อมูลให้ครบก่อนบันทึก!!");
      return;
    }
    let body = {
      sub_name: insert.sub_name,
      sylla_id: syllaId,
    };
    dispatch(insertsubject(body))
      .then((result) => {
        setinsert({
          sub_name: "",
        });
        setShowAdd(false);
        loadSyllabus();
        loadselectsub();
        toast.success("Subject records inserted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to insert Subject records");
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
      id: datamodal.sub_id,
      body: {
        sub_name: update.sub_name === "" ? datamodal.sub_name : update.sub_name,
      },
    };

    dispatch(editsubject(body))
      .then((result) => {
        setupdate({ sub_name: "" });
        setshowEdit(false);
        loadSyllabus();
        loadselectsub();
        toast.success("Subject records have been edited successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to insert Subject records");
      });
  };

  const handleDeleteConfirmation = (sub_id) => {
    setDatamodal({ sub_id }); // Store the ID of the record to be deleted
    setShowDeleteConfirmation(true); // Show the <p>ยืนยันการลบข้อมูล</p> modal
  };

  //   Delete
  const onDelete = (id) => {
    dispatch(deletesubject(id))
      .unwrap()
      .then((result) => {
        if (result.payload && result.payload.error) {
          console.log(result.payload.error);
        } else {
          loadSyllabus();
          loadselectsub();
          setShowDeleteConfirmation(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowDeleteConfirmation(false);
        alert(err.message);
      });
  };

  useEffect(() => {
    loadSyllabus();
    loadselectsub();
  }, []);

  return (
    <>
      <div>
        <button className="btn-back" role="button">
          <Link to={"/admin/mgtSyllabus"} className="back-font">
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
      </div>
      <div>
        <Button className="button" variant="primary" onClick={AddShow}>
          ADD
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ชื่อวิชา</th>
            <th>ชื่อหลักสูตร</th>
            <th>แก้ไข</th>
          </tr>
        </thead>
        <tbody>
          {selectsub?.map((data) => {
            const { sub_id, sub_name, sylla_id } = data;
            const syllabus = showsylla.find(
              (sylla) => sylla.sylla_id === sylla_id
            );
            const sylla_name = syllabus ? syllabus.sylla_name : "";
            return (
              <tr key={sub_id}>
                <td>{sub_name}</td>
                <td>{sylla_name}</td>
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
                    onClick={() => handleDeleteConfirmation(sub_id)}
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
              <Form.Label>ชื่อวิชา</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name="sub_name"
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
              <Form.Label>ชื่อวิชา</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                placeholder={datamodal.sub_name}
                onChange={(e) => handleChange(e)}
                name={"sub_name"}
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
          <Modal.Title><p>ยืนยันการลบข้อมูล</p></Modal.Title>
        </Modal.Header>
        <Modal.Body><p>คุณต้องการลบข้อมูลนี้ใช่ไหม</p></Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            ยกเลิก
          </Button>
          <Button
            variant="btn btn-danger"
            onClick={() => onDelete(datamodal.sub_id)}
          >
            ยืนยัน
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

export default MgtSubject;
