import { useLocation, Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthContext";

const RequireAuth = ({ allowedRoles }) => {
  const { contextUser } = UserAuth();
  const [user] = contextUser;
  const location = useLocation();

  return user?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
