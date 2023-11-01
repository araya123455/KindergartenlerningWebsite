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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const loadData = () => {
    dispatch(showkinroom())
      .then((result) => {
        setshowdata(result.payload);
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
    if (!insert.kinde_level || !insert.Kinder_room) {
      alert("กรุณาป้อนข้อมูลให้ครบก่อนบันทึก!!");
      return;
    }
    let body = {
      kinde_level: insert.kinde_level,
      Kinder_room: insert.Kinder_room,
    };

    dispatch(insertkinroom(body))
      .then((result) => {
        setinsert({
          kinde_level: "",
          Kinder_room: "",
        });
        loadData();
        setShowAdd(false);
        toast.success("Kindergartenroomlevel records inserted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to insert Kindergartenroomlevel records");
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
        toast.success(
          "Kindergartenroomlevel records have been edited successfully"
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to insert Kindergartenroomlevel records");
      });
  };

  const handleDeleteConfirmation = (kinder_id) => {
    setDatamodal({ kinder_id }); // Store the ID of the record to be deleted
    setShowDeleteConfirmation(true); // Show the delete confirmation modal
  };

  //   Delete
  const onDelete = (id) => {
    dispatch(deletekinroom(id))
      .unwrap()
      .then((result) => {
        if (result.payload && result.payload.error) {
          console.log(result.payload.error); // You can log the error or show it to the user
        } else {
          // Deletion successful, reload the data
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

  useEffect(() => {
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
              <p className="headerC">Level</p>
            </TableCell>
            <TableCell>
              <p className="headerC">Room</p>
            </TableCell>
            <TableCell>
              <p className="headerC">แก้ไข</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showdata.map((data) => {
            const { kinder_id, kinde_level, Kinder_room } = data;
            return (
              <TableRow key={kinder_id}>
                <TableCell>
                  <p>{kinde_level}</p>
                </TableCell>
                <TableCell>
                  <p>{Kinder_room}</p>
                </TableCell>
                <TableCell>
                  <Button
                    variant="btn btn-secondary"
                    onClick={() => EditShow(data)}
                  >
                    EDIT
                  </Button>
                  <Button
                    className="buttonD"
                    variant="btn btn-danger"
                    onClick={() => handleDeleteConfirmation(kinder_id)}
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
            onClick={() => onDelete(datamodal.kinder_id)}
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

export default MgtKindergartenroomlevel;
