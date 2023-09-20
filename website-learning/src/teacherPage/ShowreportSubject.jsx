import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import { showstusubreport } from "../slice/StudentSlice";
import "../assets/css/Report.css";
import {
  showkinroom,
  getDataAll,
  showclass,
  showstudent,
  showsubject,
} from "../slice/DataSlice";
import { showstusubscore } from "../slice/TeacherSlice";

function ShowreportSubject() {
  const dispatch = useDispatch();
  const substuId = getFromLocalStorage("restuId");
  const [showsubre, setshowsubre] = useState([]);
  const [showsubname, setshowsubname] = useState([]);
  const [showsubscore, setshowsubscore] = useState([]);
  const [showkinder, setshowkinder] = useState([]);
  const [showclassstu, setshowclassstu] = useState([]);
  const [showstu, setshowstu] = useState([]);
  const [showyearterm, setyearterm] = useState([]);
  const thSarabunPSKStyle = {
    fontFamily: "TH SarabunPSK, sans-serif",
  };

  const loadsubreport = () => {
    dispatch(showstusubreport({ substuId }))
      .then((result) => {
        setshowsubre(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadsubject = () => {
    dispatch(showsubject())
      .then((result) => {
        setshowsubname(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadsubscore = () => {
    dispatch(showstusubscore())
      .then((result) => {
        setshowsubscore(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadkinder = () => {
    dispatch(showkinroom())
      .then((result) => {
        setshowkinder(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadyearterm = () => {
    dispatch(getDataAll())
      .then((result) => {
        setyearterm(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadclass = () => {
    dispatch(showclass())
      .then((result) => {
        setshowclassstu(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadstudent = () => {
    dispatch(showstudent())
      .then((result) => {
        setshowstu(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const findId = showclassstu?.find((c) => c.stu_id === substuId);
  const showyeart = showyearterm?.find(
    (y) => y?.yearTerm_id === findId?.yearterm_id
  );
  const showkinr = showkinder?.find((k) => k?.kinder_id === findId?.kinder_id);
  const showdata = `ภาคเรียนที่ ${showyeart?.term} ปีการศึกษา ${showyeart?.year} ชั้นอนุบาลปีที่ ${showkinr?.kinde_level}/${showkinr?.Kinder_room}`;

  const findStu = showstu?.find((s) => s?.stu_id === substuId);
  const namestu = `${findStu?.stu_Fname} ${findStu?.stu_Lname}`;
  const snstu = `${findStu?.stu_sn}`;

  useEffect(() => {
    loadsubreport();
    loadsubject();
    loadsubscore();
    loadkinder();
    loadyearterm();
    loadclass();
    loadstudent();
  }, []);

  return (
    <div className="report-container" style={{ ...thSarabunPSKStyle, textAlign: "center", fontSize: 17 }}>
      <img src="/images/logo.jpg" alt="Your Image Alt Text" />
      <br></br>
      <br></br>
      <p>รายงานผลการเรียน</p>
      <p>{showdata}</p>
      <p>โรงเรียนสุเหร่าคลองสิบ สำนักงานเขตหนองจอก กรุงเทพมหานคร</p>
      <div>
        <p>
          ชื่อ-สกุล {namestu} เลขประจำตัว {snstu}
        </p>
      </div>
      <table>
        <thead>
          <th>วิชา</th>
          <th>คะแนนเต็ม</th>
          <th>คะแนนที่ได้</th>
          <th>หมายเหตุ</th>
        </thead>
        <tbody>
          {showsubre?.map((data) => {
            const { subscore_id, subscore, stu_id, sub_id } = data;
            const showsubjectname = showsubname?.find(
              (data) => data?.sub_id === sub_id
            );

            return (
              <tr key={subscore_id}>
                <td>{showsubjectname?.sub_name}</td>
                <td>{showsubjectname?.fullscore}</td>
                <td>{subscore}</td>
                <td>ีะพีัะพัะพั</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br></br>
      <h5 style={{textAlign: "right", fontSize: 17}}>ลงชื่อ ครูประจำชั้น</h5>
      <h5 style={{textAlign: "right", fontSize: 17}}>( นางสาวศรีนวล ธรรมศาสตร์ )</h5>
      <h5 style={{textAlign: "right", fontSize: 17}}>ครู คศ.1</h5>
      <h5 style={{textAlign: "right", fontSize: 17}}>ลงชื่อ ผู้บริหาร</h5>
      <h5 style={{textAlign: "right", fontSize: 17}}>( นางวิภา โต๊ะเหม )</h5>
      <h5 style={{textAlign: "right", fontSize: 17}}>ผู้อำนวยการโรงเรียนสุเหร่าคลองสิบ</h5>
    </div>
  );
}

export default ShowreportSubject;
