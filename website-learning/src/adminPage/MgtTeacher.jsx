import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  showteacher,
  insertteacher,
  editteacher,
  deleteteacher,
  showteacherposi,
} from "../slice/DataSlice";

function MgtTeacher() {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [showposition, setshowposition] = useState([]);
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
    position_id: "",
  });

  const loadData = () => {
    dispatch(showteacher())
      .then((result) => {
        setshowdata(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadteacherposition = () => {
    dispatch(showteacherposi())
      .then((result) => {
        setshowposition(result.payload);
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
      !insert.prefix ||
      !insert.tch_Fname ||
      !insert.tch_Lname ||
      !insert.tch_sn ||
      !insert.tch_user ||
      !insert.tch_pass ||
      !insert.status ||
      !insert.tch_sect ||
      !insert.position_id
    ) {
      alert("กรุณาป้อนข้อมูลให้ครบก่อนบันทึก!!");
      return;
    }

    let body = {
      prefix: insert.prefix,
      tch_Fname: insert.tch_Fname,
      tch_Lname: insert.tch_Lname,
      tch_sn: insert.tch_sn,
      tch_user: insert.tch_user,
      tch_pass: insert.tch_pass,
      status: insert.status,
      tch_sect: insert.tch_sect,
      position_id: insert.position_id,
    };

    dispatch(insertteacher(body))
      .then((result) => {
        setinsert({
          prefix: "",
          tch_Fname: "",
          tch_Lname: "",
          tch_sn: "",
          tch_user: "",
          tch_pass: "",
          status: "",
          tch_sect: "",
          position_id: "",
        });
        loadData();
        setShowAdd(false);
        // show success notification
        // notify();
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
        position_id:
          update.position_id === ""
            ? datamodal.position_id
            : update.position_id,
      },
    };

    dispatch(editteacher(body))
      .then((result) => {
        setupdate({
          prefix: "",
          tch_Fname: "",
          tch_Lname: "",
          tch_pass: "",
          status: "",
          tch_sect: "",
          position_id: "",
        });
        loadData();
        setshowEdit(false);
        // notify();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   Delete
  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
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
    }
  };

  useEffect(() => {
    loadData();
    loadteacherposition();
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
              <p className="headerC">ชื่อ-นามสกุล</p>
            </TableCell>
            <TableCell>
              <p className="headerC">รหัสประจำตัว</p>
            </TableCell>
            <TableCell>
              <p className="headerC">Username</p>
            </TableCell>
            <TableCell>
              <p className="headerC">Password</p>
            </TableCell>
            <TableCell>
              <p className="headerC">สถานะ</p>
            </TableCell>
            <TableCell>
              <p className="headerC">แผนก</p>
            </TableCell>
            <TableCell>
              <p className="headerC">ตำแหน่ง</p>
            </TableCell>
            <TableCell>
              <p className="headerC">Confix</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
              position_id,
            } = data;
            const posi = showposition?.find(
              (p) => p.position_id === position_id
            );
            return (
              <TableRow key={tch_id}>
                <TableCell>
                  {prefix} {tch_Fname} {tch_Lname}
                </TableCell>
                <TableCell>{tch_sn}</TableCell>
                <TableCell>{tch_user}</TableCell>
                <TableCell>{tch_pass}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{tch_sect}</TableCell>
                <TableCell>{posi?.position}</TableCell>
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
            <Form.Group className="mb-3">
              <Form.Label>ตำแหน่ง</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                name="position_id"
                onChange={(e) => handleInsert(e)}
              >
                <option value="">เลือกตำแหน่ง</option>
                {showposition?.map((data) => {
                  const { position_id, position } = data;
                  return (
                    <option value={position_id} key={position_id}>
                      {position}
                    </option>
                  );
                })}
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
            <Form.Group className="mb-3">
              <Form.Label>ตำแหน่ง</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                placeholder={datamodal.position_id}
                onChange={(e) => handleChange(e)}
                name={"position_id"}
              >
                <option value="">เลือกตำแหน่ง</option>
                {showposition?.map((data) => {
                  const { position_id, position } = data;
                  return (
                    <option value={position_id} key={position_id}>
                      {position}
                    </option>
                  );
                })}
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

export default MgtTeacher;
