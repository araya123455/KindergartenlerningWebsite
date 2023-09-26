import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import "../assets/css/attendance.css";
import { showkinroom, getDataAll, searchclasstime } from "../slice/DataSlice";
import { attendance } from "../slice/TeacherSlice";
import { fetchStudentData } from "../slice/TchStuSlice";
import { studentattendance, searceattendance } from "../slice/StudentSlice";
import { Link } from "react-router-dom";

function StuAttendanceShow() {
  const dispatch = useDispatch();
  const crtId = getFromLocalStorage("crtId");
  const fdate = getFromLocalStorage("fdate");

  // Assuming fdate is in the format '9/23/2023' to '2023-09-23'
  const parts = fdate.split('/');
  const formattedDate = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;

  const [showstu, setshowstu] = useState([]);
  const [showatten, setshowatten] = useState([]);
  const [showattende, setshowattende] = useState([]);
  const [showkinder, setShowKinder] = useState([]);
  const [showyear, setShowYear] = useState([]);
  const [showSearch, setshowsearch] = useState([]);
  const [selectedDate, setSelectedDate] = useState(formattedDate); // Initialize with formatted date
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
      setStudentResults("");
      return;
    }
    filterData();
  };

  useEffect(() => {
    dispatch(fetchStudentData());
  }, [dispatch]);

  const filterData = () => {
    const filteredStudents = studentData?.filter(
      (student) => student.stu_sn.toLowerCase() === searchQuery.toLowerCase()
    );
    stuid = filteredStudents[0].stu_id;
    setStudentResults(filteredStudents[0].stu_id);
    loadattendancede();
  };

  useEffect(() => {
    loadstudent();
    loadattendance();
    loadattendancede();
    loadSearch();
    loadKinder();
    loadYearTerm();
  }, [selectedDate]);

  return (
    <div>
      <Link to={"/attendance/stuAttendanceShowTotal"}>
        <svg
          baseProfile="tiny"
          height="24px"
          id="Layer_1"
          version="1.2"
          viewBox="0 0 24 24"
          width="24px"
        >
          <g>
            <path d="M19.164,19.547c-1.641-2.5-3.669-3.285-6.164-3.484v1.437c0,0.534-0.208,1.036-0.586,1.414   c-0.756,0.756-2.077,0.751-2.823,0.005l-6.293-6.207C3.107,12.523,3,12.268,3,11.999s0.107-0.524,0.298-0.712l6.288-6.203   c0.754-0.755,2.073-0.756,2.829,0.001C12.792,5.463,13,5.965,13,6.499v1.704c4.619,0.933,8,4.997,8,9.796v1   c0,0.442-0.29,0.832-0.714,0.958c-0.095,0.027-0.19,0.042-0.286,0.042C19.669,19.999,19.354,19.834,19.164,19.547z M12.023,14.011   c2.207,0.056,4.638,0.394,6.758,2.121c-0.768-3.216-3.477-5.702-6.893-6.08C11.384,9.996,11,10,11,10V6.503l-5.576,5.496l5.576,5.5   V14C11,14,11.738,14.01,12.023,14.011z" />
          </g>
        </svg>
      </Link>
      <div>
        <h1>
          การเช็คชื่อเข้าห้องเรียนห้องอนุบาล {getkin}/{getroom} ปีการศึกษา{" "}
          {getyear} เทอม {getterm}
        </h1>
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
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>ชื่อ-นามสกุล</th>
            <th>รหัสประจำตัว</th>
            <th>เดือน-วัน-ปี</th>
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
              const student = showstu.find((stu) => stu.stu_id === stuid);
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
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default StuAttendanceShow;