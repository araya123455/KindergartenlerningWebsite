import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import "../assets/css/attendance.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { showkinroom, getDataAll, searchclasstime } from "../slice/DataSlice";
import { attendance, attendancedetailinsert } from "../slice/TeacherSlice";
import { studentattendance } from "../slice/SearchDataSlice";
import { Link } from "react-router-dom";

function StuAttendanceInsert() {
  const dispatch = useDispatch();
  const crtId = getFromLocalStorage("crtId");
  const [showstu, setshowstu] = useState([]);
  const [showatten, setshowatten] = useState([]);
  const [statusRecords, setStatusRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showkinder, setShowKinder] = useState([]);
  const [showyear, setShowYear] = useState([]);
  const [showSearch, setshowsearch] = useState([]);
  // const [sta, setsta] = useState([]);

  const loadstudent = () => {
    dispatch(studentattendance({ crtId }))
      .then((result) => {
        const defaultAttdId = getAttdIdByStatus("มา"); // Default status for all students
        const initialStatusRecords = result.payload.map((student) => ({
          stu_id: student.stu_id,
          attd_id: defaultAttdId,
          date: new Date(selectedDate).toISOString().split("T")[0],
        }));
        setshowstu(result.payload);
        // console.log(result);
        setStatusRecords(initialStatusRecords);
        console.log(statusRecords);
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

  const handleStatusChange = (index, attd_id) => {
    // Update the statusRecords array with the selected status for the specific student.
    // console.log(index);
    console.log(attd_id);
    setStatusRecords((prevStatusRecords) => {
      const updatedStatusRecords = [...prevStatusRecords];
      updatedStatusRecords[index] = {
        ...updatedStatusRecords[index],
        attd_id: attd_id,
        date: new Date(selectedDate).toISOString().split("T")[0],
      };
      return updatedStatusRecords;
    });
  };

  const handleStatusDate = (date) => {
    // Get the selected status for each student
    const selectedStatus = statusRecords.map((record) => record.attd_id);

    // Update the statusRecords array with the selected status and the new date
    setStatusRecords((prevStatusRecords) => {
      const updatedStatusRecords = prevStatusRecords.map((record, index) => ({
        ...record,
        attd_id: selectedStatus[index] || getAttdIdByStatus("มา"),
        date: date,
      }));
      setSelectedDate(new Date(date).toISOString().split("T")[0]);
      return updatedStatusRecords;
    });
  };

  const onInsert = () => {
    // Create an array to hold all attendance records, including defaults
    const allAttendanceRecords = showstu.map((student) => ({
      stu_id: student.stu_id,
      attd_id: statusRecords.find((record) => record.stu_id === student.stu_id)?.attd_id || getAttdIdByStatus("มา"),
      date: new Date(selectedDate).toISOString().split("T")[0],
    }));
  
    // Iterate through all attendance records and send each to the server
    Promise.all(
      allAttendanceRecords.map((record) => {
        const { date, stu_id, attd_id } = record;
        if (date && stu_id && attd_id) {
          const body = { date, stu_id, attd_id };
          return dispatch(attendancedetailinsert(body));
        }
        return Promise.resolve(); // Skip invalid records
      })
    )
      .then(() => {
        toast.success("Attendance records inserted successfully");
        // Clear the status and date for each student individually
        const updatedStatusRecords = statusRecords.map((record) => ({
          ...record,
          attd_id: "",
          date: "",
        }));
        setStatusRecords(updatedStatusRecords); // Reset the status records for all students
        setSelectedDate(new Date()); // Reset the date
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to insert attendance records");
      });
  };
  

  const crt_Id = showSearch.find((data) => data?.crt_id === crtId);
  const yearTerm_id = crt_Id ? crt_Id.yearterm_id : "";
  const yearTerm = showyear.find((data) => data.yearTerm_id === yearTerm_id);
  const getyear = yearTerm ? yearTerm?.year : "";
  const getterm = yearTerm ? yearTerm?.term : "";
  const kinroom_id = crt_Id ? crt_Id?.kinder_id : "";
  const kinroom = showkinder?.find((data) => data?.kinder_id === kinroom_id);
  const getkin = kinroom ? kinroom?.kinde_level : "";
  const getroom = kinroom ? kinroom?.Kinder_room : "";

  function getAttdIdByStatus(status) {
    const matchingStatus = showatten?.find(
      (data) => data?.attd_name === status
    );
    // console.log(matchingStatus?.attd_id);
    return matchingStatus ? matchingStatus?.attd_id : "";
  }

  useEffect(() => {
    loadstudent();
    loadattendance();
    loadSearch();
    loadKinder();
    loadYearTerm();
  }, []);

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
        <h1>
          เช็คชื่อนักเรียนห้อง {getkin}/{getroom} ปีการศึกษา {getyear} เทอม{" "}
          {getterm}
        </h1>
      </div>
      <div>
        <label>เลือกวันที่:</label>
        <input
          type="date"
          value={new Date(selectedDate).toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate(e.target.value)}
          onFocus={(e) => handleStatusDate(e.target.value)}
        />
      </div>
      <br />
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
              <p className="headerC">สถานะเข้าเรียน</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showstu
            ?.sort((a, b) => a.stu_id - b.stu_id)
            ?.map((data, index) => {
              const { stu_id, prefix, stu_Fname, stu_Lname, stu_sn } = data;
              return (
                <TableRow key={stu_id}>
                  <TableCell>
                    <p>{prefix} {stu_Fname} {stu_Lname}</p>
                  </TableCell>
                  <TableCell><p>{stu_sn}</p></TableCell>
                  <TableCell>
                    <p>{new Date(selectedDate).toLocaleDateString("en-US")}</p>
                  </TableCell>
                  <TableCell>
                    <select
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                      // onFocus={(e) => handleStatusDate(e.target.value)}
                      // onFocus={(e) => setsta(index, e.target.value)}
                      value={
                        statusRecords[index]?.attd_id || getAttdIdByStatus("มา")
                      }
                    >
                      {showatten?.map((data) => {
                        const { attd_id, attd_name } = data;
                        return (
                          <option key={attd_id} value={attd_id}>
                            {attd_name}
                          </option>
                        );
                      })}
                    </select>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <br />
      <button className="buttonN buttnN" onClick={() => onInsert()}>บันทึก</button>
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

export default StuAttendanceInsert;
