import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import {
  getDataAll,
  insertyearterm,
  edityearterm,
  deleteyeraterm,
} from "../slice/DataSlice";

function MgtYearTerm() {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [insert, setinsert] = useState({ year: "", term: "" });
  const [showEdit, setshowEdit] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [update, setupdate] = useState({ year: "", term: "" });
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
      year: insert.year,
      term: insert.term,
    };

    dispatch(insertyearterm(body))
      .then((result) => {
        setShow(false);
        setShowAdd({
          year: "",
          term: "",
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
    dispatch(getDataAll())
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
      id: datamodal.yearTerm_id,
      body: {
        year: update.year === "" ? datamodal.year : update.year,
        term: update.term === "" ? datamodal.term : update.term,
      },
    };

    dispatch(edityearterm(body))
      .then((result) => {
        setshowEdit(false);
        setupdate({ year: "", term: "" });
        loadData();
        // notify();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   Delete
  const onDelete = (id) => {
    dispatch(deleteyeraterm(id))
      .then((result) => {
        // Check if the response contains an error message
        if (result.payload && result.payload.error) {
          console.log(result.payload.error); // You can log the error or show it to the user
        } else {
          // Deletion successful, reload the data
          loadData();
        }
      })
      .catch((err) => {
        console.log(err); // Handle unexpected errors
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
            <th>Year</th>
            <th>Term</th>
            <th>Confix</th>
          </tr>
        </thead>
        <tbody>
          {showdata.map((data) => {
            const { yearTerm_id, year, term } = data;
            return (
              <tr key={yearTerm_id}>
                <td>{year}</td>
                <td>{term}</td>
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
                    onClick={() => onDelete(yearTerm_id)}
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
              <Form.Label>Year</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name="year"
                onChange={(e) => handleInsert(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Term</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                name="term"
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
              <Form.Label>Year</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                placeholder={datamodal.year}
                onChange={(e) => handleChange(e)}
                name={"year"}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Term</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                placeholder={datamodal.term}
                onChange={(e) => handleChange(e)}
                name={"term"}
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

export default MgtYearTerm;
