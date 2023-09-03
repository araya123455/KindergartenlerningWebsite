import React, { useState } from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import RouteNavbar from "./component/navbar/RouteNavbar";
import RouteAdmin from "./component/navbarAdmin/RouteNavbar";
import AdminProfile from "../src/adminPage/AdminProfile";
import MgtYearTerm from "./adminPage/MgtYearTerm";
import MgtKindergartenroomlevel from "./adminPage/MgtKindergartenroomlevel";
import MgtStudent from "../src/adminPage/MgtStudent";
import MgtTeacher from "../src/adminPage/MgtTeacher";
import MgtClass from "../src/adminPage/MgtClass";
import MgtClassroomTimetable from "./adminPage/MgtClassroomTimetable";
import MgtSyllabus from "./adminPage/MgtSyllabus";
import MgtSubject from "./adminPage/MgtSubject";
import Search from "../src/adminPage/Search";
import RouteTeacher from "./component/navbatTeacher/RouteNavbar";
import TeacherProfile from "./teacherPage/TeacherProfile";
import LearningMaterials from "../src/teacherPage/LearningMaterials";
import StudentAttendance from "../src/teacherPage/StudentAttendance";
import SubjectScore from "../src/teacherPage/SubjectScore";
import CreateTest from "./teacherPage/CreateTest";
import AddClassTest from "./teacherPage/AddClassTest";
import CreateChoice from "./teacherPage/CreateChoice";
import TestResult from "./teacherPage/TestResult";
import TestResultDetail from "./teacherPage/TestResultDetail";
import TeaSearch from "./teacherPage/TeaSearch";
import Report from "../src/teacherPage/Report";
import RouteStudent from "./component/navbarStudent/RouteNavbar";
import CheckScore from "./studentPage/CheckScore";
import StudentProfile from "./studentPage/StudentProfile";
import Test from "./studentPage/Test";
import StartTest from "./studentPage/StartTest";
import ShowTestResult from "./studentPage/ShowTestResult";
import Login from "../src/component/auth/Login";
import ProtectedRoute from "./component/protected/ProtectedRoute";
import PrivateRoutes from "./component/protected/PrivateRoutes";
import Movement from "./teacherPage/movement";
import Movement2 from "./teacherPage/Movement2";
import EnhanceTheexperience from "./teacherPage/EnhanceTheexperience";
import Artactivities from "./teacherPage/Artactivities";
import Outdooractivities from "./teacherPage/Outdooractivities";
import Freeactivities from "./teacherPage/Freeactivities";
import LearningFile from "./teacherPage/LearningFile";
import SubjectFileEnglish from "./teacherPage/SubjectFileEnglish";
import SubjectFileEnhance from "./teacherPage/SubjectFileEnhance";
import SubjectFileMath from "./teacherPage/SubjectFileMath";
import SubjectFileThai from "./teacherPage/SubjectFileThai";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [selectedId, setselectedId] = useState(0);
  const signin = () => {
    setIsSignedIn(true);
  };
  const signout = () => {
    setIsSignedIn(false);
  };
  console.log(isSignedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="login" replace />} />
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login signin={signin} />} />
        <Route path="main" element={<RouteNavbar />} />
        <Route
          path="admin"
          element={
            <RouteAdmin />
            // <ProtectedRoute isSignedIn={isSignedIn}>
            //   <RouteAdmin />
            // </ProtectedRoute>
          }
        >
          <Route path="admin" element={<AdminProfile />} />
          <Route index element={<Navigate to="admin" replace />} />
          <Route path="mgtYearTerm" element={<MgtYearTerm />} />
          <Route
            path="mgtKindergartenroomlevel"
            element={<MgtKindergartenroomlevel />}
          />
          <Route path="mgtStudent" element={<MgtStudent />} />
          <Route path="mgtTeacher" element={<MgtTeacher />} />
          <Route path="mgtClass" element={<MgtClass />} />
          <Route path="mgtClassTimetable" element={<MgtClassroomTimetable />} />
          <Route path="mgtSyllabus" element={<MgtSyllabus />} />
          <Route path="mgtSubject" element={<MgtSubject />} />
          <Route path="search" element={<Search />} />
        </Route>

        <Route
          // path="teacher"
          // element={
          //   <ProtectedRoute isSignedIn={isSignedIn} signin={signin}>

          //     <RouteTeacher signout={signout}/>
          //   </ProtectedRoute>
          // }
          element={<RouteTeacher />}
        >
          <Route path="teacher" element={<TeacherProfile />} />
          <Route index element={<Navigate to="teacher" replace />} />
          <Route path="learning" element={<LearningMaterials />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="subjectScore" element={<SubjectScore />} />
          <Route path="movenment" element={<Movement />} />
          <Route path="movenment2" element={<Movement2 />} />
          <Route path="learningFile" element={<LearningFile />} />
          <Route
            path="enhanceTheexperience"
            element={<EnhanceTheexperience />}
          />
          <Route path="Artactivities" element={<Artactivities />} />
          <Route path="Outdooractivities" element={<Outdooractivities />} />
          <Route path="Freeactivities" element={<Freeactivities />} />
          <Route path="SubjectFileEnglish" element={<SubjectFileEnglish />} />
          <Route path="SubjectFileEnhance" element={<SubjectFileEnhance />} />
          <Route path="SubjectFileMath" element={<SubjectFileMath />} />
          <Route path="SubjectFileThai" element={<SubjectFileThai />} />
          <Route path="test">
            <Route
              path="createChoice"
              element={<CreateChoice data={selectedId} set={setselectedId} />}
            />
            <Route
              path="addClassTest"
              element={<AddClassTest data={selectedId} set={setselectedId} />}
            />
            <Route index element={<Navigate to="test" replace />}></Route>
            <Route
              path="createTest"
              element={<CreateTest data={selectedId} set={setselectedId} />}
            />
            <Route path="testRe" element={<TestResult />} />
          </Route>
          <Route path="testResultDetail" element={<TestResultDetail />} />
          <Route path="teaSeacher" element={<TeaSearch />} />
          <Route path="report" element={<Report />} />
        </Route>
        <Route
          path="student"
          element={
            // <RouteStudent />
            <ProtectedRoute isSignedIn={isSignedIn}>
              <RouteStudent signout={signout} />
            </ProtectedRoute>
          }
        >
          <Route path="student" element={<StudentProfile />} />
          <Route index element={<Navigate to="student" replace />} />
          <Route path="checkScore" element={<CheckScore />} />
          <Route path="test" element={<Test />} />
          <Route path="startTest" element={<StartTest />} />
          <Route path="showTestResult" element={<ShowTestResult />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
