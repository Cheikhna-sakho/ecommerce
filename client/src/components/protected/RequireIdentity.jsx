import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserAuth } from '../../contexts/AuthContext';

const RequireIdentity = () => {
  const { contextUser, contextUserGuest } = UserAuth();
  const [user] = contextUser;
  const [userGuest] = contextUserGuest;

  const location = useLocation();
  return user || userGuest ? (
    <Outlet />
  ) : (
    <Navigate to="identity" state={{ from: location }} replace />
  );
}

export default RequireIdentity