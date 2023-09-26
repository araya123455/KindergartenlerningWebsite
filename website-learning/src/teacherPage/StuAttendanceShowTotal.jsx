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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadattendancede = () => {
    dispatch(searceattendance({ crtId, selectedDate }))
      .then((result) => {
        setshowattende(result.payload.data);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Link to={"/attendance"}>
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
        <label>เลือกวันที่:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <br />
      <button onClick={handleSearch}>Search</button>
      <br />
      <br />
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
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
                <TableCell>{date}</TableCell>
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
                    to={"/attendance/attendanceShow"}
                    onClick={() => onClick(date)}
                  >
                    ดูประวัติ
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedDates.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default StuAttendanceShowTotal;
