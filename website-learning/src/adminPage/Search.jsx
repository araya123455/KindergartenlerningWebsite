import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentData, fetchTeacherData } from "../slice/TchStuSlice";

function Search() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [teacherResults, setTeacherResults] = useState([]);
  const [studentResults, setStudentResults] = useState([]);

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

  useEffect(() => {
    dispatch(fetchTeacherData());
    dispatch(fetchStudentData());
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
      <button className="buttnN buttonN" onClick={handleSearch}>Search</button>
      {/* Display teacher search results */}
      <ul className="student-results">
        {teacherResults.length > 0
          ? teacherResults?.map((teacher) => (
              <li key={teacher.tch_id} className="student-item">
                <h2>Teacher Results:</h2>
                <div>Teacher sn: {teacher.tch_sn}</div>
                <div>Prefix: {teacher.prefix}</div>
                <div>
                  Name: {teacher.tch_Fname} {teacher.tch_Lname}
                </div>
                <div>Username: {teacher.tch_user}</div>
                <div>Status {teacher.status}</div>
                <div>Sect: {teacher.tch_sect}</div>
              </li>
            ))
          : null}
      </ul>

      {/* Display student search results */}
      <ul className="student-results">
        {studentResults.length > 0
          ? studentResults?.map((student) => (
              <li key={student.stu_id} className="student-item">
                <h2>Student Results:</h2>
                <div>Student Sn: {student.stu_sn}</div>
                <div>Prefix: {student.prefix}</div>
                <div>
                  Name: {student.stu_Fname} {student.stu_Lname}
                </div>
                <div>Username: {student.stu_user}</div>
                <div>Status: {student.status}</div>
              </li>
            ))
          : null}
      </ul>

      {/* Display "not found" message */}
      {showstr === "not found" && (
        <p>No results found</p>
      )}
    </div>
  );
}

export default Search;
