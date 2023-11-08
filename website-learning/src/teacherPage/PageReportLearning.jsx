import React, { useState, useEffect } from "react";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import { assessmentreport, searchteacher } from "../slice/SearchDataSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  showkinroom,
  getDataAll,
  showclass,
  showstudent,
  showassessment,
  showteacherposi,
  searchdirector,
} from "../slice/DataSlice";
import "../assets/css/PrintStyles.css";
import { Link } from "react-router-dom";

function PageReportLearning() {
  const dispatch = useDispatch();
  const assstuId = getFromLocalStorage("assreId");
  const [showasss, setshowasss] = useState([]);
  const [showassname, setshowassname] = useState([]);
  const [showtch, setshowtch] = useState([]);
  const [showkinder, setshowkinder] = useState([]);
  const [showclassstu, setshowclassstu] = useState([]);
  const [showstu, setshowstu] = useState([]);
  const [showposition, setshowposition] = useState([]);
  const [schdirector, setschderector] = useState([]);
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

  const loadTeacher = () => {
    dispatch(searchteacher({ assstuId }))
      .then((result) => {
        setshowtch(result.payload);
        // console.log(result)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadSchDerector = () => {
    dispatch(searchdirector())
      .then((result) => {
        setschderector(result.payload);
        console.log(schdirector[0]?.position_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadteacherposition = () => {
    dispatch(showteacherposi())
      .then((result) => {
        setshowposition(result.payload);
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

  const teachername = `${showtch[0]?.prefix} ${showtch[0]?.tch_Fname} ${showtch[0]?.tch_Lname}`;
  const teachersect = showtch[0]?.tch_sect;
  const posi = showposition?.find(
    (p) => p?.position_id === showtch[0]?.position_id
  );
  const directorname = `${schdirector[0]?.prefix} ${schdirector[0]?.tch_Fname} ${schdirector[0]?.tch_Lname}`;

  useEffect(() => {
    assessmentre();
    loadTeacher();
    loadteacherposition();
    loadSchDerector();
    assessname();
    loadkinder();
    loadyearterm();
    loadclass();
    loadstudent();
  }, []);

  

  return (
    <div>
       <button className="btn-back btn-hidden" role="button">
        <Link to={"/teacher/ReportLearning"} className="back-font">
          <svg
            viewBox="0 0 96 96"
            height="15px"
            id="Layer_1"
            version="1.2"
            width="15px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z"
              fill="#ffffff"
            />
          </svg>
          ย้อนกลับ
        </Link>
      </button>
      {showasss.length > 0 ? (
        <div
          className="report-container"
          style={{ ...thSarabunPSKStyle, textAlign: "center", fontSize: 15 }}
        >
          <img src="/images/logo.jpg" alt="Your Image Alt Text" />

          <br></br>
          <br></br>
          <p className="f-fam">รายงานพัฒนาการ 5 ด้าน</p>
          <p className="f-fam">{showdata}</p>
          <p className="f-fam">โรงเรียนสุเหร่าคลองสิบ สำนักงานเขตหนองจอก กรุงเทพมหานคร</p>
          <div>
            <p className="f-fam">
              ชื่อ-สกุล {namestu} เลขประจำตัว {snstu}
            </p>
          </div>
          <table className="tablee">
            <thead>
              <tr>
                <th className="th-font" style={{ fontSize: 15 }}>วิชา</th>
                <th className="th-font" style={{ fontSize: 15 }}>คะแนนเต็ม</th>
                <th className="th-font" style={{ fontSize: 15 }}>คะแนนที่ได้</th>
                <th className="th-font" style={{ fontSize: 15 }}>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {showasss?.map((data) => {
                const { assesSc_id, asses_score, stu_id, asses_id } = data;
                const showassessmentname = showassname?.find(
                  (data) => data?.asses_id === asses_id
                );
                const fullScore = showassessmentname?.full_score || 0; // Use a fallback value of 0 if full_score is undefined or NaN
                const assesScore = isNaN(asses_score) ? 0 : asses_score; // Use a fallback value of 0 if asses_score is NaN

                full += fullScore;
                total += assesScore;

                return (
                  <tr key={assesSc_id}>
                    <td style={{ fontSize: 17 }}>
                      {showassessmentname?.assess_name}
                    </td>
                    <td style={{ fontSize: 17 }}>{fullScore}</td>
                    <td style={{ fontSize: 17 }}>{assesScore}</td>
                    <td></td>
                  </tr>
                );
              })}
              <tr>
                <td>คะแนนเต็ม</td>
                <td>{full}</td>
                <td>{total}</td>
                <td></td>
              </tr>
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
            <div style={{ display: "flex", alignItems: "center" }}>
                <h5
                  className="f-fam"
                  style={{ fontSize: 15, marginRight: "110px" }}
                >
                  ลงชื่อ
                </h5>
                <h5 className="f-fam" style={{ fontSize: 15 }}>
                  ครูประจำชั้น
                </h5>
              </div>
              <h5 className="f-fam" style={{ fontSize: 15 }}>( {teachername} )</h5>
              <h5 className="f-fam" style={{ fontSize: 15 }}>
                {teachersect} {posi?.position}
              </h5>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h5
                  className="f-fam"
                  style={{ fontSize: 15, marginRight: "110px" }}
                >
                  ลงชื่อ
                </h5>
                <h5 className="f-fam" style={{ fontSize: 15 }}>
                  ผู้อำนวยการ
                </h5>
              </div>
              <h5 className="f-fam" style={{ fontSize: 15 }}>( {directorname} )</h5>
              <h5 className="f-fam" style={{ fontSize: 15 }}>
                ผู้อำนวยการโรงเรียนสุเหร่าคลองสิบ
              </h5>
            </div>
          </div>
          <button className="buttonN buttnN btn-hidden" onClick={print}>
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
        