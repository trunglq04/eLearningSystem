import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import ChangePassword from "./ChangePassword";

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    phone: "",
    fullname: "",
    gender: "",
    dob: "",
  });
  const [error, setError] = useState({
    email: "",
    phone: "",
    fullname: "",
    dob: "",
  });

  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;

  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInfo.email === "") {
      setError((prevError) => ({ ...prevError, email: "Email is required" }));
    } else if (!userInfo.email.match(emailRegex)) {
      setError((prevError) => ({
        ...prevError,
        email: "Please provide a valid email address.",
      }));
    } else {
      setError((prevError) => ({ ...prevError, email: "" }));
    }

    if (userInfo.fullname.length > 255) {
      setError((prevError) => ({
        ...prevError,
        fullname: "No more than 255 characters",
      }));
    } else {
      setError((prevError) => ({ ...prevError, fullname: "" }));
    }

    if (userInfo.phone.length > 15) {
      setError((prevError) => ({
        ...prevError,
        phone: "No more than 10 characters",
      }));
    } else {
      setError((prevError) => ({ ...prevError, phone: "" }));
    }

    if (userInfo.dob.match(dateRegex)) {
      setError((prevError) => ({
        ...prevError,
        dob: "Please provide a valid date",
      }));
    }
    console.log(userInfo);
  };

  const handleReset = () => {
    setUserInfo({
      email: "",
      phone: "",
      fullname: "",
      gender: "",
      dob: "",
    });
    setError({
      email: "",
      phone: "",
      fullname: "",
      dob: "",
    });
  };

  return (
    <div>
      <Header></Header>
      <div className="grid grid-cols-2 py-16 px-10 h-full">
        <div className="border-r border-gray-900/10">
          <div className="flex justify-center align-middle h-full">
            <div className="mt-2 flex items-center flex-col gap-x-3">
              <UserCircleIcon
                aria-hidden="true"
                className="h-52 w-52 text-gray-300"
              />
              <input
                type="file"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              />

              <div className="mt-5">
                <button
                  onClick={() => setOpen(true)}
                  type="button"
                  className="rounded-md bg-rose-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-rose-500"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
        <form
          className="px-6 py-6"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-3xl font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>

            <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="full-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Fullname
                </label>
                <div className="mt-2">
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    value={userInfo.fullname}
                    onChange={handleChange}
                    autoComplete="full-name"
                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {error.fullname && (
                    <p className="mt-1 text-pink-600 text-sm">
                      {error.fullname}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={userInfo.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {error.email && (
                    <p className="mt-1 text-pink-600 text-sm">{error.email}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gender
                </label>
                <div className="mt-2">
                  <select
                    id="gender"
                    name="gender"
                    autoComplete="gender"
                    value={userInfo.gender}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone number
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="number"
                    value={userInfo.phone}
                    onChange={handleChange}
                    autoComplete="phone"
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {error.phone && (
                    <p className="mt-1 text-pink-600 text-sm">{error.phone}</p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date of Birth
                </label>

                <div className="mt-2">
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    value={userInfo.dob}
                    onChange={handleChange}
                    autoComplete="dob"
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {error.dob && (
                    <p className="mt-1 text-pink-600 text-sm">{error.dob}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              type="reset"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <ChangePassword open={open} setOpen={setOpen}></ChangePassword>

      <Footer></Footer>
    </div>
  );
}
