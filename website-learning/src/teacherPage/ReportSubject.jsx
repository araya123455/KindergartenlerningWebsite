import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { RemindFill } from "@rsuite/icons";
import "../assets/css/tableinsert.css";
import { showstudent } from "../slice/DataSlice";
import { saveToLocalStorage } from "../LocalStorage/localstorage";
import { Link } from "react-router-dom";

function ReportSubject() {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);

  const loadData = () => {
    dispatch(showstudent())
      .then((result) => {
        setshowdata(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  saveToLocalStorage("restuId", null);
  const onClick = (id) => {
    saveToLocalStorage("restuId", id);
  };

  useEffect(() => {
    loadData();
  }, []);

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
                    to={"showreportSubject"}
                    onClick={() => onClick(stu_id)}
                  >
                    แสดงรายงาน
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

export default ReportSubject;
