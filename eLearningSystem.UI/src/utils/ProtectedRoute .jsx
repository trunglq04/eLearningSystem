/* eslint-disable react/prop-types */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
