import React, { useState, useEffect } from "react";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import { assessmentreport, findassessment } from "../slice/StudentSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  showkinroom,
  getDataAll,
  showclass,
  showstudent,
  showassessment,
} from "../slice/DataSlice";
import "../assets/css/PrintStyles.css";

function PageReportLearning() {
  const dispatch = useDispatch();
  const assstuId = getFromLocalStorage("assreId");
  const [showasss, setshowasss] = useState([]);
  const [showassname, setshowassname] = useState([]);
  const [showkinder, setshowkinder] = useState([]);
  const [showclassstu, setshowclassstu] = useState([]);
  const [showstu, setshowstu] = useState([]);
  const [showyearterm, setyearterm] = useState([]);
  var full = 0,
    total = 0;
  const thSarabunPSKStyle = {
    fontFamily: "TH SarabunPSK, sans-serif",
  };
  const print = () => window.print();
  // console.log(assstuId);
  const assessmentre = () => {
    dispatch(assessmentreport({ assstuId }))
      .then((result) => {
        setshowasss(result.payload);
        // console.log(result.payload)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const assessname = () => {
    dispatch(showassessment({ assstuId }))
      .then((result) => {
        setshowassname(result.payload);
        // console.log(result.payload)
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

  const handlePrint = () => {
    window.print();
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
    <div>
      {showasss.length > 0 ? (
        <div
          className="report-container"
          style={{ ...thSarabunPSKStyle, textAlign: "center", fontSize: 15 }}
        >
          <img src="/images/logo.jpg" alt="Your Image Alt Text" />

          <br></br>
          <br></br>
          <p>รายงานพัฒนาการ 5 ด้าน</p>
          <p>{showdata}</p>
          <p>โรงเรียนสุเหร่าคลองสิบ สำนักงานเขตหนองจอก กรุงเทพมหานคร</p>
          <div>
            <p>
              ชื่อ-สกุล {namestu} เลขประจำตัว {snstu}
            </p>
          </div>
          <table>
            <thead>
              <tr>
                <th style={{ fontSize: 15 }}>วิชา</th>
                <th style={{ fontSize: 15 }}>คะแนนเต็ม</th>
                <th style={{ fontSize: 15 }}>คะแนนที่ได้</th>
                <th style={{ fontSize: 15 }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {showasss?.map((data) => {
                const { assesSc_id, asses_score, stu_id, asses_id } = data;
                // console.log(assess_score);
                const showassessmentname = showassname?.find(
                  (data) => data?.asses_id === asses_id
                );
                full += showassessmentname?.full_score;
                total += asses_score;

                return (
                  <tr key={assesSc_id}>
                    <td style={{ fontSize: 17 }}>
                      {showassessmentname?.assess_name}
                    </td>
                    <td style={{ fontSize: 17 }}>
                      {showassessmentname?.full_score}
                    </td>
                    <td style={{ fontSize: 17 }}>{asses_score}</td>
                    <td></td>
                  </tr>
                );
              })}
                <td>คะแนนเต็ม</td>
                <td>{full}</td>
                <td>{total}</td>
            </tbody>
          </table>
          <br></br>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <div>
              <h5 style={{ fontSize: 15 }}>
                ลงชื่อ{" "}
                <img
                  src="srinual.png"
                  alt="your_image"
                  style={{ width: "60px", height: "65x" }}
                />{" "}
                ครูประจำชั้น
              </h5>
              <h5 style={{ fontSize: 15 }}>( นางสาวศรีนวล ธรรมศาสตร์ )</h5>
              <h5 style={{ fontSize: 15 }}>ครู คศ.1</h5>
              <h5 style={{ fontSize: 15 }}>
                ลงชื่อ{" "}
                <img
                  src="vipa.png"
                  alt="your_image"
                  style={{ width: "60px", height: "50x" }}
                />{" "}
                ผู้บริหาร
              </h5>
              <h5 style={{ fontSize: 15 }}>( นางวิภา โต๊ะเหม )</h5>
              <h5 style={{ fontSize: 15 }}>
                ผู้อำนวยการโรงเรียนสุเหร่าคลองสิบ
              </h5>
            </div>
          </div>
          <button className="printButton" onClick={print}>
            Print doc
          </button>
        </div>
      ) : (
        <h2>***คะแนนของนักเรียนยังไม่ถูกบันทึก ไม่สามารถออกรายงานได้***</h2>
      )}
    </div>
  );
}

export default PageReportLearning;
