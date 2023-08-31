import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFromLocalStorage } from "../LocalStorage/localstorage";

function TeacherProfile() {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  // const tchUser = localStorage.getItem("tch_user"); // Get tch_user from localStorage
  const auth = getFromLocalStorage("auth");

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const result = await dispatch(showteacher());
  //       setshowdata(auth);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   loadData();
  // }, [dispatch]);
  useEffect(() => {
    setshowdata(auth);
    console.log(auth);
  }, []);
  return (
    <div className="teacher-cards">
      <h2>Welcome, {showdata?.tch_Fname || '-'}</h2>
      <div className="teacher-card">
        <h3>
          {showdata?.prefix || '-'} {showdata?.tch_Fname || '-'} {showdata?.tch_Lname|| '-'}
        </h3>
        <p>เลขประจำตัว: {showdata?.tch_sn || '-'}</p>
        <p>Username: {showdata?.tch_user || '-'}</p>
        <p>Status: {showdata?.status || '-'}</p>
        <p>แผนก: {showdata?.tch_sect || '-'}</p>
      </div>
    </div>
  );
}

export default TeacherProfile;
