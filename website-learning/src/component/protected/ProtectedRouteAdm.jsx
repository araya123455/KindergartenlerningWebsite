import React from "react";
import { Navigate } from "react-router-dom";
import { getFromLocalStorage } from "../../LocalStorage/localstorage";

function ProtectedRouteAdm({ children }) {
  const adm_check = getFromLocalStorage("adm_auth");
  const check = getFromLocalStorage("login");
  // console.log(check);
  // console.log(adm_check);

  if (adm_check != null) {
    // console.log("admin");
    <Navigate to="/admin" replace />;
  } else if (!check || adm_check === null) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRouteAdm;
