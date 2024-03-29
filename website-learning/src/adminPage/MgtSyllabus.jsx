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
import Subject from "./MgtSubject";
import "react-toastify/dist/ReactToastify.css";
import {
  showsyllabus,
  insertsyllabus,
  editsyllabus,
  deletesyllabus,
} from "../slice/DataSlice";
import { Link } from "react-router-dom";
import { saveToLocalStorage } from "../LocalStorage/localstorage";

function MgtSyllabus() {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [insert, setinsert] = useState({ sylla_name: "" });
  const [showEdit, setshowEdit] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [update, setupdate] = useState({ sylla_name: "" });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const loadData = () => {
    dispatch(showsyllabus())
      .then((result) => {
        setshowdata(result.payload);
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
    if (!insert.sylla_name) {
      alert("กรุณาป้อนข้อมูลให้ครบก่อนบันทึก!!");
      return;
    }
    let body = {
      sylla_name: insert.sylla_name,
    };

    dispatch(insertsyllabus(body))
      .then((result) => {
        AddClose();
        setinsert({
          sylla_name: "",
        });
        loadData();
        setShowAdd(false);
        // show success notification
        // notify();
        toast.success("Syllabus records inserted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to insert Syllabus records");
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
      id: datamodal.sylla_id,
      body: {
        sylla_name:
          update.sylla_name === "" ? datamodal.sylla_name : update.sylla_name,
      },
    };

    dispatch(editsyllabus(body))
      .then((result) => {
        setshowEdit(false);
        setupdate({ sylla_name: "" });
        loadData();
        // notify();
        toast.success("Syllabus records have been edited successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to insert Syllabus records");
      });
  };

  const handleDeleteConfirmation = (sylla_id) => {
    setDatamodal({ sylla_id }); // Store the ID of the record to be deleted
    setShowDeleteConfirmation(true); // Show the <p>ยืนยันการลบข้อมูล</p> modal
  };

  //   Delete
  const onDelete = (id) => {
    dispatch(deletesyllabus(id))
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
    loadData();
  }, []);

  saveToLocalStorage("syllaId", null);
  const onClick = (id) => {
    // console.log(id);
    saveToLocalStorage("syllaId", id);
  };

  return (
    <>
      <Button className="button" variant="primary" onClick={AddShow}>
        ADD
      </Button>
      <Table stickyHeader aria-label="sticky table">
        <TableHead className="TableHead">
          <TableRow>
            <TableCell>
              <p className="headerC">ชื่อหลักสูตร</p>
            </TableCell>
            <TableCell>
              <p className="headerC">จัดการวิชา</p>
            </TableCell>
            <TableCell>
              <p className="headerC">แก้ไข</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showdata.map((data) => {
            const { sylla_id, sylla_name } = data;
            return (
              <TableRow key={sylla_id}>
                <TableCell>
                  <p>{sylla_name}</p>
                </TableCell>
                <TableCell>
                  <Link
                    className="linkshow"
                    to={"/admin/mgtSubject"}
                    onClick={() => onClick(sylla_id)}
                  >
                    เพิ่มวิชา
                  </Link>
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
                    onClick={() => handleDeleteConfirmation(sylla_id)}
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
              <Form.Label>ชื่อหลักสูตร</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name="sylla_name"
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
              <Form.Label>ชื่อหลักสูตร</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                placeholder={datamodal.sylla_name}
                onChange={(e) => handleChange(e)}
                name={"sylla_name"}
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
            onClick={() => onDelete(datamodal.sylla_id)}
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

export default MgtSyllabus;
