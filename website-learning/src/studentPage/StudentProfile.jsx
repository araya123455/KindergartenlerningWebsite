import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import { showclass, showkinroom, getDataAll } from "../slice/DataSlice";

function StudentProfile() {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [showkinder, setShowKinder] = useState([]);
  const [showyear, setShowYear] = useState([]);
  const [showClass, setshowClass] = useState([]);
  const auth = getFromLocalStorage("auth");
  const [kinderInfo, setKinderInfo] = useState({});
  const [yearTermInfo, setYearTermInfo] = useState({});
  const [refreshed, setRefreshed] = useState(false); // State to track if refreshed

  const loadKinder = () => {
    dispatch(showkinroom())
      .then((result) => {
        setShowKinder(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadYearTerm = () => {
    dispatch(getDataAll())
      .then((result) => {
        setShowYear(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadClass = () => {
    dispatch(showclass())
      .then((result) => {
        console.log(result);
        // loadKinder();
        // loadYearTerm();
        setshowClass(result.payload);
        // Assuming showdata.stu_id is unique, filter the relevant class for the current student
       
        const studentClass = result.payload.filter(
          (classData) => classData.stu_id === showdata.stu_id
        );
        console.log(studentClass);

        // Use the kinder_id from studentClass to load kinder information
        const kinderId = studentClass[0].kinder_id; // Assuming only one class is returned
        const kinderInfo = showkinder.find((kin) => kin.kinder_id === kinderId);
        console.log(showkinder);
        // Use the yearterm_id from studentClass to load year term information
        const yearTermId = studentClass[0].yearterm_id; // Assuming only one class is returned
        const yearTermInfo = showyear.find(
          (term) => term.yearTerm_id === yearTermId
        );
        setKinderInfo(kinderInfo);
        setYearTermInfo(yearTermInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
 
  useEffect(() => {
    setshowdata(auth);
    // loadKinder();
    // loadYearTerm();
    // loadClass();
  }, []);
  // useInterval(() => {
  //   // console.log("OUT");
  //   if (!refreshed) {
  //     console.log("IN");
  //     // Load data and trigger automatic refresh only once
  //     loadKinder();
  //     loadYearTerm();
  //     loadClass();
  //     setRefreshed(true); // Mark as refreshed
  //   }
  // }, 100000000000);
  // Automatically refresh every 5 seconds
  // useInterval(() => {
  //   loadKinder();
  //   loadYearTerm();
  //   loadClass();
  // }, 400000);

  return (
    <>
      <div>
        <h2>Welcome, {showdata.stu_Fname}</h2>
        <div>
          <h3>
            {showdata.prefix} {showdata.stu_Fname} {showdata.stu_Lname}
          </h3>
          <p>เลขประจำตัว: {showdata.stu_sn}</p>
          <p>Username: {showdata.stu_user}</p>
          <p>Status: {showdata.status}</p>
          {/* Display kinder and year term information here */}
          <p>
            ระดับชั้น/ห้อง: {kinderInfo.kinde_level}/{kinderInfo.Kinder_room}
          </p>
          <p>
            ปีการศึกษา/เทอม: {yearTermInfo.year}/{yearTermInfo.term}
          </p>
        </div>
      </div>
    </>
  );
}

export default StudentProfile;
