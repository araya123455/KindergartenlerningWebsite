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
      <div>
        <h1>
          เช็คชื่อนักเรียนห้อง {getkin}/{getroom} ปีการศึกษา {getyear} เทอม{" "}
          {getterm}
        </h1>
      </div>
      <div>
        <label>Filter by Date:</label>
        <input
          type="date"
          value={new Date(selectedDate).toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ชื่อ-นามสกุล</th>
            <th>รหัสประจำตัว</th>
            <th>ปี-เดือน-วัน</th>
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
