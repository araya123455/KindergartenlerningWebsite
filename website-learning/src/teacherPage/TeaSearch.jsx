import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentData } from "../slice/TchStuSlice";

function TeaSearch() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [studentResults, setStudentResults] = useState([]);
  const [check, setcheck] = useState(false);
  const studentData = useSelector((state) => state.data.studentData);

  const handleSearch = () => {
    filterData();
  };

  useEffect(() => {
    dispatch(fetchStudentData());
  }, [dispatch]);

  const filterData = () => {
    // Filter student results
    const filteredStudents = studentData?.filter((student) =>
      student.stu_sn.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (!filteredStudents) {
      setcheck(true);
      console.log("123");
    }
    console.log(filteredStudents);

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

      {/* Search button */}
      <button onClick={handleSearch}>Search</button>

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

export default TeaSearch;
