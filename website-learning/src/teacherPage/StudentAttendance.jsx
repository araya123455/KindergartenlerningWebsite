import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import {
  showclass,
  showstudent,
  showclasstime,
  showkinroom,
  getDataAll,
  searchclasstime,
} from "../slice/DataSlice";
import {
  attendance,
  attendancedetail,
  attendancedetailinsert,
  attendancedetailupdate,
} from "../slice/TeacherSlice";

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

  const onShow = (id) => {

  }

  const onInsert = (id) => {

  }

  useEffect(() => {
    loadSearch();
    loadClass();
    loadKinder();
    loadYearTerm();
  }, []);

  return (
    <div>
      <h1>แช็คชื่อนักเรียน</h1>
      <table>
        <thead>
          <tr>
            <th>ชั้น/ห้อง</th>
            <th>เทอม/ปีการศึกษา</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
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
              <tr>
                <td>{kinderName}</td>
                <td>{termYearName}</td>
                <td><Button
                    variant="btn btn-primary"
                    onClick={() => onShow(crt_id)}
                  >
                    ดูประวัติ
                  </Button>
                  <Button
                    className="buttonD"
                    variant="btn btn-warning"
                    onClick={() => onInsert(crt_id)}
                  >
                    เช็คชื่อ
                  </Button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentAttendance;
