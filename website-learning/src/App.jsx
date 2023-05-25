import React, { useState } from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import RouteNavbar from "./component/navbar/RouteNavbar";
import RouteAdmin from "./component/navbarAdmin/RouteNavbar";
import AdminProfile from "../src/adminPage/AdminProfile";
import MgtAcademic from "../src/adminPage/MgtAcademic";
import MgtStudent from "../src/adminPage/MgtStudent";
import MgtTeacher from "../src/adminPage/MgtTeacher";
import MgtClass from "../src/adminPage/MgtClass";
import Search from "../src/adminPage/Search";
import RouteTeacher from "./component/navbatTeacher/RouteNavbar";
import TeacherProfile from "./teacherPage/TeacherProfile";
import LearningMaterials from "../src/teacherPage/LearningMaterials";
import StudentAttendance from "../src/teacherPage/StudentAttendance";
import SubjectScore from "../src/teacherPage/SubjectScore";
import TeaSearch from "../src/teacherPage/Search";
import Report from "../src/teacherPage/Report";
import RouteStudent from "./component/navbarStudent/RouteNavbar";
import CheckScore from "./studentPage/CheckScore";
import StudentProfile from "./studentPage/StudentProfile";
import Test from "./studentPage/Test";
import Login from "../src/component/auth/Login";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const signin = () => {
    setIsSignedIn(true);
  };
  const signout = () => {
    setIsSignedIn(false);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="login" replace />} />
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="main" element={<RouteNavbar signin={signin} signout={signout} isSignedIn={isSignedIn}/>} />
        <Route path="admin" element={<RouteAdmin signin={signin} signout={signout} isSignedIn={isSignedIn}/>}>
          <Route path="admin" element={<AdminProfile />} />
          <Route index element={<Navigate to="admin" replace />} />
          <Route path="mgtAcademic" element={<MgtAcademic />} />
          <Route path="mgtStudent" element={<MgtStudent />} />
          <Route path="mgtTeacher" element={<MgtTeacher />} />
          <Route path="mgtClass" element={<MgtClass />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="teacher" element={<RouteTeacher signin={signin} signout={signout} isSignedIn={isSignedIn}/>}>
          <Route path="teacher" element={<TeacherProfile />} />
          <Route index element={<Navigate to="teacher" replace />} />
          <Route path="learning" element={<LearningMaterials />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="subjectScore" element={<SubjectScore />} />
          <Route path="test" element={<Test />} />
          <Route path="teaSearch" element={<TeaSearch />} />
          <Route path="teaReport" element={<Report />} />
        </Route>
        <Route path="student" element={<RouteStudent signin={signin} signout={signout} isSignedIn={isSignedIn}/>}>
          <Route path="student" element={<StudentProfile />} />
          <Route index element={<Navigate to="student" replace />} />
          <Route path="checkScore" element={<CheckScore />} />
          <Route path="test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
