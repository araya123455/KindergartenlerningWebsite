import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import {
  showquestion,
  showtest,
  testedresult,
  selectedtest,
  testresultdetail,
  finishedtest,
} from "../slice/StudentSlice";
import { Outlet, Link } from "react-router-dom";

function ShowTestResult() {
  const dispatch = useDispatch();
  const [finished, setfinished] = useState([])
  const auth = getFromLocalStorage("auth");
  const stuid = auth.stu_id;

  const loadFinished = () =>{
    dispatch(finishedtest({ stuid }))
      .then((result) => {
        setfinished(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div>
        <h2>Test Results</h2>
      </div>
    </>
  );
}

export default ShowTestResult;
