import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../LocalStorage/localstorage";
// import "../assets/css/assesment.css";
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

  useEffect(() => {
    loadSearch();
    loadClass();
    loadKinder();
    loadYearTerm();
  }, []);

  return (
    <div>
      <h1>แบบให้คะแนนนักเรียนแต่ละวิชา</h1>
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
              <tr key={crt_id}>
                <td>{kinderName}</td>
                <td>{termYearName}</td>
                <td>
                  <Link
                    className="assclass"
                    to={"/stuSubjectScoreInsert"}
                    onClick={() => onClick(kinder_id, yearterm_id)}
                  >
                    ให้คะแนนนักเรียน
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

export default SubjectScore;
