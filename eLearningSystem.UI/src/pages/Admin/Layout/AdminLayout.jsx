import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
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
