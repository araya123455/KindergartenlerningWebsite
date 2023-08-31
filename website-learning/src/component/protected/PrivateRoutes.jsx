import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = { token: true };
  console.log("auth.token",auth.token);
  return auth.token ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoutes;
