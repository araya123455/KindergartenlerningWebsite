import "../assets/css/clouds.css";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { saveToLocalStorage } from "../LocalStorage/localstorage";
import {
  showclass,
  showstudent,
  showclasstime,
  showkinroom,
  getDataAll,
  searchclasstime,
  showteacher,
  showsubject,
} from "../slice/DataSlice";
import { searchstuclass } from "../slice/searchSlice";

function ReportSubjectYearTerm() {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [showstu, setshowstu] = useState([]);
  const [classroomTimetableData, setClassroomTimetableData] = useState([]);
  const [showkinder, setShowKinder] = useState([]);
  const [showyear, setShowYear] = useState([]);
  const [showSearch, setshowsearch] = useState([]);
  const [showclasss, setshowclasss] = useState([])

  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");

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
        // console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadYearTerm = () => {
    dispatch(getDataAll())
      .then((result) => {
        setShowYear(result.payload);
        // console.log(result);
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
    // console.log(id);
    saveToLocalStorage("restuId", id);
  };

  useEffect(() => {
    // Load all the data and store it in both state variables
    loadData();
    loadKinder();
    loadYearTerm();
    loadSearch();
    loadClass();
    // Fetch the original data for filtering (remove this part from here)
  }, []);

  // Update Todisplay whenever filteredData changes
  useEffect(() => {
    setshowclasss(filteredData.length > 0 ? filteredData : showclasss);
    // console.log(filteredData);
  }, [filteredData]);

  return (
    <div>
      <h1>ผลการเรียน</h1>
      <div id="clouds">
        <div className="cloud x1"></div>
        <div className="cloud x2"></div>
        <div className="cloud x3"></div>
        <div className="cloud x4"></div>
        <div className="cloud x5"></div>
        <div className="cloud x6"></div>
        <div className="cloud x7"></div>
      </div>
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
      <table>
        <thead>
          <tr>
            <th>ชั้น/ห้อง</th>
            <th>เทอม/ปี</th>
            <th>ชื่อ-นามสกุล</th>
            <th>รหัสประจำตัว</th>
            <th>แก้ไข</th>
          </tr>
        </thead>
        <tbody>
          {showclasss?.map((data) => {
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
             const kinderLevel = kinder ? kinder.kinde_level : "";
             const kinderRoom = kinder ? kinder.Kinder_room : "";
 
             const yearTerm = showyear.find(
               (term) => term.yearTerm_id === yearterm_id
             );
             const year = yearTerm ? yearTerm.year : "";
             const term = yearTerm ? yearTerm.term : "";
            return (
              <tr key={class_id}>
                <td>
                  {kinderLevel}/{kinderRoom}
                </td>
                <td>
                  {term}/{year}
                </td>
                <td>
                  {studentprefix} {studentFName} {studentLName}
                </td>
                <td>{studentsn}</td>
                <td>
                  <Link
                    to={"/showreportSubject"}
                    onClick={() => onClick(stu_id)}
                  >
                    แสดงรายงาน
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ReportSubjectYearTerm;
