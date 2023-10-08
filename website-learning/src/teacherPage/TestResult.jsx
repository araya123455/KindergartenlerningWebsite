import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showtest, showtestde } from "../slice/TeacherSlice";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../LocalStorage/localstorage";
import {
  showclass,
  showkinroom,
  getDataAll,
  searchclasstime,
} from "../slice/DataSlice";
import { Outlet, Link } from "react-router-dom";

function TestResult() {
  const dispatch = useDispatch();
  const [showtestname, setshowtestname] = useState([]);
  const [showtestdetail, setshowtestdetail] = useState([]);
  const [showkinder, setShowKinder] = useState([]);
  const [showyear, setShowYear] = useState([]);
  const [showClass, setShowClass] = useState([]);

  const loadtest = () => {
    dispatch(showtest())
      .then((result) => {
        setshowtestname(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadtestdetail = () => {
    dispatch(showtestde())
      .then((result) => {
        setshowtestdetail(result.payload);
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

  const loadClass = () => {
    dispatch(showclass())
      .then((result) => {
        setShowClass(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  saveToLocalStorage("testde_id", null);
  saveToLocalStorage("testedId", null);
  const onClick = (testde_id, testid) => {
    const test_id = testid.test_id;
    saveToLocalStorage("testde_id", testde_id);
    saveToLocalStorage("testedId", test_id);
  };

  useEffect(() => {
    loadtest();
    loadtestdetail();
    loadClass();
    loadKinder();
    loadYearTerm();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="TableHead">
            <TableRow>
              <TableCell>
                <p className="headerC">ชื่อแบบทดสอบ</p>
              </TableCell>
              <TableCell>
                <p className="headerC">ชั้น/ห้อง</p>
              </TableCell>
              <TableCell>
                <p className="headerC">ปี/เทอม</p>
              </TableCell>
              <TableCell>
                <p className="headerC">Confix</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* bcoz test can add to many class then use testdetail */}
            {showtestdetail?.map((data, index) => {
              // const { test_id, test_detail } = data;
              const testde_id = showtestdetail[index]?.testDe_id;
              const testid = showtestname.find(
                (tes) => tes.test_id === showtestdetail[index]?.test_id
              );
              const testnamed = testid ? testid?.test_detail : "";
              const kinder = showkinder?.find(
                (kin) => kin.kinder_id === showtestdetail[index]?.kinder_id
              );
              const kinderLevel = kinder ? kinder?.kinde_level : "";
              const kinderRoom = kinder ? kinder?.Kinder_room : "";

              const yearTerm = showyear?.find(
                (term) =>
                  term.yearTerm_id === showtestdetail[index]?.yearterm_id
              );
              const year = yearTerm ? yearTerm.year : "";
              const term = yearTerm ? yearTerm.term : "";
              return (
                <TableRow key={index}>
                  <TableCell>
                    <p>{testnamed}</p>
                  </TableCell>
                  <TableCell>
                    <p>
                      {kinderLevel}/{kinderRoom}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p>
                      {term}/{year}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="linkshow"
                      to="/testResultDetail"
                      onClick={() => onClick(testde_id, testid)}
                    >
                      แบบทดสอบที่ถูกส่งมา
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Outlet />
    </div>
  );
}

export default TestResult;
