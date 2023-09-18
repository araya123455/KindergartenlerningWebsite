import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { RemindFill } from "@rsuite/icons";
import "../assets/css/tableinsert.css";
import {
  showstudent,
  insertstudent,
  editstudent,
  deletestudent,
} from "../slice/DataSlice";

function ReportLearning() {
    const dispatch = useDispatch();
    const [showdata, setshowdata] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [insert, setinsert] = useState({
      prefix: "",
      stu_Fname: "",
      stu_Lname: "",
      stu_sn: "",
      stu_user: "",
      stu_pass: "",
      status: "",
    });
    const [showEdit, setshowEdit] = useState(false);
    const [datamodal, setDatamodal] = useState([]);
    const [update, setupdate] = useState({
      prefix: "",
      stu_Fname: "",
      stu_Lname: "",
      stu_pass: "",
      status: "",
    });
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
      let body = {
        prefix: insert.prefix,
        stu_Fname: insert.stu_Fname,
        stu_Lname: insert.stu_Lname,
        stu_sn: insert.stu_sn,
        stu_user: insert.stu_user,
        stu_pass: insert.stu_pass,
        status: insert.status,
      };
  
      dispatch(insertstudent(body))
        .then((result) => {
          setShow(false);
          setShowAdd({
            prefix: "",
            stu_Fname: "",
            stu_Lname: "",
            stu_sn: "",
            stu_user: "",
            stu_pass: "",
            status: "",
          });
          loadData();
          // show success notification
          // notify();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    useEffect(() => {
      loadData();
    }, []);
    const loadData = () => {
      dispatch(showstudent())
        .then((result) => {
          setshowdata(result.payload);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // reload
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
    //   on click save value edit
    const onSave = () => {
      let body = {
        id: datamodal.stu_id,
        body: {
          prefix: update.prefix === "" ? datamodal.prefix : update.prefix,
          stu_Fname:
            update.stu_Fname === "" ? datamodal.stu_Fname : update.stu_Fname,
          stu_Lname:
            update.stu_Lname === "" ? datamodal.stu_Lname : update.stu_Lname,
          stu_pass: update.stu_pass === "" ? datamodal.stu_pass : update.stu_pass,
          status: update.status === "" ? datamodal.status : update.status,
        },
      };
  
      dispatch(editstudent(body))
        .then((result) => {
          setshowEdit(false);
          setupdate({
            prefix: "",
            stu_Fname: "",
            stu_Lname: "",
            stu_pass: "",
            status: "",
          });
          loadData();
          // notify();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    //   Delete
    const onDelete = (id) => {
      dispatch(deletestudent(id))
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
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>คำนำหน้า</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>รหัสประจำตัว</th>
              <th>Username</th>
              <th>Password</th>
              <th>สถานะ</th>
              <th>Confix</th>
            </tr>
          </thead>
          <tbody>
            {showdata?.map((data) => {
              const {
                stu_id,
                prefix,
                stu_Fname,
                stu_Lname,
                stu_sn,
                stu_user,
                stu_pass,
                status,
              } = data;
              return (
                <tr key={stu_id}>
                  <td>{prefix}</td>
                  <td>{stu_Fname}</td>
                  <td>{stu_Lname}</td>
                  <td>{stu_sn}</td>
                  <td>{stu_user}</td>
                  <td>{stu_pass}</td>
                  <td>{status}</td>
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
                      onClick={() => onDelete(stu_id)}
                    >
                      DELETE
                    </Button>
                    <Button
                      className="buttonD"
                      variant="btn btn-success"
                      onClick={() => onDelete(stu_id)}
                    >
                      REPORT
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
                <Form.Label>คำนำหน้า</Form.Label>
                <Form.Control
                  className="input-line"
                  type="text"
                  name="prefix"
                  onChange={(e) => handleInsert(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ชื่อ</Form.Label>
                <Form.Control
                  className="input-line"
                  type="text"
                  name="stu_Fname"
                  onChange={(e) => handleInsert(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>นามสกุล</Form.Label>
                <Form.Control
                  className="input-line"
                  type="text"
                  name="stu_Lname"
                  onChange={(e) => handleInsert(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>รหัสประจำตัว</Form.Label>
                <Form.Control
                  className="input-line"
                  type="text"
                  name="stu_sn"
                  onChange={(e) => handleInsert(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>username</Form.Label>
                <Form.Control
                  className="input-line"
                  type="text"
                  name="stu_user"
                  onChange={(e) => handleInsert(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>password</Form.Label>
                <Form.Control
                  className="input-line"
                  type="text"
                  name="stu_pass"
                  onChange={(e) => handleInsert(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>สถานะ</Form.Label>
                <Form.Control
                  className="input-line"
                  type="text"
                  name="status"
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
                <Form.Label>คำนำหน้า</Form.Label>
                <Form.Control
                  className="input-line"
                  type="text"
                  placeholder={datamodal.prefix}
                  onChange={(e) => handleChange(e)}
                  name={"prefix"}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ชื่อ</Form.Label>
                <Form.Control
                  className="input-line"
                  type="text"
                  placeholder={datamodal.stu_Fname}
                  onChange={(e) => handleChange(e)}
                  name={"stu_Fname"}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>นามสกุล</Form.Label>
                <Form.Control
                  className="input-line"
                  type="text"
                  placeholder={datamodal.stu_Lname}
                  onChange={(e) => handleChange(e)}
                  name={"stu_Lname"}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>password</Form.Label>
                <Form.Control
                  className="input-line"
                  type="text"
                  placeholder={datamodal.stu_pass}
                  onChange={(e) => handleChange(e)}
                  name={"stu_pass"}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>สถานะ</Form.Label>
                <Form.Control
                  className="input-line"
                  type="text"
                  placeholder={datamodal.status}
                  onChange={(e) => handleChange(e)}
                  name={"status"}
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
      </>
    );
}

export default ReportLearning