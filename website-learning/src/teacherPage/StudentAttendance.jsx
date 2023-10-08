import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import { saveToLocalStorage } from "../LocalStorage/localstorage";
import "../assets/css/attendance.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  showclass,
  showkinroom,
  getDataAll,
  searchclasstime,
} from "../slice/DataSlice";
import { Link, Route } from "react-router-dom";

function StudentAttendance() {
  const dispatch = useDispatch();
  const [showkinder, setShowKinder] = useState([]);
  const [showyear, setShowYear] = useState([]);
  const [showClass, setShowClass] = useState([]);
  const [showSearch, setshowsearch] = useState([]);

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
  const loadClass = () => {
    dispatch(showclass())
      .then((result) => {
        setShowClass(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  saveToLocalStorage("crtId", null);
  const onClick = (id) => {
    // console.log(id);
    saveToLocalStorage("crtId", id);
  };

  useEffect(() => {
    loadSearch();
    loadClass();
    loadKinder();
    loadYearTerm();
  }, []);

  return (
    <div>
      <h1 className="h2">แช็คชื่อนักเรียน</h1>
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
                <p className="headerC">Action</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showSearch?.map((data) => {
              const { crt_id, kinder_id, yearterm_id } = data;
              const kinder = showkinder.find(
                (kin) => kin?.kinder_id === kinder_id
              );
              const kinderName = kinder
                ? `${kinder?.kinde_level}/${kinder?.Kinder_room}`
                : "";

              const yearTerm = showyear.find(
                (term) => term?.yearTerm_id === yearterm_id
              );
              const termYearName = yearTerm
                ? `${yearTerm.term}/${yearTerm.year}`
                : "";
              return (
                <TableRow key={crt_id}>
                  <TableCell>
                    <p>{kinderName}</p>
                  </TableCell>
                  <TableCell>
                    <p>{termYearName}</p>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="linkshow"
                      to={"stuAttendanceShowTotal"}
                      onClick={() => onClick(crt_id)}
                    >
                      ดูประวัติ
                    </Link>
                    <Link
                      className="linkinsert"
                      to={"stuAttendanceInsert"}
                      onClick={() => onClick(crt_id)}
                    >
                      เช็คชื่อ
                    </Link>
                    <Link
                      className="linkshow"
                      to={"stuAttendanceUpdate"}
                      onClick={() => onClick(crt_id)}
                    >
                      แก้ไข
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StudentAttendance;
