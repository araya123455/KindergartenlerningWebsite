import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import "../assets/css/attendance.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { showkinroom, getDataAll, searchclasstime } from "../slice/DataSlice";
import { attendance } from "../slice/TeacherSlice";
import { fetchStudentData } from "../slice/FetchDataSlice";
import { studentattendance, searceattendance } from "../slice/SearchDataSlice";
import { Link } from "react-router-dom";

function StuAttendanceShow() {
  const dispatch = useDispatch();
  const crtId = getFromLocalStorage("crtId");
  const fdate = getFromLocalStorage("fdate");

  // Assuming fdate is in the format '9/23/2023' to '2023-09-23'
  const parts = fdate.split("/");
  const formattedDate = `${parts[2]}-${parts[0].padStart(
    2,
    "0"
  )}-${parts[1].padStart(2, "0")}`;

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
        // console.log(showattende);
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

  const crt_Id = showSearch.find((data) => data?.crt_id === crtId);
  const yearTerm_id = crt_Id ? crt_Id?.yearterm_id : "";
  const yearTerm = showyear.find((data) => data?.yearTerm_id === yearTerm_id);
  const getyear = yearTerm ? yearTerm?.year : "";
  const getterm = yearTerm ? yearTerm?.term : "";
  const kinroom_id = crt_Id ? crt_Id?.kinder_id : "";
  const kinroom = showkinder.find((data) => data?.kinder_id === kinroom_id);
  const getkin = kinroom ? kinroom?.kinde_level : "";
  const getroom = kinroom ? kinroom?.Kinder_room : "";

  const handleReset = () => {
    setSearchQuery("");
    loadattendancede();
  };

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
      (student) => student?.stu_sn.toLowerCase() === searchQuery.toLowerCase()
    );
    stuid = filteredStudents[0]?.stu_id;
    setStudentResults(filteredStudents[0]?.stu_id);
    loadattendancede();
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
        <Link
          to={"/teacher/attendance/stuAttendanceShowTotal"}
          className="back-font"
        >
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
        <button className="buttonN buttnN" onClick={handleSearch}>
          Search
        </button>
        <button className="buttonR buttnR buttonD" onClick={handleReset}>
          Reset
        </button>
      </div>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(showattende) &&
              showattende
                ?.sort((a, b) => a?.stu_id - b?.stu_id)
                ?.slice(startIndex, endIndex)
                ?.map((data, index) => {
                  const { attdDt_id, date, stu_id, attd_id } = data;
                  const attd = showatten.find(
                    (att) => att?.attd_id === attd_id
                  );
                  const attdd = attd ? attd.attd_name : "";
                  const student = showstu.find((stu) => stu?.stu_id === stu_id);
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
                      <TableCell>
                        <p
                          className={
                            attdd === "มา"
                              ? "green hstatus"
                              : attdd === "ลา"
                              ? "orange hstatus"
                              : attdd === "สาย"
                              ? "red hstatus"
                              : attdd === "ขาด"
                              ? "red hstatus"
                              : "hstatus"
                          }
                        >
                          {attdd}
                        </p>
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
    </div>
  );
}

export default StuAttendanceShow;
