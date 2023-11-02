import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "../assets/css/attendance.css";
import { showkinroom, getDataAll, searchclasstime } from "../slice/DataSlice";
import {
  attendance,
  attendancedetailupdate,
  attendancedelete,
} from "../slice/TeacherSlice";
import { fetchStudentData } from "../slice/AdminSearchSlice";
import { studentattendance, searceattendance } from "../slice/SearchDataSlice";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function StuAttendanceUpdate() {
  const dispatch = useDispatch();
  const crtId = getFromLocalStorage("crtId");
  const [showstu, setshowstu] = useState([]);
  const [showatten, setshowatten] = useState([]);
  const [showattende, setshowattende] = useState([]);
  const [showkinder, setShowKinder] = useState([]);
  const [showyear, setShowYear] = useState([]);
  const [showSearch, setshowsearch] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [studentResults, setStudentResults] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [datamodal, setdatamodal] = useState([]);
  const [showEdit, setshowEdit] = useState(false);
  const [updatedata, setupdatedata] = useState({
    attd_id: "",
  });
  let stuid;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Set your desired initial rows per page
  // Use useSelector to access studentData from Redux store
  const studentData = useSelector((state) => state.data.studentData);

  const loadstudent = () => {
    dispatch(studentattendance({ crtId }))
      .then((result) => {
        setshowstu(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadattendance = () => {
    dispatch(attendance())
      .then((result) => {
        setshowatten(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadattendancede = () => {
    dispatch(searceattendance({ crtId, stuid, selectedDate }))
      .then((result) => {
        setshowattende(result.payload.data);
        // console.log(result.payload.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadKinder = () => {
    dispatch(showkinroom())
      .then((result) => {
        setShowKinder(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadYearTerm = () => {
    dispatch(getDataAll())
      .then((result) => {
        setShowYear(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadSearch = () => {
    dispatch(searchclasstime())
      .then((result) => {
        setshowsearch(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const crt_Id = showSearch.find((data) => data.crt_id === crtId);
  const yearTerm_id = crt_Id ? crt_Id.yearterm_id : "";
  const yearTerm = showyear.find((data) => data.yearTerm_id === yearTerm_id);
  const getyear = yearTerm ? yearTerm.year : "";
  const getterm = yearTerm ? yearTerm.term : "";
  const kinroom_id = crt_Id ? crt_Id.kinder_id : "";
  const kinroom = showkinder.find((data) => data.kinder_id === kinroom_id);
  const getkin = kinroom ? kinroom.kinde_level : "";
  const getroom = kinroom ? kinroom.Kinder_room : "";

  const handleSearch = () => {
    if (!searchQuery) {
      // alert("Please input data first");
      setStudentResults("");
      // console.log(selectedDate);
      loadattendancede();
      return;
    }
    filterData();
  };

  useEffect(() => {
    dispatch(fetchStudentData());
  }, [dispatch]);

  const filterData = () => {
    // Filter student results with an exact match on stu_sn
    const filteredStudents = studentData?.filter(
      (student) => student.stu_sn.toLowerCase() === searchQuery.toLowerCase()
    );
    stuid = filteredStudents[0].stu_id;
    setStudentResults(filteredStudents[0].stu_id);
    loadattendancede();
    // console.log(filteredStudents[0].stu_id);
  };

  const EditClose = () => {
    setshowEdit(false);
  };
  const EditShow = (data) => {
    setdatamodal(data);
    // console.log(data);
    setshowEdit(true);
  };

  const handleUpdate = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setupdatedata({
      ...updatedata,
      [name]: value,
    });
  };

  const onUpdate = () => {
    let body = {
      id: datamodal.attdDt_id,
      body: {
        attd_id:
          updatedata.attd_id === "" ? datamodal.attd_id : updatedata.attd_id,
      },
    };
    // Dispatch an action to update the attendance status
    // console.log(body);
    dispatch(attendancedetailupdate(body))
      .then((result) => {
        // console.log(result);
        setshowEdit(false);
        setupdatedata({ attd_id: "" });
        toast.success("Attendance record updated successfully");
        // ... (other logic for updating the UI if needed)
        loadattendancede();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update attendance record");
      });
  };

  const handleDeleteConfirmation = (attdt_id) => {
    setdatamodal({ attdt_id }); // Store the ID of the record to be deleted
    setShowDeleteConfirmation(true); // Show the delete confirmation modal
  };

  const onDelete = (id) => {
    // console.log(id);
    dispatch(attendancedelete(id))
      .then((result) => {
        if (result.payload && result.payload.error) {
          console.log(result.payload.error);
        } else {
          loadattendancede();
          // Hide the delete confirmation modal
          setShowDeleteConfirmation(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadstudent();
    loadattendance();
    loadattendancede();
    loadSearch();
    loadKinder();
    loadYearTerm();
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
    <div>
      <div id="clouds">
        <div className="cloud x1"></div>
        <div className="cloud x2"></div>
        <div className="cloud x3"></div>
        <div className="cloud x4"></div>
        <div className="cloud x5"></div>
        <div className="cloud x6"></div>
        <div className="cloud x7"></div>
      </div>
      <button className="btn-back" role="button">
        <Link to={"/teacher/attendance"} className="back-font">
          <svg
            viewBox="0 0 96 96"
            height="24px"
            id="Layer_1"
            version="1.2"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z"
              fill="#ffffff"
            />
          </svg>
          ย้อนกลับ
        </Link>
      </button>
      <br />
      <div>
        <h1 className="m-bottom">
          การเช็คชื่อเข้าห้องเรียนห้องอนุบาล {getkin}/{getroom} ปีการศึกษา{" "}
          {getyear} เทอม {getterm}
        </h1>
      </div>
      <div className="m-bottom">
        <h5>เลือกวันที่:</h5>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <h5>วิธีการ: ใช้รหัสประจำตัวนักเรียนเพื่อค้นหาเท่านั้น!</h5>
      <div>
        <input
          type="text"
          placeholder="Search for students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <button className="buttnN buttonN" onClick={handleSearch}>
        Search
      </button>
      <br />
      <br />
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
                <p className="headerC">เดือน-วัน-ปี</p>
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
            {Array.isArray(showattende) &&
              showattende?.slice(startIndex, endIndex)?.map((data, index) => {
                const { attdDt_id, date, stu_id, attd_id } = data;
                const attd = showatten.find((att) => att.attd_id === attd_id);
                const attdd = attd ? attd?.attd_name : "";

                const student = showstu.find((stu) => stu.stu_id === stu_id);
                const prefix = student ? student?.prefix : "";
                const stuname = student ? student?.stu_Fname : "";
                const stuLname = student ? student?.stu_Lname : "";
                const stusn = student ? student?.stu_sn : "";

                return (
                  <TableRow key={attdDt_id}>
                    <TableCell>
                      <p>{prefix} {stuname} {stuLname}</p>
                    </TableCell>
                    <TableCell><p>{stusn}</p></TableCell>
                    <TableCell>
                      <p>{new Date(date).toLocaleDateString("en-US")}</p>
                    </TableCell>
                    <TableCell><p>{attdd}</p></TableCell>
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
                        onClick={() => handleDeleteConfirmation(attdDt_id)}
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
          count={showattende?.length || 1} // Total number of rows
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Modal show={showEdit} onHide={EditClose}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>แก้ไขสถานะการเข้าเรียน</Form.Label>
              <Form.Control
                className="input-line"
                as="select"
                name="attd_id"
                value={updatedata?.attd_id}
                onChange={(e) => handleUpdate(e)}
              >
                {showatten?.map((data) => {
                  const { attdDt_id, attd_id, attd_name } = data;
                  return (
                    <option key={attd_id} value={attd_id}>
                      {attd_name}
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
          <Button variant="btn btn-outline-secondary" onClick={onUpdate}>
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
            onClick={() => onDelete(datamodal.attdt_id)}
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
    </div>
  );
}

export default StuAttendanceUpdate;
