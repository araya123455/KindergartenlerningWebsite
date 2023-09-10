import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import "../assets/css/attendance.css";
import {
  showclass,
  showstudent,
  showclasstime,
  showkinroom,
  getDataAll,
  searchclasstime,
} from "../slice/DataSlice";
import { attendance, attendancedetail } from "../slice/TeacherSlice";
import { fetchStudentData } from "../slice/TchStuSlice";
import { studentattendance, searceattendance } from "../slice/StudentSlice";
import { Link, Route } from "react-router-dom";

function StuAttendanceShow() {
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
        console.log(result.payload.data);
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
      console.log(selectedDate);
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
    // console.log("123");
    // console.log(studentData);
    const filteredStudents = studentData?.filter(
      (student) => student.stu_sn.toLowerCase() === searchQuery.toLowerCase()
    );
    stuid = filteredStudents[0].stu_id;
    setStudentResults(filteredStudents[0].stu_id);
    loadattendancede();
    // console.log(filteredStudents[0].stu_id);
    // console.log(stuid);S
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
          </tr>
        </thead>
        <tbody>
          {Array.isArray(showattende) &&
            showattende?.map((data, index) => {
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
                  <td>{new Date(date).toISOString().split("T")[0]}</td>
                  <td>{attdd}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default StuAttendanceShow;
