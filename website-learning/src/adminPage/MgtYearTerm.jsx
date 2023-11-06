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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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
        toast.success("YearTerm records inserted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to insert YearTerm records");
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
        toast.success("YearTerm records have been edited successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to insert YearTerm records");
      });
  };

  const handleDeleteConfirmation = (yearTerm_id) => {
    setDatamodal({ yearTerm_id }); // Store the ID of the record to be deleted
    setShowDeleteConfirmation(true); // Show the <p>ยืนยันการลบข้อมูล</p> modal
  };

  //   Delete
  const onDelete = (id) => {
    dispatch(deleteyeraterm(id))
      .unwrap()
      .then((result) => {
        // Check if the response contains an error message
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
              <p className="headerC">แก้ไข</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showdata.map((data) => {
            const { yearTerm_id, year, term } = data;
            return (
              <TableRow key={yearTerm_id}>
                <TableCell>
                  <p>{year}</p>
                </TableCell>
                <TableCell>
                  <p>{term}</p>
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
                    onClick={() => handleDeleteConfirmation(yearTerm_id)}
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
      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title><p>ยืนยันการลบข้อมูล</p></Modal.Title>
        </Modal.Header>
        <Modal.Body><p>คุณต้องการลบข้อมูลนีใช่ไหม</p></Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            ยกเลิก
          </Button>
          <Button
            variant="btn btn-danger"
            onClick={() => onDelete(datamodal.yearTerm_id)}
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

export default MgtYearTerm;
