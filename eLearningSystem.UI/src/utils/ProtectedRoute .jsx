/* eslint-disable react/prop-types */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const isAuthenticated = () => {
  return !!getAccessToken();
};

export default function ProtectedRoute() {
  console.log(isAuthenticated());
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
