import React, { useState, useEffect } from "react";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import { assessmentreport, findassessment } from "../slice/StudentSlice";
import { saveToLocalStorage } from "../LocalStorage/localstorage";
import { useDispatch } from "react-redux";
import { showstudent } from "../slice/DataSlice";

function PageReportLearning() {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [showasss, setshowasss] = useState([]);
  const thSarabunPSKStyle = {
    fontFamily: "TH SarabunPSK, sans-serif",
  };
  const assstuId = getFromLocalStorage("restuId");

  saveToLocalStorage("restuId", null);
  const onClick = (id) => {
    saveToLocalStorage("restuId", id);
  };

  const assessmentreport = () => {
    dispatch(findassessment({ assstuId }))
      .then((result) => {
        setshowasss(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const yeartermid = getFromLocalStorage("restuId");
  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    dispatch(showstudent())
      .then((result) => {
        setshowdata(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ ...thSarabunPSKStyle, textAlign: "center", fontSize: 10 }}>
      {showdata?.map((data) => {
        const { stu_id, stu_Fname, stu_Lname } = data;
      })}
      <img src="/images/logo.jpg" alt="Your Image Alt Text" />
      <br></br>
      <br></br>
      <h5>รายงานประเมินพัฒนาการ 5 ด้าน</h5>
      <h5>ภาคเรียนที่ {yeartermid} ปีการศึกษา 2565 ชั้นอนุบาลปีที่ 2</h5>
      <h5>โรงเรียนสุเหร่าคลองสิบ สำนักงานเขตหนองจอก กรุงเทพมหานคร</h5>
      <h5>
        ชื่อ-สกุล.....................................เลขประจำตัว............................
      </h5>
      <br></br>
      <table>
        <tbody>
          <tr>
            <td>วิชา</td>
            <td>คะแนนเต็ม</td>
            <td>คะแนนที่ได้</td>
            <td>หมายเหตุ</td>
          </tr>
          <tr>
            <td>การเคลื่อนไหว</td>
            <td>10</td>
            <td>Row 2, Column 3</td>
            <td></td>
          </tr>
          <tr>
            <td>เสริมประสบการณ์</td>
            <td>10</td>
            <td>Row 3, Column 3</td>
            <td></td>
          </tr>
          <tr>
            <td>กิจกรรมเสรี</td>
            <td>10</td>
            <td>Row 4, Column 3</td>
            <td></td>
          </tr>
          <tr>
            <td>กิจกรรมศิลปะ</td>
            <td>10</td>
            <td>Row 5, Column 3</td>
            <td></td>
          </tr>
          <tr>
            <td>กิจกรรมกลางแจ้ง</td>
            <td>10</td>
            <td>Row 6, Column 3</td>
            <td></td>
          </tr>
          <tr>
            <td>คะแนนรวม</td>
            <td>50</td>
            <td>Row 7, Column 3</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <br></br>
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
