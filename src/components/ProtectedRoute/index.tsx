import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  validator: boolean;
  fallback: string;
};

const ProtectedRoute = ({ validator, fallback }: ProtectedRouteProps) => {
  if (!validator) {
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
