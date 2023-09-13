import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import {
  showassessment,
  insertassessment,
  editassessment,
  deleteassessment,
  showkinroom,
  getDataAll,
} from "../slice/DataSlice";

function MgtAssessmentClass() {
  const dispatch = useDispatch();
  const [showkinder, setShowKinder] = useState([]);
  const [showyear, setShowYear] = useState([]);
  const [showasses, setshowasses] = useState([]);
  // select id from onClick in MghAssessment
  const yeartermid = getFromLocalStorage("yearassid");
  const kinderid = getFromLocalStorage("kinassid");

  const loadKinder = () => {
    dispatch(showkinroom())
      .then((result) => {
        setShowKinder(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadyearterm = () => {
    dispatch(getDataAll())
      .then((result) => {
        setShowYear(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadassessment = () => {
    dispatch(showassessment())
      .then((result) => {
        setshowasses(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadKinder();
    loadyearterm();
    loadassessment();
  }, []);

  const yearTerm = showyear.find((data) => data.yearTerm_id === yeartermid);
  const getyear = yearTerm ? yearTerm.year : "";
  const getterm = yearTerm ? yearTerm.term : "";
  const kinroom = showkinder.find((data) => data.kinder_id === kinderid);
  const getkin = kinroom ? kinroom.kinde_level : "";
  const getroom = kinroom ? kinroom.Kinder_room : "";

  return (
    <div>
      <h1>
        ห้องอนุบาล {getkin}/{getroom} ปีการศึกษา {getyear} เทอม {getterm}
      </h1>
      <Link to={"/MgtAssessment"}>
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
        <Button className="button" variant="primary" onClick={""}>
          ADD
        </Button>
        <table>
          <thead>
            <th>ชื่อประเมิน</th>
            <th>คะแนนเต็ม</th>
            <th>Confix</th>
          </thead>
          <tbody>
            {showasses?.map((data) => {
              const { asses_id, assess_name, full_score } = data;
              return (
                <tr key={asses_id}>
                  <td>{assess_name}</td>
                  <td>{full_score}</td>
                  <td>
                    <Button
                      variant="btn btn-secondary"
                      // onClick={() => EditShow(asses_id)}
                    >
                      EDIT
                    </Button>
                    <Button
                      className="buttonD"
                      variant="btn btn-danger"
                      // onClick={() => onDelete(asses_id)}
                    >
                      DELETE
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MgtAssessmentClass;
