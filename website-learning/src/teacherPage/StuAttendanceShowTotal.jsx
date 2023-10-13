import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../LocalStorage/localstorage";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { searceattendance } from "../slice/StudentSlice";
import { Link } from "react-router-dom";
import { attendance } from "../slice/TeacherSlice";
import "../assets/css/attendanceshowtotal.css";

function StuAttendanceShowTotal() {
  const dispatch = useDispatch();
  const crtId = getFromLocalStorage("crtId");
  const [showattende, setshowattende] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});
  const [showatten, setshowatten] = useState({});
  const [totalstu, settotalstu] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = () => {
    setSelectedDate("");
    loadattendancede();
    return;
  };

  const loadattendance = () => {
    dispatch(attendance())
      .then((result) => {
        setshowatten(result.payload);
        // console.log(showatten);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadattendancede = () => {
    dispatch(searceattendance({ crtId, selectedDate }))
      .then((result) => {
        setshowattende(result.payload.data);
        // console.log(result);
        // Count status occurrences for each date
        const counts = result.payload.data.reduce((acc, item) => {
          const date = new Date(item.date).toLocaleDateString("en-US");
          const status = item.attd_id;
          if (!acc[date]) {
            acc[date] = {};
          }
          if (!acc[date][status]) {
            acc[date][status] = 1;
          } else {
            acc[date][status]++;
          }
          return acc;
        }, {});
        setStatusCounts(counts);
        // Calculate the total number of students for each date
        const totalStudents = result.payload.data.reduce((acc, item) => {
          const date = new Date(item.date).toLocaleDateString("en-US");
          if (!acc[date]) {
            acc[date] = 1;
          } else {
            acc[date]++;
          }
          return acc;
        }, {});
        settotalstu(totalStudents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  saveToLocalStorage("fdate", null);
  const onClick = (id) => {
    // console.log(id);
    saveToLocalStorage("fdate", id);
  };

  const toggleSortDirection = () => {
    // Ascending <..> and Descending >..<
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  useEffect(() => {
    loadattendance();
    loadattendancede();
  }, []); // Load attendance data initially

  const sortedDates = Object.keys(statusCounts).sort((a, b) => {
    // console.log(statusCounts);
    if (sortDirection === "asc") {
      return new Date(a) - new Date(b);
    } else {
      return new Date(b) - new Date(a);
    }
  });

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, sortedDates.length - page * rowsPerPage);

  const displayedDates = sortedDates.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  // console.log(displayedDates.length);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // console.log("Rows per page changed:", event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
      <div>
        <h5>เลือกวันที่:</h5>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <br />
      <button className="buttonN buttnN" onClick={handleSearch}>
        Search
      </button>
      <br />
      <br />
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table className="custom-table" stickyHeader aria-label="sticky table">
          <TableHead className="TableHead">
            <TableRow>
              <TableCell
                onClick={toggleSortDirection}
                style={{ cursor: "pointer" }}
              >
                <p className="headerC">
                  เดือน-วัน-ปี
                  {sortDirection === "asc" ? " ▼" : " ▲"}
                </p>
              </TableCell>
              <TableCell>
                <p className="headerC">จำนวนนักเรียน</p>
              </TableCell>
              {Array.isArray(showatten) &&
                showatten.map((data) => {
                  const { attd_id, attd_name } = data;
                  return (
                    <TableCell key={attd_id} align="right">
                      <p className="headerC">{attd_name}</p>
                    </TableCell>
                  );
                })}
              <TableCell>
                <p className="headerC">Detail</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedDates.map((date) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={date}>
                <TableCell>
                  <p>{date}</p>
                </TableCell>
                <TableCell>
                  <p className="hstatus">{totalstu[date] || 0}</p>
                </TableCell>
                {showatten?.map((data) => {
                  // use date instead index to find status
                  const statusCount = statusCounts[date];
                  // console.log(statusCount);
                  const count =
                    statusCount && statusCount[data.attd_id]
                      ? statusCount[data.attd_id]
                      : 0;
                  return (
                    <TableCell key={data.attd_id} align="right">
                      <p className={`hstatus ${count != 0 ? "green" : "red"}`}>
                        {count}
                      </p>
                    </TableCell>
                  );
                })}
                <TableCell>
                  <Link
                    className="linkshow"
                    to={"/teacher/attendance/attendanceShow"}
                    onClick={() => onClick(date)}
                  >
                    ดูประวัติ
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )} */}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedDates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

export default StuAttendanceShowTotal;
