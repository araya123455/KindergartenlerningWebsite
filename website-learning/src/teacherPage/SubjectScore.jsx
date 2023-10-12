import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../LocalStorage/localstorage";
// import "../assets/css/assesment.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  showclass,
  showkinroom,
  getDataAll,
  searchclasstime,
} from "../slice/DataSlice";
import { Link, Route } from "react-router-dom";

function SubjectScore() {
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

  saveToLocalStorage("kinscoreid", null);
  saveToLocalStorage("yearscoreid", null);
  const onClick = (kinder_id, yearterm_id) => {
    saveToLocalStorage("kinscoreid", kinder_id);
    saveToLocalStorage("yearscoreid", yearterm_id);
  };
  saveToLocalStorage("kinfullid", null);
  saveToLocalStorage("yearfullid", null);
  const onClickF = (kinder_id, yearterm_id) => {
    saveToLocalStorage("kinfullid", kinder_id);
    saveToLocalStorage("yearfullid", yearterm_id);
  };

  useEffect(() => {
    loadSearch();
    loadClass();
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
      <h1 className="h2">แบบให้คะแนนนักเรียนแต่ละวิชา</h1>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="TableHead">
            <TableRow>
              <TableCell>
                <p className="headerC">ชั้น/ห้อง</p>
              </TableCell>
              <TableCell>
                <p className="headerC">เทอม/ปีการศึกษา</p>
              </TableCell>
              <TableCell>
                <p className="headerC"></p>
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
                      className="assclass"
                      to={"/teacher/subjectFullScore"}
                      onClick={() => onClickF(kinder_id, yearterm_id)}
                    >
                      กำหนดคะแนนเต็ม
                    </Link>
                    <Link
                      className="assclass"
                      to={"/teacher/stuSubjectScoreInsert"}
                      onClick={() => onClick(kinder_id, yearterm_id)}
                    >
                      ให้คะแนนนักเรียน
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

export default SubjectScore;
