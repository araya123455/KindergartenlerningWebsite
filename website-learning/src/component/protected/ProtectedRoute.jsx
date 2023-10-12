import React from "react";
import { Navigate } from "react-router-dom";
import LoadingToRedirec from "./LoadingToRedirec";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../../LocalStorage/localstorage";

function ProtectedRoute({ isSignedIn, children }) {
  const adm_check = getFromLocalStorage("adm_auth");
  const tch_check = getFromLocalStorage("tch_auth");
  const stu_check = getFromLocalStorage("stu_auth");
  const check = getFromLocalStorage("login");

  // Check if the user is signed in
  if (!check) {
    return <Navigate to="/login" replace />;
  }

  // Check the role and redirect accordingly
  if (adm_check != null) {
    // console.log("admin");
     <Navigate to="/admin" replace />;
  } else if (tch_check != null) {
    // console.log("teacher");
     <Navigate to="/teacher" replace />;
  } else if (stu_check != null) {
    // console.log("student");
     <Navigate to="/student" replace />;
  }

  // If none of the conditions match, render the children
  return children;
}

export default ProtectedRoute;