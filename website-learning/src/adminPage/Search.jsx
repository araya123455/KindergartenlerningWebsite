import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentData, fetchTeacherData } from "../slice/AdminSearchSlice";
import {
  showteacherposi,
  showsyllabus,
  showclasstime,
  showsubject,
  showclass,
  showkinroom,
  getDataAll,
} from "../slice/DataSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

function Search() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [teacherResults, setTeacherResults] = useState([]);
  const [studentResults, setStudentResults] = useState([]);
  const [showposition, setshowposition] = useState([]);
  const teacherData = useSelector((state) => state.data.teacherData);
  const studentData = useSelector((state) => state.data.studentData);
  const [showstr, setShowstr] = useState(""); // Use state for showstr
  const [showsylla, setshowsylla] = useState([]);
  const [classtime, setclasstime] = useState([]);
  const [subject, setsubject] = useState([]);
  const [stuclass, setstuclass] = useState([]);
  const [showkinder, setShowKinder] = useState([]);
  const [showyear, setShowYear] = useState([]);

  const handleSearch = () => {
    if (!searchQuery) {
      alert("Please input data first"); // Display an alert message
      setStudentResults([]);
      setTeacherResults([]);
      setShowstr(""); // Set showstr to "not found"
      return;
    }
    filterData();
  };

  const loadteacherposition = () => {
    dispatch(showteacherposi())
      .then((result) => {
        setshowposition(result.payload);
        // console.log(showposition);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadSyllabus = () => {
    dispatch(showsyllabus())
      .then((result) => {
        setshowsylla(result.payload);
        // console.log(showsylla);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadSubject = () => {
    dispatch(showsubject())
      .then((result) => {
        setsubject(result.payload);
        // console.log(subject);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadClasstime = () => {
    dispatch(showclasstime())
      .then((result) => {
        setclasstime(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
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
    dispatch(fetchTeacherData());
    dispatch(fetchStudentData());
    loadteacherposition();
    loadSyllabus();
    loadClasstime();
    loadSubject();
    loadClass();
    loadKinder();
    loadYearTerm();
  }, [dispatch]);

  const filterData = () => {
    // Filter teacher results
    const filteredTeachers = teacherData?.filter(
      (teacher) => teacher.tch_sn.toLowerCase() === searchQuery.toLowerCase()
    );
    setTeacherResults(filteredTeachers);

    // Filter student results
    const filteredStudents = studentData?.filter(
      (student) => student.stu_sn.toLowerCase() === searchQuery.toLowerCase()
    );
    setStudentResults(filteredStudents);

    // Set showstr based on the results
    if (filteredTeachers.length === 0 && filteredStudents.length === 0) {
      setShowstr("not found");
    } else {
      setShowstr(""); // Reset showstr if results are found
    }
  };

  return (
    <div>
      <h5>วิธีการ: ใช้รหัสประจำตัวเพื่อค้นหาเท่านั้น!</h5>
      <input
        type="text"
        placeholder="Search for teachers and students..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Search button */}
      <button className="buttnN buttonN" onClick={handleSearch}>
        Search
      </button>
      {/* Display teacher search results */}
      <div className="m-result">
        <ul className="student-results">
          {teacherResults.length > 0
            ? teacherResults?.map((teacher) => {
                const posi = showposition?.find(
                  (p) => p?.position_id === teacher?.position_id
                );
                console.log(showposition);
                const ctime = classtime?.find(
                  (c) => c?.tch_id === teacher?.tch_id
                );
                const syllan = showsylla?.find(
                  (s) => s?.sylla_id === ctime?.sylla_id
                );
                const subjectsForTeacher = subject?.filter(
                  (s) => s?.sylla_id === syllan?.sylla_id
                );
                // console.log(subjectsForTeacher);

                return (
                  <li key={teacher?.tch_id} className="student-item">
                    <h2 className="font-mail">ข้อมูลครู</h2>
                    <p className="font-mail s-re">
                      เลขประจำตัว: {teacher?.tch_sn}
                    </p>
                    <p className="font-mail s-re">
                      ชื่อ-นามสกุล: {teacher?.prefix} {teacher?.tch_Fname}{" "}
                      {teacher?.tch_Lname}
                    </p>
                    <p className="font-mail s-re">
                      Username: {teacher?.tch_user}
                    </p>
                    <p className="font-mail s-re">สถานะ: {teacher?.status}</p>
                    <p className="font-mail s-re">แผนก: {teacher?.tch_sect}</p>
                    <p className="font-mail s-re">ตำแหน่ง: {posi?.position}</p>
                    <p className="font-mail s-re">{syllan?.sylla_name}</p>
                    {subjectsForTeacher.length > 0 && (
                      <p className="font-mail s-re">
                        วิชาที่สอน:{" "}
                        {subjectsForTeacher
                          ?.map((subject) => subject?.sub_name)
                          .join(", ")}
                      </p>
                    )}
                  </li>
                );
              })
            : null}
        </ul>
        {/* Display student search results */}
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
                    <p className="font-mail s-re">
                      ชื่อ-นามสกุล: {student.prefix} {student.stu_Fname}{" "}
                      {student.stu_Lname}
                    </p>
                    <p className="font-mail s-re">
                      Username: {student.stu_user}
                    </p>
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
      {/* Display "not found" message */}
      {showstr === "not found" && <p>No results found</p>}
    </div>
  );
}

export default Search;
