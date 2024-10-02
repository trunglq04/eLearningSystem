import React, { useState } from "react";
import banner from "../assets/banner.jpg";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../utils/APIServices";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
  const nav = useNavigate();
  const [confirmPass, setConfirmPass] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const queryParams = new URLSearchParams(window.location.search);

  const resetToken = queryParams.get("token");
  const email = queryParams.get("email");
  console.log(typeof resetToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = { ...error };

    // Password validation
    if (password === "") {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else {
      delete newErrors.password;
    }

    // Confirm password validation
    if (!confirmPass.match(password)) {
      newErrors.confirmPass = "Passwords do not match";
    } else {
      delete newErrors.confirmPass;
    }

    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        console.log(email, password, resetToken);
        const data = await resetPassword({ email, password, resetToken });
        toast.success(data.message[0]);
        console.log(data);
      } catch (err) {
        toast.error(err.response.data.message[0]);
        console.log(err);
      }
    }
  };
  return (
    <>
      <div className="h-screen w-screen grid grid-cols-2">
        <div className="px-12 py-12">
          <img
            className="object-cover w-full h-full rounded-xl"
            src={banner}
          ></img>
        </div>
        <div className="w-full h-full">
          <Toaster />
          <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="mx-auto h-10 w-auto"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Change Password
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className={
                        !error.password
                          ? "block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          : "mt-1 block w-full px-3 py-2 border rounded-md text-sm placeholder-slate-400 focus:outline-none focus:ring-1 bg-slate-50 shadow-none border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"
                      }
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {error.password && (
                      <p className="mt-2 text-pink-600 text-sm">
                        {error.password}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      className={
                        !error.confirmPass
                          ? "block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          : "mt-1 block w-full px-3 py-2 border rounded-md text-sm placeholder-slate-400 focus:outline-none focus:ring-1 bg-slate-50 shadow-none border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"
                      }
                      onChange={(e) => setConfirmPass(e.target.value)}
                    />
                    {error.confirmPass && (
                      <p className="mt-2 text-pink-600 text-sm">
                        {error.confirmPass}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
