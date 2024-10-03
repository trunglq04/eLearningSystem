import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const nav = useNavigate();

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  const hanldeSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    nav("/login");
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`w-64 bg-gray-800 text-white transition-all duration-300 h-full bottom-0`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <label className={`block text-lg font-semibold text-gray-200`}>
            ADMIN PANEL
          </label>
          <button className="text-gray-200 focus:outline-none">☰</button>
        </div>
        <ul className="mt-6">
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <a onClick={() => nav("/admin")}>Home</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <a>Dashboard</a>
          </li>

          {/* Products Dropdown */}
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <div
              className="flex items-center justify-between"
              onClick={toggleProductDropdown}
            >
              <a>Manage Tutor</a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={isProductDropdownOpen ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
                />
              </svg>
            </div>

            {/* Dropdown Menu */}
            {isProductDropdownOpen && (
              <ul className="ml-4 mt-2">
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  <a onClick={() => nav("/admin/manage-tutor")}>Manage Tutor</a>
                </li>
              </ul>
            )}
          </li>

          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <a>User</a>
          </li>
        </ul>
        <div className="flex justify-center px-4 py-3 mt-auto">
          <button
            className="px-4 py-1 bg-rose-800 border rounded-md"
            onClick={hanldeSignOut}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
