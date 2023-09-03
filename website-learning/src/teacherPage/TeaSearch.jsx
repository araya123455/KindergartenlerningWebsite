import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentData } from "../slice/TchStuSlice";

function TeaSearch() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [studentResults, setStudentResults] = useState([]);
  const studentData = useSelector((state) => state.data.studentData);

  const handleSearch = () => {
    if (!searchQuery) {
      alert("Please input data first"); // Display an alert message
      setStudentResults("")
      return;
    }
    filterData();
  };

  useEffect(() => {
    dispatch(fetchStudentData());
  }, [dispatch]);

  const filterData = () => {
    // Filter student results with an exact match on stu_sn
    const filteredStudents = studentData?.filter((student) =>
      student.stu_sn.toLowerCase() === searchQuery.toLowerCase()
    );
    setStudentResults(filteredStudents);
  };
  
  return (
    <div>
      <h5>วิธีการ: ใช้รหัสประจำตัวนักเรียนเพื่อค้นหาเท่านั้น!</h5>
      <input
        type="text"
        placeholder="Search for students..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul className="student-results">
        {studentResults.length > 0 ? (
          studentResults.map((student) => (
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
        ) : (
          null
        )}
      </ul>
    </div>
  );
}

export default TeaSearch;
