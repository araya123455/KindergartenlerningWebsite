import "../assets/css/clouds.css";
import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { saveToLocalStorage } from "../LocalStorage/localstorage";
import {
  showclass,
  showstudent,
  showkinroom,
  getDataAll,
  searchclasstime,
} from "../slice/DataSlice";
import { searchstuclass } from "../reducers/SearchClass";

function ReportSubject() {
  const dispatch = useDispatch();
  const [showstu, setshowstu] = useState([]);
  const [showkinder, setShowKinder] = useState([]);
  const [showyear, setShowYear] = useState([]);
  const [showSearch, setshowsearch] = useState([]);
  const [showclasss, setshowclasss] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Adjust as needed

  const loadData = () => {
    dispatch(showstudent())
      .then((result) => {
        setshowstu(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadClass = () => {
    dispatch(showclass())
      .then((result) => {
        setshowclasss(result.payload);
        // console.log(result);
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

  // load search classtime
  const loadSearch = () => {
    dispatch(searchclasstime())
      .then((result) => {
        setshowsearch(result.payload);
        // console.log(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilter = () => {
    if (!selectedFilter) {
      loadClass();
      // console.error("Please select a filter value.");
      return;
    }

    // Split the selected option value to get kinder_id and yearterm_id
    const [selectedKinderId, selectedYeartermId] = selectedFilter.split(" ");

    // Convert the IDs to integers (if needed)
    const selectedKinderIdInt = parseInt(selectedKinderId, 10);
    const selectedYeartermIdInt = parseInt(selectedYeartermId, 10);

    if (isNaN(selectedKinderIdInt)) {
      console.error("Invalid kinder_id");
      return;
    }
    if (isNaN(selectedYeartermIdInt)) {
      console.error("Invalid yearterm_id");
      return;
    }

    // Dispatch the action to fetch filtered data based on selected filters
    dispatch(
      searchstuclass({
        kinder_id: selectedKinderIdInt,
        yearterm_id: selectedYeartermIdInt,
      })
    )
      .then((result) => {
        setFilteredData(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  saveToLocalStorage("restuId", null);
  const onClick = (id) => {
    saveToLocalStorage("restuId", id);
  };

  useEffect(() => {
    // Load all the data and store it in both state variables
    loadData();
    loadKinder();
    loadYearTerm();
    loadSearch();
    loadClass();
    // loadTeacherID();
    // loadTeacher();
    // Fetch the original data for filtering (remove this part from here)
  }, []);

  // Update Todisplay whenever filteredData changes
  useEffect(() => {
    setshowclasss(filteredData.length > 0 ? filteredData : showclasss);
    // console.log(filteredData);
  }, [filteredData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when the rows per page changes
  };

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
        <Link to={"/teacher/report"} className="back-font">
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
      <h1>ออกรายงานคะแนน</h1>

      <Form>
        <Form.Group className="mb-3" controlId="filter_kinder_id">
          <Form.Label>Filter by Kinder/YearTerm</Form.Label>
          <Form.Control
            as="select"
            className="input-line"
            name="filter_yearterm_id"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="">Show All Room/Level</option>
            {showSearch.map((data) => {
              const kinder = showkinder.find(
                (kin) => kin.kinder_id === data.kinder_id
              );
              const kinderName = kinder
                ? `${kinder.kinde_level}/${kinder.Kinder_room}`
                : "";

              const yearTerm = showyear.find(
                (term) => term.yearTerm_id === data.yearterm_id
              );
              const termYearName = yearTerm
                ? `${yearTerm.term}/${yearTerm.year}`
                : "";

              return (
                <option
                  key={data.kinder_id}
                  value={`${data.kinder_id} ${data.yearterm_id}`}
                >
                  {kinderName} - {termYearName}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Button className="button" variant="primary" onClick={handleFilter}>
          Apply Filter
        </Button>
      </Form>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="TableHead">
            <TableRow>
              <TableCell>
                <p className="headerC">ชั้น/ห้อง</p>
              </TableCell>
              <TableCell>
                <p className="headerC">เทอม/ปี</p>
              </TableCell>
              <TableCell>
                <p className="headerC">ชื่อ-นามสกุล</p>
              </TableCell>
              <TableCell>
                <p className="headerC">รหัสประจำตัว</p>
              </TableCell>
              <TableCell>
                <p className="headerC">ออกรายงาน</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showclasss?.slice(startIndex, endIndex)?.map((data) => {
              const { class_id, kinder_id, yearterm_id, stu_id } = data;

              const student = showstu.find((stu) => stu.stu_id === stu_id);
              const studentFName = student ? student.stu_Fname : "";
              const studentLName = student ? student.stu_Lname : "";
              const studentprefix = student ? student.prefix : "";
              const studentsn = student ? student.stu_sn : "";
              const kinder = showkinder.find(
                (kin) => kin.kinder_id === kinder_id
              );
              //  console.log(kinder);
              //  console.log(studentFName)
              const kinderLevel = kinder ? kinder.kinde_level : "";
              const kinderRoom = kinder ? kinder.Kinder_room : "";

              const yearTerm = showyear.find(
                (term) => term.yearTerm_id === yearterm_id
              );
              const year = yearTerm ? yearTerm.year : "";
              const term = yearTerm ? yearTerm.term : "";
              return (
                <TableRow key={class_id}>
                  <TableCell>
                    {kinderLevel}/{kinderRoom}
                  </TableCell>
                  <TableCell>
                    {term}/{year}
                  </TableCell>
                  <TableCell>
                    {studentprefix} {studentFName} {studentLName}
                  </TableCell>
                  <TableCell>{studentsn}</TableCell>
                  <TableCell>
                    <Link
                      className="linkshow"
                      to={"/teacher/showreportSubject"}
                      onClick={() => onClick(stu_id)}
                    >
                      แสดงรายงาน
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]} // You can adjust these options
          component="div"
          count={showclasss.length} // Total number of rows
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}
export default ReportSubject;
