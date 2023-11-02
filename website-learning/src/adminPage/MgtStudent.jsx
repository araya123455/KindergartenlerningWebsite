import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { RemindFill } from "@rsuite/icons";
import "../assets/css/tableinsert.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { insertstudent, editstudent, deletestudent } from "../slice/DataSlice";
import { searcstudent } from "../slice/SearchDataSlice";
import { fetchStudentData } from "../slice/FetchDataSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MgtStudent() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [studentResults, setStudentResults] = useState([]);
  const studentData = useSelector((state) => state.data.studentData);
  const [showstr, setShowstr] = useState(""); // Use state for showstr
  let stuid;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Set your desired initial rows per page
  const [searchstu, setsearchstu] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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
    stu_sn: "",
    stu_user: "",
    stu_pass: "",
    status: "",
  });

  const loadStudent = () => {
    dispatch(searcstudent({ stuid }))
      .then((result) => {
        setsearchstu(result.payload.data);
        // console.log(result);
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
    // Validate input fields
    if (
      !insert.prefix ||
      !insert.stu_Fname ||
      !insert.stu_Lname ||
      !insert.stu_sn ||
      !insert.stu_user ||
      !insert.stu_pass ||
      !insert.status
    ) {
      alert("กรุณาป้อนข้อมูลให้ครบก่อนบันทึก!!");
      return;
    }

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
        toast.success("Student records inserted successfully");
        setShowAdd(false);
        setinsert({
          prefix: "",
          stu_Fname: "",
          stu_Lname: "",
          stu_sn: "",
          stu_user: "",
          stu_pass: "",
          status: "",
        });
        loadStudent();
      })
      .catch((err) => {
        toast.error("Failed to insert Student records");
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

  const onSave = () => {
    let body = {
      id: datamodal.stu_id,
      body: {
        prefix: update.prefix === "" ? datamodal.prefix : update.prefix,
        stu_Fname:
          update.stu_Fname === "" ? datamodal.stu_Fname : update.stu_Fname,
        stu_Lname:
          update.stu_Lname === "" ? datamodal.stu_Lname : update.stu_Lname,
        stu_sn: update.stu_sn === "" ? datamodal.stu_sn : update.stu_sn,
        stu_user: update.stu_user === "" ? datamodal.stu_user : update.stu_user,
        stu_pass: update.stu_pass === "" ? datamodal.stu_pass : update.stu_pass,
        status: update.status === "" ? datamodal.status : update.status,
      },
    };

    dispatch(editstudent(body))
      .then((result) => {
        toast.success("Student records have been edited successfully");
        setshowEdit(false);
        setupdate({
          prefix: "",
          stu_Fname: "",
          stu_Lname: "",
          stu_sn: "",
          stu_user: "",
          stu_pass: "",
          status: "",
        });
        loadStudent();
      })
      .catch((err) => {
        toast.error("Failed to insert Student records");
        console.log(err);
      });
  };

  const handleDeleteConfirmation = (stu_id) => {
    setDatamodal({ stu_id }); // Store the ID of the record to be deleted
    setShowDeleteConfirmation(true); // Show the delete confirmation modal
  };

  //   Delete
  const onDelete = (id) => {
    dispatch(deletestudent(id))
      .unwrap()
      .then((result) => {
        if (result.payload && result.payload.error) {
          console.log(result.payload.error);
        } else {
          loadStudent();
          setShowDeleteConfirmation(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowDeleteConfirmation(false);
        alert(err.message);
      });
  };

  const handleSearch = () => {
    if (!searchQuery) {
      alert("กรุณาป้อนรหัสประจำตัวนักเรียนก่อนค้นหา!!"); // Display an alert message
      setStudentResults([]);
      setShowstr(""); // Set showstr to "not found"
      return;
    }
    filterData();
  };

  const handleReset = () => {
    setSearchQuery("");
    setShowstr("");
    loadStudent();
  };

  useEffect(() => {
    dispatch(fetchStudentData());
  }, [dispatch]);

  const filterData = () => {
    // Filter student results
    const filteredStudents = studentData?.filter(
      (student) => student.stu_sn.toLowerCase() === searchQuery.toLowerCase()
    );
    setStudentResults(filteredStudents);
    stuid = filteredStudents[0]?.stu_id;
    // Set showstr based on the results
    if (filteredStudents.length === 0) {
      setShowstr("not found");
    } else {
      setShowstr(""); // Reset showstr if results are found
    }
    loadStudent();
  };

  useEffect(() => {
    loadStudent();
  }, []);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset the page when rows per page changes
  };

  // Calculate the start and end index for the displayed rows
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <>
      <div>
        <h5>วิธีการ: ใช้รหัสประจำตัวเพื่อค้นหาเท่านั้น!</h5>
        <input
          type="text"
          placeholder="Search for teachers and students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="buttonN buttnN" onClick={handleSearch}>
          Search
        </button>
        <button className="buttonR buttnR buttonD" onClick={handleReset}>
          Reset
        </button>
        {/* Display "not found" message */}
        {showstr === "not found" && <p>No results found</p>}
      </div>
      <br />
      <Button className="button" variant="primary" onClick={AddShow}>
        ADD
      </Button>
      <TableContainer component={Paper}>
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
                <p className="headerC">แก้ไข</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchstu?.slice(startIndex, endIndex)?.map((data) => {
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
                <TableRow key={stu_id}>
                  <TableCell>
                    <p>
                      {prefix} {stu_Fname} {stu_Lname}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p>{stu_sn}</p>
                  </TableCell>
                  <TableCell>
                    <p>{stu_user}</p>
                  </TableCell>
                  <TableCell>
                    <p>{stu_pass}</p>
                  </TableCell>
                  <TableCell>
                    <p>{status}</p>
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
                      onClick={() => handleDeleteConfirmation(stu_id)}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]} // Define the rows per page options
          component="div"
          count={searchstu?.length || 1} // Total number of rows
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      {/* Insert Data */}
      <Modal show={showAdd} onHide={AddClose}>
        <Modal.Header closeButton>
          <Modal.Title>INSERT DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>คำนำหน้า</Form.Label>
              <Form.Select
                className="input-line"
                type="text"
                name="prefix"
                onChange={(e) => handleInsert(e)}
              >
                <option>กรุณาเลือกคำนำหน้า</option>
                <option value="เด็กหญิง">เด็กหญิง</option>
                <option value="เด็กชาย">เด็กชาย</option>
              </Form.Select>
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
              <Form.Select
                className="input-line"
                name="status"
                onChange={(e) => handleInsert(e)}
                // value={insert.status}
              >
                <option>กรุณาเลือกสถานะ</option>
                <option value="กำลังศึกษา">กำลังศึกษา</option>
                <option value="ลาออก">ลาออก</option>
              </Form.Select>
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
              <Form.Select
                className="input-line"
                type="text"
                placeholder={datamodal.prefix}
                onChange={(e) => handleChange(e)}
                name={"prefix"}
              >
                <option>กรุณาเลือกคำนำหน้า</option>
                <option value="เด็กหญิง">เด็กหญิง</option>
                <option value="เด็กชาย">เด็กชาย</option>
              </Form.Select>
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
              <Form.Label>รหัสประจำตัว</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                placeholder={datamodal.stu_sn}
                onChange={(e) => handleChange(e)}
                name={"stu_sn"}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>username</Form.Label>
              <Form.Control
                className="input-line"
                type="text"
                placeholder={datamodal.stu_user}
                onChange={(e) => handleChange(e)}
                name={"stu_user"}
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
              <Form.Select
                className="input-line"
                type="text"
                placeholder={datamodal.status}
                onChange={(e) => handleChange(e)}
                name={"status"}
              >
                <option>กรุณาเลือกสถานะ</option>
                <option value="กำลังศึกษา">กำลังศึกษา</option>
                <option value="ลาออก">ลาออก</option>
              </Form.Select>
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
            onClick={() => onDelete(datamodal.stu_id)}
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

export default MgtStudent;
