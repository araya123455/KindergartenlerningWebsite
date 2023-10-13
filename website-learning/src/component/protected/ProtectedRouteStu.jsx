import React from "react";
import { Navigate } from "react-router-dom";
import { getFromLocalStorage } from "../../LocalStorage/localstorage";

function ProtectedRouteStu({ children }) {
  const stu_check = getFromLocalStorage("stu_auth");
  const tch_check = getFromLocalStorage("tch_auth");
  const adm_check = getFromLocalStorage("adm_auth");
  const check = getFromLocalStorage("login");
  // console.log(check);
  // console.log(stu_check);

  if (stu_check != null) {
    // console.log("student");
    <Navigate to="/student" replace />;
  } else if (!check || stu_check === null) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRouteStu;
