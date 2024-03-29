import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../LocalStorage/localstorage";
import { showtest, finishedtest } from "../slice/SearchDataSlice";
import { Outlet, Link } from "react-router-dom";
import "../assets/css/table.css";

function Test() {
  const dispatch = useDispatch();
  const [showTests, setShowTests] = useState([]); // Rename to showTests
  const [finished, setFinished] = useState([]);
  const [checked, setChecked] = useState(true);
  const [checktest, setCheckTest] = useState(true); // Rename to setCheckTest
  const auth = getFromLocalStorage("stu_auth");
  const stuid = auth.stu_id;

  saveToLocalStorage("testId", null);
  const onClick = (id) => {
    saveToLocalStorage("testId", id);
  };

  const loadData = () => {
    dispatch(showtest({ stuid }))
      .then((result) => {
        setShowTests(result.payload); // Updated variable name
        const message = result.payload.message;
        if (message === "Not found") {
          setCheckTest(false); // Updated variable name
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadFinished = () => {
    dispatch(finishedtest({ stuid }))
      .then((result) => {
        setFinished(result.payload);
        const message = result.payload.message;
        if (message === "Not found") {
          setChecked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
    loadFinished();
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
      <table>
        <thead>
          <tr>
            <th>ชื่อแบบทดสอบ</th>
            <th>ทำแบบทดสอบ</th>
          </tr>
        </thead>
        <tbody>
          {checked
            ? finished?.map((data) => {
                const { test_detail, test_id } = data;
                return (
                  <tr key={test_id}>
                    <td>{test_detail}</td>
                    <td>
                      <Link
                        className="linkshow"
                        to="/student/showTestResult"
                        onClick={() => onClick(test_id)}
                      >
                        ดูคะแนนแบบทดสอบ
                      </Link>
                    </td>
                  </tr>
                );
              })
            : null}
          {checktest
            ? Array.isArray(showTests) &&
              showTests.map((data) => {
                const { test_detail, test_id } = data;
                return (
                  <tr key={test_id}>
                    <td>{test_detail}</td>
                    <td>
                      <Link
                        className="linkshow"
                        to="/student/clickfortest"
                        onClick={() => onClick(test_id)}
                      >
                        เริ่มทำแบบทดสอบ
                      </Link>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      <Outlet />
    </div>
  );
}

export default Test;
