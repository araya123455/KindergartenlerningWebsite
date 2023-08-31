import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getFromLocalStorage,
} from "../LocalStorage/localstorage";
import { showtest, testresult, testresultdetail } from "../slice/StudentSlice";
import { Outlet, Link } from "react-router-dom";

function CheckScore() {
  const dispatch = useDispatch();
  const [test, setTest] = useState([]);
  const [check, setCheck] = useState(true); // Set default value to true
  const [showteRe, setShowteRe] = useState([]);
  const auth = getFromLocalStorage("auth");
  const stuid = auth.stu_id;
  return (
    <div>CheckScore</div>
  )
}

export default CheckScore