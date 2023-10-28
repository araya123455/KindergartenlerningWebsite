import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentData } from "../slice/TchStuSlice";
import {
  showsubject,
  showclass,
  showkinroom,
  getDataAll,
} from "../slice/DataSlice";

function TeaSearch() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [studentResults, setStudentResults] = useState([]);
  const studentData = useSelector((state) => state.data.studentData);
  const [stuclass, setstuclass] = useState([]);
  const [showkinder, setShowKinder] = useState([]);
  const [showyear, setShowYear] = useState([]);

  const handleSearch = () => {
    if (!searchQuery) {
      alert("Please input data first"); // Display an alert message
      setStudentResults("");
      return;
    }
    filterData();
  };

  const loadClass = () => {
    dispatch(showclass())
      .then((result) => {
        setstuclass(result.payload);
        // console.log(result);
        // console.log(showclass[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  useEffect(() => {
    dispatch(fetchStudentData());
    loadClass();
    loadKinder();
    loadYearTerm();
  }, [dispatch]);

  const filterData = () => {
    // Filter student results with an exact match on stu_sn
    const filteredStudents = studentData?.filter(
      (student) => student.stu_sn.toLowerCase() === searchQuery.toLowerCase()
    );
    setStudentResults(filteredStudents);
  };

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
      <h5>วิธีการ: ใช้รหัสประจำตัวนักเรียนเพื่อค้นหาเท่านั้น!</h5>
      <input
        type="text"
        placeholder="Search for students..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="buttnN buttonN" onClick={handleSearch}>
        Search
      </button>
      <div className="m-result">
        <ul className="student-results ">
          {studentResults.length > 0
            ? studentResults?.map((student) => {
                const clss = stuclass?.find(
                  (c) => c?.stu_id === student?.stu_id
                );
                const kinder = showkinder.find(
                  (kin) => kin.kinder_id === clss?.kinder_id
                );
                const kinderLevel = kinder ? kinder?.kinde_level : "";
                const kinderRoom = kinder ? kinder?.Kinder_room : "";
                // console.log(kinder);

                const yearTerm = showyear.find(
                  (term) => term.yearTerm_id === clss?.yearterm_id
                );
                const year = yearTerm ? yearTerm?.year : "";
                const term = yearTerm ? yearTerm?.term : "";
                // console.log(yearTerm);
                return (
                  <li key={student.stu_id} className="student-item">
                    <h2 className="font-mail">ข้อมูลนักเรียน</h2>
                    <p className="font-mail s-re">
                      เลขประจำตัว: {student.stu_sn}
                    </p>
                    <p className="font-mail s-re">คำนำหน้า: {student.prefix}</p>
                    <p className="font-mail s-re">
                      ชื่อ-นามสกุล: {student.stu_Fname} {student.stu_Lname}
                    </p>
                    <p className="font-mail s-re">
                      Username: {student.stu_user}
                    </p>
                    <p className="font-mail s-re">สถานะ: {student.status}</p>
                    <p className="font-mail s-re">สถานะ: {student.status}</p>
                    <p className="font-mail s-re">
                      ชั้น/ห้อง: {kinderLevel}/{kinderRoom}
                    </p>
                    <p className="font-mail s-re">
                      เทอม/ปีการศึกษา: {term}/{year}
                    </p>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
}

export default TeaSearch;
