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
      setStudentResults("");
      return;
    }
    filterData();
  };

  useEffect(() => {
    dispatch(fetchStudentData());
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
    </div>
  );
}

export default TeaSearch;
