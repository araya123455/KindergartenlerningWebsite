import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentData, fetchTeacherData } from "../slice/TchStuSlice";
import { showteacherposi } from "../slice/DataSlice";
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

  useEffect(() => {
    dispatch(fetchTeacherData());
    dispatch(fetchStudentData());
    loadteacherposition();
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
                // console.log(posi.position);
                return (
                  <li key={teacher?.tch_id} className="student-item">
                    <h2 className="font-mail">ข้อมูลครู</h2>
                    <p className="font-mail s-re">
                      เลขประจำตัว: {teacher?.tch_sn}
                    </p>
                    <p className="font-mail s-re">
                      คำนำหน้า: {teacher?.prefix}
                    </p>
                    <p className="font-mail s-re">
                      ชื่อ-นามสกุล: {teacher?.tch_Fname} {teacher?.tch_Lname}
                    </p>
                    <p className="font-mail s-re">
                      Username: {teacher?.tch_user}
                    </p>
                    <p className="font-mail s-re">สถานะ: {teacher?.status}</p>
                    <p className="font-mail s-re">แผนก: {teacher?.tch_sect}</p>
                    <p className="font-mail s-re">ตำแหน่ง: {posi?.position}</p>
                  </li>
                );
              })
            : null}
        </ul>

        {/* Display student search results */}
        <ul className="student-results ">
          {studentResults.length > 0
            ? studentResults?.map((student) => (
                <li key={student.stu_id} className="student-item">
                  <h2 className="font-mail">ข้อมูลนักเรียน</h2>
                  <p className="font-mail s-re">
                    เลขประจำตัว: {student.stu_sn}
                  </p>
                  <p className="font-mail s-re">คำนำหน้า: {student.prefix}</p>
                  <p className="font-mail s-re">
                    ชื่อ-นามสกุล: {student.stu_Fname} {student.stu_Lname}
                  </p>
                  <p className="font-mail s-re">Username: {student.stu_user}</p>
                  <p className="font-mail s-re">สถานะ: {student.status}</p>
                </li>
              ))
            : null}
        </ul>
      </div>
      {/* Display "not found" message */}
      {showstr === "not found" && <p>No results found</p>}
    </div>
  );
}

export default Search;
