import React, { useState, useEffect } from "react";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import { assessmentreport, findassessment } from "../slice/StudentSlice";
import { useDispatch } from "react-redux";
import {
  showkinroom,
  getDataAll,
  showclass,
  showstudent,
} from "../slice/DataSlice";

function PageReportLearning() {
  const dispatch = useDispatch();
  const assstuId = getFromLocalStorage("assreId");
  const [showasss, setshowasss] = useState([]);
  const [showasscore, setshowassscore] = useState([]);
  const [showkinder, setshowkinder] = useState([]);
  const [showclassstu, setshowclassstu] = useState([]);
  const [showstu, setshowstu] = useState([]);
  const [showyearterm, setyearterm] = useState([]);
  const thSarabunPSKStyle = {
    fontFamily: "TH SarabunPSK, sans-serif",
  };

  const assessmentre = () => {
    dispatch(findassessment({ assstuId }))
      .then((result) => {
        setshowasss(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const assessname = () => {
    dispatch(assessmentreport({ assstuId }))
      .then((result) => {
        setshowasss(result.payload);
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

  const findId = showclassstu?.find((c) => c?.stu_id === assstuId);
  const showyeart = showyearterm?.find(
    (y) => y?.yearTerm_id === findId?.yearterm_id
  );
  const showkinr = showkinder?.find((k) => k?.kinder_id === findId?.kinder_id);
  const showdata = `ภาคเรียนที่ ${showyeart?.term} ปีการศึกษา ${showyeart?.year} ชั้นอนุบาลปีที่ ${showkinr?.kinde_level}/${showkinr?.Kinder_room}`;

  const findStu = showstu?.find((s) => s?.stu_id === assstuId);
  const namestu = `${findStu?.stu_Fname} ${findStu?.stu_Lname}`;
  const snstu = `${findStu?.stu_sn}`;

  useEffect(() => {
    assessmentre();
    assessname();
    loadkinder();
    loadyearterm();
    loadclass();
    loadstudent();
  }, []);

  return (
    <div style={{ ...thSarabunPSKStyle, textAlign: "center", fontSize: 10 }}>
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
          <th>ชื่อประเมิน</th>
          <th>คะแนนเต็ม</th>
          <th>คะแนนที่ได้</th>
          <th>หมายเหตุ</th>
        </thead>
        <tbody>

        </tbody>
      </table>
      <div>
        <h5 style={{ ...thSarabunPSKStyle, textAlign: "right" }}>
          ลงชื่อ ครูประจำชั้น
        </h5>
        <h5 style={{ ...thSarabunPSKStyle, textAlign: "right" }}>
          ( นางสาวศรีนวล ธรรมศาสตร์ )
        </h5>
        <h5 style={{ ...thSarabunPSKStyle, textAlign: "right" }}>ครู คศ.1</h5>
        <h5 style={{ ...thSarabunPSKStyle, textAlign: "right" }}>
          ลงชื่อ ผู้บริหาร
        </h5>
        <h5 style={{ ...thSarabunPSKStyle, textAlign: "right" }}>
          ( นางวิภา โต๊ะเหม )
        </h5>
        <h5 style={{ ...thSarabunPSKStyle, textAlign: "right" }}>
          ผู้อำนวยการโรงเรียนสุเหร่าคลองสิบ
        </h5>
      </div>
    </div>
  );
}

export default PageReportLearning;
