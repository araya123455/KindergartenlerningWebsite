import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../LocalStorage/localstorage";
import { showtest, testresult, testresultdetail } from "../slice/StudentSlice";
import { Outlet, Link } from "react-router-dom";

function Test() {
  const dispatch = useDispatch();
  const [test, setTest] = useState([]);
  const auth = getFromLocalStorage("auth");
  const [check, setCheck] = useState(true); // Set default value to true
  const [showteRe, setShowteRe] = useState([]);
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

  useEffect(() => {
    loadData();
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
