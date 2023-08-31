import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../LocalStorage/localstorage";
import { showtest, finishedtest } from "../slice/StudentSlice";
import { Outlet, Link } from "react-router-dom";

function Test() {
  const dispatch = useDispatch();
  const [test, setTest] = useState([]);
  const [finished, setFinished] = useState([]);
  const [checked, setChecked] = useState(true); // Renamed to setChecked
  const auth = getFromLocalStorage("auth");
  const stuid = auth.stu_id;

  saveToLocalStorage("testId", null);
  const onClick = (id) => {
    saveToLocalStorage("testId", id);
  };

  const loadData = () => {
    dispatch(showtest({ stuid }))
      .then((result) => {
        setTest(result.payload);
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
        // console.log(message);
        if (message === "No available tests for the student") {
          setChecked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(checked);

  useEffect(() => {
    loadData();
    loadFinished();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ชื่อแบบทดสอบ</th>
            <th>ทำแบบทดสอบ</th>
          </tr>
        </thead>
        <tbody>
          {checked
            ? finished.map((data) => {
                const { test_detail, test_id } = data;
                return (
                  <tr key={test_id}>
                    <td>{test_detail}</td>
                    <td>
                      <Link
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
          {test.map((data) => {
            const { test_detail, test_id } = data;
            return (
              <tr key={test_id}>
                <td>{test_detail}</td>
                <td>
                  <Link
                    to="/student/startTest"
                    onClick={() => onClick(test_id)}
                  >
                    เริ่มทำแบบทดสอบ
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Outlet />
    </div>
  );
}

export default Test;
