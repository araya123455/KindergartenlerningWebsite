import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import "../assets/css/tableinsert.css";
import { Link } from "react-router-dom";
import { showstudent } from "../slice/DataSlice";

function ReportLearning() {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
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
    <>
      <table>
        <thead>
          <tr>
            <th>คำนำหน้า</th>
            <th>ชื่อ</th>
            <th>นามสกุล</th>
            <th>รหัสประจำตัว</th>
            <th>สถานะ</th>
            <th>Confix</th>
          </tr>
        </thead>
        <tbody>
          {showdata?.map((data) => {
            const { stu_id, prefix, stu_Fname, stu_Lname, stu_sn, status } =
              data;
            return (
              <tr key={stu_id}>
                <td>{prefix}</td>
                <td>{stu_Fname}</td>
                <td>{stu_Lname}</td>
                <td>{stu_sn}</td>
                <td>{status}</td>
                <td>
                <Link
                    className="assclass"
                    to={"/PageReportLearning"}
                    onClick={() => onClickF(stu_id)}
                  >
                    Report
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default ReportLearning;
