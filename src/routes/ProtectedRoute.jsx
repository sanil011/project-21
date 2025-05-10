import { Navigate, Outlet } from "react-router-dom";
import propTypes from "prop-types";

const ProtectedRoute = ({ isAuthenticated, isUserAllowed }) => {
  if (isAuthenticated) {
    return isUserAllowed ? <Outlet /> : <Navigate to="/not-allowed" />;
  } else {
    return isUserAllowed ? (
      <Navigate to="/login" />
    ) : (
      <Outlet />
    );
  }
};

ProtectedRoute.propTypes = {
  isUserAllowed: propTypes.bool,
  isAuthenticated: propTypes.bool,
};

export default ProtectedRoute;
