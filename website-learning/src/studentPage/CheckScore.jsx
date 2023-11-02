import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import { Outlet, Link } from "react-router-dom";
import { showstusubscore } from "../slice/TeacherSlice";
import { showstusubreport } from "../reducers/ReducerData";
import { showsubject } from "../slice/DataSlice";
import "../assets/css/checkscore.css";

function CheckScore() {
  const dispatch = useDispatch();
  const auth = getFromLocalStorage("stu_auth");
  const substuId = auth.stu_id;
  const [stuscore, setstuscore] = useState([]);
  const [subject, setsubject] = useState([]);
  const [sylla, setsylla] = useState([]);
  var full = 0,
    score = 0;

  const loadstudentscore = () => {
    dispatch(showstusubreport({ substuId }))
      .then((result) => {
        setstuscore(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadsubject = () => {
    dispatch(showsubject())
      .then((result) => {
        setsubject(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadsylla = () => {
    // dispatch(shownamesyllabus())
    //   .then((result) => {
    //     setsylla(result.payload);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  useEffect(() => {
    loadstudentscore();
    loadsubject();
    loadsylla();
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
      {stuscore.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ชื่อวิชา</th>
              <th>คะแนนเต็ม</th>
              <th>คะแนนที่ได้</th>
            </tr>
          </thead>
          <tbody>
            {stuscore?.map((data) => {
              const { subscore_id, subscore, sub_id, stu_id } = data;
              const sub = subject?.find((n) => n?.sub_id === sub_id);
              // console.log(subject);
              full += sub?.fullscore;
              score += subscore;
              return (
                <tr key={subscore_id}>
                  <td>{sub?.sub_name}</td>
                  <td>{sub?.fullscore}</td>
                  <td>{subscore}</td>
                </tr>
              );
            })}
            <tr>
              <td className="fblod">คะแนนรวม</td>
              <td className="fblod">{full}</td>
              <td className="fblod">{score}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>
          <h2>คะแนนของคุณยังไม่ถูกบันทึก</h2>
          <p>**โปรดติดต่ออาจารย์ที่ปรึกษาเพื่อทราบผลคะแนน</p>
        </div>
      )}
    </div>
  );
}

export default CheckScore;
