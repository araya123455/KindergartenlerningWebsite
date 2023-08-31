import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import {
  showsubject,
  insertsubject,
  editsubject,
  deletesubject,
  showsyllabus,
} from "../slice/DataSlice";

function MgtSubject() {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [showsylla, setshowsylla] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [insert, setinsert] = useState({ sub_name: "", sylla_id: "" });
  const [showEdit, setshowEdit] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [update, setupdate] = useState({ sub_name: "", sylla_id: "" });
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
      sub_name: insert.sub_name,
      sylla_id: insert.sylla_id,
    };
    dispatch(insertsubject(body))
      .then((result) => {
        setShowAdd(false);
        setShowAdd({
          sub_name: "",
          sylla_id: "",
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
    loadSyllabus();
    loadData();
  }, []);
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

  const loadData = () => {
    dispatch(showsubject())
      .then((result) => {
        setshowdata(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // reload
  useEffect(() => {
    loadSyllabus();
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
      id: datamodal.sub_id,
      body: {
        sub_name: update.sub_name === "" ? datamodal.sub_name : update.sub_name,
        sylla_id: update.sylla_id === "" ? datamodal.sylla_id : update.sylla_id,
      },
    };

    dispatch(editsubject(body))
      .then((result) => {
        setshowEdit(false);
        setupdate({ sub_name: "", sylla_id: "" });
        loadSyllabus();
        loadData();
        // notify();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   Delete
  const onDelete = (id) => {
    dispatch(deletesubject(id))
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
  useEffect(() => {
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
            <th>ชื่อวิชา</th>
            <th>ชื่อหลักสูตร</th>
            <th>confix</th>
          </tr>
        </thead>
        <tbody>
          {showdata?.map((data) => {
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
                    onClick={() => onDelete(sub_id)}
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
            <Form.Group className="mb-3">
              <Form.Label>ชื่อหลักสูตร</Form.Label>
              <Form.Control
                as="select"
                className="input-line"
                name="sylla_id"
                onChange={(e) => handleInsert(e)}
              >
                <option value="">Choose Syllabus</option> {/* Default option */}
                {showsylla.map((sylla) => (
                  <option key={sylla.sylla_id} value={sylla.sylla_id}>
                    {sylla.sylla_name}
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
              <Form.Label>ชื่อวิชา</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                placeholder={datamodal.sub_name}
                onChange={(e) => handleChange(e)}
                name={"sub_name"}
              />
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

export default MgtSubject;
