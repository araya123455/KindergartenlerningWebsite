import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { RemindFill } from "@rsuite/icons";
import "../assets/css/tableinsert.css";
import { showstudent } from "../slice/DataSlice";
import { saveToLocalStorage } from "../LocalStorage/localstorage";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

import {
  showkinroom,
  getDataAll,
} from "../slice/DataSlice";
import { searchstuclass } from "../slice/searchSlice";

function ReportSubject() {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [showkinder, setShowKinder] = useState([]);
  const [showyear, setShowYear] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [Todisplay, setTodisplay] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [showSearch, setshowsearch] = useState([]);

  const loadData = () => {
    dispatch(showstudent())
      .then((result) => {
        setshowdata(result.payload);
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

  const handleFilter = () => {
    if (!selectedFilter) {
      loadData();
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

  const getAvailableStudents = () => {
    const addedStudentIds = Todisplay.map((data) => data.stu_id);
    return showstu.filter((stu) => !addedStudentIds.includes(stu.stu_id));
  };
  saveToLocalStorage("restuId", null);
  const onClick = (id) => {
    saveToLocalStorage("restuId", id);
  };

  useEffect(() => {
    loadData();
    loadKinder();
    loadYearTerm();
    // loadSearch();
  }, []);

  return (
    <>
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
            <th>คำนำหน้า</th>
            <th>ชื่อ</th>
            <th>นามสกุล</th>
            <th>รหัสประจำตัว</th>
            <th>สถานะ</th>
            <th>Confix</th>
          </tr>
        </thead>
        <tbody>
          {showdata?.map((data) => {
            const { stu_id, prefix, stu_Fname, stu_Lname, stu_sn, status, kinder_id, yearterm_id } = data;
            const kinder = showkinder.find(
              (kin) => kin.kinder_id === kinder_id
            );
            const kinderLevel = kinder ? kinder.kinde_level : "";
            const kinderRoom = kinder ? kinder.Kinder_room : "";

            const yearTerm = showyear.find(
              (term) => term.yearTerm_id === yearterm_id
            );
            const year = yearTerm ? yearTerm.year : "";
            const term = yearTerm ? yearTerm.term : "";
            return (
              <tr key={stu_id}>
                <td>{prefix}</td>
                <td>{stu_Fname}</td>
                <td>{stu_Lname}</td>
                <td>{stu_sn}</td>
                <td>{status}</td>
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
    </>
  );
}

export default ReportSubject;
