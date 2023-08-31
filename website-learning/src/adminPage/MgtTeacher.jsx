import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import {
  showteacher,
  insertteacher,
  editteacher,
  deleteteacher,
} from "../slice/DataSlice";

function MgtTeacher() {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [insert, setinsert] = useState({
    prefix: "",
    tch_Fname: "",
    tch_Lname: "",
    tch_sn: "",
    tch_user: "",
    tch_pass: "",
    status: "",
    tch_sect: "",
  });
  const [showEdit, setshowEdit] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [update, setupdate] = useState({
    prefix: "",
    tch_Fname: "",
    tch_Lname: "",
    tch_pass: "",
    status: "",
    tch_sect: "",
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
      prefix: insert.prefix,
      tch_Fname: insert.tch_Fname,
      tch_Lname: insert.tch_Lname,
      tch_sn: insert.tch_sn,
      tch_user: insert.tch_user,
      tch_pass: insert.tch_pass,
      status: insert.status,
      tch_sect: insert.tch_sect,
    };

    dispatch(insertteacher(body))
      .then((result) => {
        setShow(false);
        setShowAdd({
          prefix: "",
          tch_Fname: "",
          tch_Lname: "",
          tch_sn: "",
          tch_user: "",
          tch_pass: "",
          status: "",
          tch_sect: "",
        });
        loadData();
        AddClose();
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
    dispatch(showteacher())
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
      id: datamodal.tch_id,
      body: {
        prefix: update.prefix === "" ? datamodal.prefix : update.prefix,
        tch_Fname:
          update.tch_Fname === "" ? datamodal.tch_Fname : update.tch_Fname,
        tch_Lname:
          update.tch_Lname === "" ? datamodal.tch_Lname : update.tch_Lname,
        tch_pass: update.tch_pass === "" ? datamodal.tch_pass : update.tch_pass,
        status: update.status === "" ? datamodal.status : update.status,
        tch_sect: update.tch_sect === "" ? datamodal.tch_sect : update.tch_sect,
      },
    };

    dispatch(editteacher(body))
      .then((result) => {
        setshowEdit(false);
        setupdate({
          prefix: "",
          tch_Fname: "",
          tch_Lname: "",
          tch_pass: "",
          status: "",
          tch_sect: "",
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
    dispatch(deleteteacher(id))
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
      <Button className="button" variant="primary" onClick={AddShow}>
        ADD
      </Button>
      <table>
        <thead>
          <tr>
            <th>คำนำหน้า</th>
            <th>ชื่อ</th>
            <th>นามสกุล</th>
            <th>เลขประจำตัว</th>
            <th>username</th>
            <th>password</th>
            <th>สถานะ</th>
            <th>แผนก</th>
            <th>confix</th>
          </tr>
        </thead>
        <tbody>
          {showdata.map((data) => {
            const {
              tch_id,
              prefix,
              tch_Fname,
              tch_Lname,
              tch_sn,
              tch_user,
              tch_pass,
              status,
              tch_sect,
            } = data;
            return (
              <tr key={tch_id}>
                <td>{prefix}</td>
                <td>{tch_Fname}</td>
                <td>{tch_Lname}</td>
                <td>{tch_sn}</td>
                <td>{tch_user}</td>
                <td>{tch_pass}</td>
                <td>{status}</td>
                <td>{tch_sect}</td>
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
                    onClick={() => onDelete(tch_id)}
                  >
                    DELETE
                  </Button>
                  {/* <Button
                    className="buttonD"
                    variant="btn btn-light"
                    onClick={() => onDelete(tch_id)}
                  >
                    SHOW
                  </Button> */}
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
                name="tch_Fname"
                onChange={(e) => handleInsert(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>นามสกุล</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name="tch_Lname"
                onChange={(e) => handleInsert(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>เลขประจำตัว</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name="tch_sn"
                onChange={(e) => handleInsert(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>username</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name="tch_user"
                onChange={(e) => handleInsert(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>password</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name="tch_pass"
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
            <Form.Group className="mb-3">
              <Form.Label>แผนก</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name="tch_sect"
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
                placeholder={datamodal.tch_Fname}
                onChange={(e) => handleChange(e)}
                name={"tch_Fname"}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>นามสกุล</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                placeholder={datamodal.tch_Lname}
                onChange={(e) => handleChange(e)}
                name={"tch_Lname"}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>password</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                placeholder={datamodal.tch_pass}
                onChange={(e) => handleChange(e)}
                name={"tch_pass"}
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
            <Form.Group className="mb-3">
              <Form.Label>แผนก</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                placeholder={datamodal.tch_sect}
                onChange={(e) => handleChange(e)}
                name={"tch_sect"}
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

export default MgtTeacher;
