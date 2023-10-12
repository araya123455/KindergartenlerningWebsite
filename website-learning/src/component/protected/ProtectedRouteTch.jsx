import React from "react";
import { Navigate } from "react-router-dom";
import { getFromLocalStorage } from "../../LocalStorage/localstorage";

function ProtectedRouteTch({ children }) {
  const tch_check = getFromLocalStorage("tch_auth");
  const adm_check = getFromLocalStorage("adm_auth");
  const stu_check = getFromLocalStorage("stu_auth");
  const check = getFromLocalStorage("login");
  // console.log(check);
  // console.log(tch_check);

  if (tch_check != null) {
    // console.log("teacher");
    <Navigate to="/teacher" replace />;
  } else if (!check || tch_check === null) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRouteTch;
