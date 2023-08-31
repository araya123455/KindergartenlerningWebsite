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

  const handleSearch = () => {
    filterData();
  };

  useEffect(() => {
    dispatch(fetchTeacherData());
    dispatch(fetchStudentData());
  }, [dispatch]);

  const filterData = () => {
    // Filter teacher results
    const filteredTeachers = teacherData?.filter((teacher) =>
      teacher.tch_sn.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTeacherResults(filteredTeachers);

    // Filter student results
    const filteredStudents = studentData?.filter((student) =>
      student.stu_sn.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setStudentResults(filteredStudents);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for teachers and students..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Search button */}
      <button onClick={handleSearch}>Search</button>

      {/* Display teacher search results */}
      <ul className="student-results">
        {teacherResults?.map((teacher) => (
          <li key={teacher.tch_id} className="student-item">
            <h2>Teacher Results:</h2>
            <div>Teacher sn: {teacher.tch_sn}</div>
            <div>Prefix: {teacher.prefix}</div>
            <div>Name: {teacher.tch_Fname} {teacher.tch_Lname}</div>
            <div>Username: {teacher.tch_tch_user}</div>
            <div>Status {teacher.status}</div>
            <div>Sect: {teacher.sect}</div>
          </li>

        ))}
      </ul>

      {/* Display student search results */}
      <ul className="student-results">
        {studentResults?.map((student) => (
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
        ))}
      </ul>
    </div>
  );
}

export default Search;
