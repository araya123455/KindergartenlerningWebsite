import React from "react";
import { Navigate } from "react-router-dom";
import LoadingToRedirec from "./LoadingToRedirec";
import { saveToLocalStorage } from "../../LocalStorage/localstorage";

function ProtectedRoute({ isSignedIn, children }) {
  console.log(isSignedIn);
    // if (!isSignedIn) {
    //   // localStorage.removeItem("userRole");
    //   // Clear saved role from Local Storage
    //   return <Navigate to="/login" replace />;
    // }
  if (saveToLocalStorage == null) {
    if (!isSignedIn) {
      // localStorage.removeItem("userRole");
      // Clear saved role from Local Storage
      return <Navigate to="/login" replace />;
    }
  }
  return children;
}

export default ProtectedRoute;
