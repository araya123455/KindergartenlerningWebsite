import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import {
  showkinroom,
  insertkinroom,
  editkinroom,
  deletekinroom,
} from "../slice/DataSlice";

function MgtKindergartenroomlevel() {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [insert, setinsert] = useState({ kinde_level: "", Kinder_room: "" });
  const [showEdit, setshowEdit] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [update, setupdate] = useState({ kinde_level: "", Kinder_room: "" });
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
      kinde_level: insert.kinde_level,
      Kinder_room: insert.Kinder_room,
    };

    dispatch(insertkinroom(body))
      .then((result) => {
        setShow(false);
        setShowAdd({
          kinde_level: "",
          Kinder_room: "",
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
    dispatch(showkinroom())
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
      id: datamodal.kinder_id,
      body: {
        kinde_level:
          update.kinde_level === ""
            ? datamodal.kinde_level
            : update.kinde_level,
        Kinder_room:
          update.Kinder_room === ""
            ? datamodal.Kinder_room
            : update.Kinder_room,
      },
    };

    dispatch(editkinroom(body))
      .then((result) => {
        setshowEdit(false);
        setupdate({ kinde_level: "", Kinder_room: "" });
        loadData();
        // notify();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   Delete
  const onDelete = (id) => {
    dispatch(deletekinroom(id))
      .then((result) => {
        if (result.payload && result.payload.error) {
          console.log(result.payload.error); // You can log the error or show it to the user
        } else {
          // Deletion successful, reload the data
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
            <th>Level</th>
            <th>Room</th>
            <th>Confix</th>
          </tr>
        </thead>
        <tbody>
          {showdata.map((data) => {
            const { kinder_id, kinde_level, Kinder_room } = data;
            return (
              <tr key={kinder_id}>
                <td>{kinde_level}</td>
                <td>{Kinder_room}</td>
                <td>
                  <Button
                    variant="btn btn-secondary"
                    onClick={() => EditShow(data)}
                  >
                    EDIT
                  </Button>
                  <Button
                    className="buttonD"
                    variant="btn btn-danger"
                    onClick={() => onDelete(kinder_id)}
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
              <Form.Label>Level</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name="kinde_level"
                onChange={(e) => handleInsert(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Room</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name="Kinder_room"
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
              <Form.Label>Level</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                placeholder={datamodal.kinde_level}
                onChange={(e) => handleChange(e)}
                name={"kinde_level"}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Room</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                placeholder={datamodal.Kinder_room}
                onChange={(e) => handleChange(e)}
                name={"Kinder_room"}
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

export default MgtKindergartenroomlevel;
