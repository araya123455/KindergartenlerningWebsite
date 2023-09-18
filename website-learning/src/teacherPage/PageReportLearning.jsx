import React from "react";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import { assessmentreport } from "../slice/StudentSlice";
import { saveToLocalStorage } from "../LocalStorage/localstorage";

function PageReportLearning() {
  const thSarabunPSKStyle = {
    fontFamily: "TH SarabunPSK, sans-serif",
  };

  saveToLocalStorage("restuId", null);
  const onClick = (id) => {
    saveToLocalStorage("restuId", id);
  };

  const assessmentreport = () => {
    dispatch(findassessment({ assstuId }))
      .then((result) => {
        setshowaeesedata(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const yeartermid = getFromLocalStorage("restuId");
  return (
    <div style={{ textAlign: "center" }}>
      <img src="/images/logo.jpg" alt="Your Image Alt Text" />
      <br></br>
      <h5>รายงานประเมินพัฒนาการ 5 ด้าน</h5>
      <h5>ภาคเรียนที่ 1 ปีการศึกษา 2565 ชั้นอนุบาลปีที่ 2</h5>
      <h5>โรงเรียนสุเหร่าคลองสิบ สำนักงานเขตหนองจอก กรุงเทพมหานคร</h5>
      <h5>
        ชื่อ-สกุล......................................เลขประจำตัว............................
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
            <td>Row 2, Column 2</td>
            <td>Row 2, Column 3</td>
            <td>Row 2, Column 4</td>
          </tr>
          <tr>
            <td>เสริมประสบการณ์</td>
            <td>Row 3, Column 2</td>
            <td>Row 3, Column 3</td>
            <td>Row 3, Column 4</td>
          </tr>
          <tr>
            <td>กิจกรรมเสรี</td>
            <td>Row 4, Column 2</td>
            <td>Row 4, Column 3</td>
            <td>Row 4, Column 4</td>
          </tr>
          <tr>
            <td>กิจกรรมศิลปะ</td>
            <td>Row 5, Column 2</td>
            <td>Row 5, Column 3</td>
            <td>Row 5, Column 4</td>
          </tr>
          <tr>
            <td>กิจกรรมกลางแจ้ง</td>
            <td>Row 6, Column 2</td>
            <td>Row 6, Column 3</td>
            <td>Row 6, Column 4</td>
          </tr>
          <tr>
            <td>คะแนนรวม</td>
            <td>Row 7, Column 2</td>
            <td>Row 7, Column 3</td>
            <td>Row 7, Column 4</td>
          </tr>
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
