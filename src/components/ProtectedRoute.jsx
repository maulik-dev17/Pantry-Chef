import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || (!(user.role == "admin"))) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAuthenticated || (!(user.role == "user"))) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default ProtectedRoute;