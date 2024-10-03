import React from "react";
import Sidebar from "./Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AdminLayout() {
  const user = JSON.parse(localStorage.getItem("accessToken"));
  const decodedToken = jwtDecode(user);
  if (decodedToken.role !== "Admin") {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex">
      <div className="flex-col h-screen">
        <Sidebar />
      </div>
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto h-screen">
        <Outlet />
      </div>
    </div>
  );
}
