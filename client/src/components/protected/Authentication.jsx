import React from 'react'
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthContext";

const Authentication = () => {
    const { contextUser, contextUserGuest } = UserAuth();
    const [user] = contextUser;
    const [userGuest] = contextUserGuest;

    const location = useLocation();
  return !user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default Authentication