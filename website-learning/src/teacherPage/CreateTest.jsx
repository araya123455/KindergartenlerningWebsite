import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { saveToLocalStorage } from "../LocalStorage/localstorage";
import "../assets/css/attendance.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  showtest,
  edittest,
  deletetest,
  inserttest,
} from "../slice/TeacherSlice";

function CreateTest() {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [insert, setinsert] = useState({
    test_detail: "",
  });
  const [showEdit, setshowEdit] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [update, setupdate] = useState({
    test_detail: "",
  });
  const AddClose = () => {
    setShowAdd(false);
  };
  const AddShow = () => {
    setShowAdd(true);
  };
  const loadData = () => {
    dispatch(showtest())
      .then((result) => {
        setshowdata(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      test_detail: insert.test_detail,
    };

    dispatch(inserttest(body))
      .then((result) => {
        setShowAdd(false);
        setShowAdd({
          test_detail: "",
        });
        loadData();
        AddClose();
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
      id: datamodal.test_id,
      body: {
        test_detail:
          update.test_detail === ""
            ? datamodal.test_detail
            : update.test_detail,
      },
    };

    dispatch(edittest(body))
      .then((result) => {
        setshowEdit(false);
        setupdate({
          test_detail: "",
        });
        loadData();
        AddClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDelete = (id) => {
    dispatch(deletetest(id))
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
  // set null
  saveToLocalStorage("teaTest_id", null);
  const onClickId = (id) => {
    saveToLocalStorage("teaTest_id", id);
  };
  // reload
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Button className="button" variant="primary" onClick={AddShow}>
        ADD
      </Button>
      <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead className="TableHead">
          <TableRow>
            <TableCell><p className="headerC">ชื่อแบบทดสอบ</p></TableCell>
            <TableCell><p className="headerC">เพิ่มห้องเรียน</p></TableCell>
            <TableCell><p className="headerC">Details</p></TableCell>
            <TableCell><p className="headerC">Confix</p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showdata?.map((data) => {
            const { test_id, test_detail } = data;
            return (
              <TableRow key={test_id}>
                <TableCell><p>{test_detail}</p></TableCell>
                <TableCell>
                  <Link
                    className="linkadd"
                    to="/test/addClassTest"
                    onClick={() => onClickId(test_id)}
                  >
                    Add class
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    className="linkcreate"
                    to="/test/createChoice"
                    onClick={() => onClickId(test_id)}
                  >
                    Test detail
                  </Link>
                </TableCell>
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
                    onClick={() => onDelete(test_id)}
                  >
                    DELETE
                  </Button>
                </td>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      </TableContainer>
      <Modal show={showAdd} onHide={AddClose}>
        <Modal.Header closeButton>
          <Modal.Title>INSERT DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ชื่อแบบทดสอบ</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name="test_detail"
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
              <Form.Label>ชื่อแบบทดสอบ</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                placeholder={datamodal.test_detail}
                onChange={(e) => handleChange(e)}
                name={"test_detail"}
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
    </>
  );
}

export default CreateTest;
