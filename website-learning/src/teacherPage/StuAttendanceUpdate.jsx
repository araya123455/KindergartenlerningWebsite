import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/attendance.css";
import { showkinroom, getDataAll, searchclasstime } from "../slice/DataSlice";
import {
  attendance,
  attendancedetailupdate,
  attendancedelete,
} from "../slice/TeacherSlice";
import { fetchStudentData } from "../slice/TchStuSlice";
import { studentattendance, searceattendance } from "../slice/StudentSlice";
import { Button, Form } from "react-bootstrap";

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
    console.log(body);
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

  return (
    <div>
      <div>
        <h1>
          การเช็คชื่อเข้าห้องเรียนห้องอนุบาล {getkin}/{getroom} ปีการศึกษา{" "}
          {getyear} เทอม {getterm}
        </h1>
      </div>
      <div>
        <label>Filter by Date:</label>
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
      <button onClick={handleSearch}>Search</button>
      <table>
        <thead>
          <tr>
            <th>ชื่อ-นามสกุล</th>
            <th>รหัสประจำตัว</th>
            <th>ปี-เดือน-วัน</th>
            <th>สถานะ</th>
            <th>Confix</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(showattende) &&
            showattende?.map((data, index) => {
              const attdt_id = showattende[index].attdDt_id;
              // console.log(attdt_id);
              const stuid = showattende[index].stu_id;
              const date = showattende[index].date;
              const attdid = showattende[index].attd_id;
              const attd = showatten.find((att) => att.attd_id === attdid);
              const attdd = attd ? attd?.attd_name : "";
              // console.log(stuid);
              const student = showstu.find((stu) => stu.stu_id === stuid);
              // console.log(student);
              const prefix = student ? student?.prefix : "";
              const stuname = student ? student?.stu_Fname : "";
              const stuLname = student ? student?.stu_Lname : "";
              const stusn = student ? student?.stu_sn : "";

              return (
                <tr key={index}>
                  <td>
                    {prefix} {stuname} {stuLname}
                  </td>
                  <td>{stusn}</td>
                  <td>{new Date(date).toLocaleDateString("en-US")}</td>
                  <td>{attdd}</td>
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
                      onClick={() => handleDeleteConfirmation(attdt_id)}
                    >
                      DELETE
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
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
