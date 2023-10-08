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

  const loadData = () => {
    dispatch(getDataAll())
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
    if (!insert.year || !insert.term) {
      alert("กรุณาป้อนข้อมูลให้ครบก่อนบันทึก!!");
      return;
    }

    let body = {
      year: insert.year,
      term: insert.term,
    };

    dispatch(insertyearterm(body))
      .then((result) => {
        setinsert({
          year: "",
          term: "",
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
    if (window.confirm("Are you sure you want to delete?")) {
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
    }
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
      <Table stickyHeader aria-label="sticky table">
        <TableHead className="TableHead">
          <TableRow>
            <TableCell>
              <p className="headerC">Year</p>
            </TableCell>
            <TableCell>
              <p className="headerC">Term</p>
            </TableCell>
            <TableCell>
              <p className="headerC">Confix</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showdata.map((data) => {
            const { yearTerm_id, year, term } = data;
            return (
              <TableRow key={yearTerm_id}>
                <TableCell>{year}</TableCell>
                <TableCell>{term}</TableCell>
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
                    onClick={() => onDelete(yearTerm_id)}
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
