import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { useSelector } from "react-redux";
function DashboardRequire({ children }) {
  const { isInitialize, isAuthenticated } = useAuth();
  const {user} =useAuth();
  const location = useLocation();
  // console.log(`isInitial in Authrequire ${isInitialize}`);
  if (!isInitialize) {
    return <LoadingScreen />;
  }
  
  if (!isAuthenticated) {
    console.log("isAuthenticated false");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // console.log("isAuthenticated true");
if (!(user.PhanQuyen ==='admin' || user.PhanQuyen ==='manager' )) {
    
    alert("Bạn không có quyền xem dashboard")
    return <Navigate to="/" state={{ from: location }} replace />;
}
  
  return children;
}

export default DashboardRequire;
