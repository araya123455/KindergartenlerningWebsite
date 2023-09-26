import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import "../assets/css/attendance.css";
import { showkinroom, getDataAll, searchclasstime } from "../slice/DataSlice";
import { attendance, attendancedetailinsert } from "../slice/TeacherSlice";
import { studentattendance } from "../slice/StudentSlice";
import { Link } from "react-router-dom";

function StuAttendanceInsert() {
  const dispatch = useDispatch();
  const crtId = getFromLocalStorage("crtId");
  const [showstu, setshowstu] = useState([]);
  const [showatten, setshowatten] = useState([]);
  const [statusRecords, setStatusRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showkinder, setShowKinder] = useState([]);
  const [showyear, setShowYear] = useState([]);
  const [showSearch, setshowsearch] = useState([]);

  const loadstudent = () => {
    dispatch(studentattendance({ crtId }))
      .then((result) => {
        setshowstu(result.payload);
        // Initialize statusRecords array with default values for each student.
        setStatusRecords(
          result.payload.map((student) => ({
            stu_id: student.stu_id,
            attd_id: "",
            date: "",
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadattendance = () => {
    dispatch(attendance())
      .then((result) => {
        setshowatten(result.payload);
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

  const loadSearch = () => {
    dispatch(searchclasstime())
      .then((result) => {
        setshowsearch(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStatusChange = (index, attd_id) => {
    // Update the statusRecords array with the selected status for the specific student.
    setStatusRecords((prevStatusRecords) => {
      const updatedStatusRecords = [...prevStatusRecords];
      updatedStatusRecords[index] = {
        ...updatedStatusRecords[index],
        attd_id: attd_id,
        date: selectedDate.toISOString().split("T")[0],
      };
      return updatedStatusRecords;
    });
  };

  const onInsert = () => {
    // Iterate through statusRecords and send each attendance record to the server.
    Promise.all(
      statusRecords.map((record) => {
        const { date, stu_id, attd_id } = record;
        if (date && stu_id && attd_id) {
          const body = { date, stu_id, attd_id };
          return dispatch(attendancedetailinsert(body));
        }
        return Promise.resolve(); // Skip invalid records
      })
    )
      .then(() => {
        toast.success("Attendance records inserted successfully");
        // Clear the status and date for each student individually
        setStatusRecords((prevStatusRecords) => {
          const updatedStatusRecords = prevStatusRecords.map((record) => ({
            ...record,
            attd_id: "",
            date: "",
          }));
          return updatedStatusRecords;
        });
        setSelectedDate(new Date()); // Reset the date
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to insert attendance records");
      });
  };

  const crt_Id = showSearch.find((data) => data?.crt_id === crtId);
  const yearTerm_id = crt_Id ? crt_Id.yearterm_id : "";
  const yearTerm = showyear.find((data) => data.yearTerm_id === yearTerm_id);
  const getyear = yearTerm ? yearTerm?.year : "";
  const getterm = yearTerm ? yearTerm?.term : "";
  const kinroom_id = crt_Id ? crt_Id?.kinder_id : "";
  const kinroom = showkinder?.find((data) => data?.kinder_id === kinroom_id);
  const getkin = kinroom ? kinroom?.kinde_level : "";
  const getroom = kinroom ? kinroom?.Kinder_room : "";

  useEffect(() => {
    loadstudent();
    loadattendance();
    loadSearch();
    loadKinder();
    loadYearTerm();
  }, []);

  return (
    <div>
      <Link to={"/attendance"}>
        <svg
          baseProfile="tiny"
          height="24px"
          id="Layer_1"
          version="1.2"
          viewBox="0 0 24 24"
          width="24px"
        >
          <g>
            <path d="M19.164,19.547c-1.641-2.5-3.669-3.285-6.164-3.484v1.437c0,0.534-0.208,1.036-0.586,1.414   c-0.756,0.756-2.077,0.751-2.823,0.005l-6.293-6.207C3.107,12.523,3,12.268,3,11.999s0.107-0.524,0.298-0.712l6.288-6.203   c0.754-0.755,2.073-0.756,2.829,0.001C12.792,5.463,13,5.965,13,6.499v1.704c4.619,0.933,8,4.997,8,9.796v1   c0,0.442-0.29,0.832-0.714,0.958c-0.095,0.027-0.19,0.042-0.286,0.042C19.669,19.999,19.354,19.834,19.164,19.547z M12.023,14.011   c2.207,0.056,4.638,0.394,6.758,2.121c-0.768-3.216-3.477-5.702-6.893-6.08C11.384,9.996,11,10,11,10V6.503l-5.576,5.496l5.576,5.5   V14C11,14,11.738,14.01,12.023,14.011z" />
          </g>
        </svg>
      </Link>
      <div>
        <h1>
          เช็คชื่อนักเรียนห้อง {getkin}/{getroom} ปีการศึกษา {getyear} เทอม{" "}
          {getterm}
        </h1>
      </div>
      <div>
        <label>เลือกวันที่:</label>
        <input
          type="date"
          value={new Date(selectedDate).toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>ชื่อ-นามสกุล</th>
            <th>รหัสประจำตัว</th>
            <th>เดือน-วัน-ปี</th>
            <th>Confix</th>
          </tr>
        </thead>
        <tbody>
          {showstu?.map((data, index) => {
            const { stu_id, prefix, stu_Fname, stu_Lname, stu_sn } = data;
            return (
              <tr key={stu_id}>
                <td>
                  {prefix} {stu_Fname} {stu_Lname}
                </td>
                <td>{stu_sn}</td>
                <td>{new Date(selectedDate).toLocaleDateString("en-US")}</td>
                <td>
                  <select
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    value={statusRecords[index]?.attd_id || ""}
                  >
                    <option>Select status</option>
                    {showatten?.map((data) => {
                      const { attd_id, attd_name } = data;
                      return (
                        <option key={attd_id} value={attd_id}>
                          {attd_name}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button onClick={() => onInsert()}>บันทึก</Button>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default StuAttendanceInsert;