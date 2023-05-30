import React from "react";
import { Navigate } from "react-router-dom";
import LoadingToRedirec from "./LoadingToRedirec";

function ProtectedRoute({ isSignedIn, children }) {
    if (!isSignedIn) {
      return (
          <Navigate to="/login" replace />
      );
    }
  return children;
}

export default ProtectedRoute;
