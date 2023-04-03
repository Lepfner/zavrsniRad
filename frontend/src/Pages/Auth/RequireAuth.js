import React, {useEffect} from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
 useEffect(() => {
 }, [])
   return localStorage.getItem("isLoggedIn") ? <Outlet />
        : <Navigate to="/unauthorized" state={{ from: location }} replace />
};

export default RequireAuth;
