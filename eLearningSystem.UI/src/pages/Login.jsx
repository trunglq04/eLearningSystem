import React, { useState } from "react";
import banner from "../assets/banner.jpg";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { ...error };

    // Email validation
    if (email === "") {
      newErrors.email = "Email is required";
    } else if (!email.match(emailRegex)) {
      newErrors.email = "Please provide a valid email address.";
    } else {
      delete newErrors.email; // Remove the error if the validation passes
    }

    // Password validation
    if (password === "") {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else {
      delete newErrors.password; // Remove the error if the validation passes
    }

    setError(newErrors); // Update the error state with the new object
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
          <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="mx-auto h-10 w-auto"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
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
                      className={
                        !error.email
                          ? "block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          : "mt-1 block w-full px-3 py-2 border rounded-md text-sm placeholder-slate-400 focus:outline-none focus:ring-1 bg-slate-50 shadow-none border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"
                      }
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {error.email && (
                      <p className="mt-2 text-pink-600 text-sm">
                        {error.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
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
                  <div className="text-sm text-right mt-2">
                    <a
                      onClick={() => nav("/forgot-password")}
                      className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-7 text-center text-sm text-gray-500">
                Not a member?{" "}
                <a
                  onClick={() => nav("/register")}
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                >
                  Create an account
                </a>
              </p>

              <div className="text-center mt-2">
                <p className="text-gray-400">----- Or continue with -----</p>
                <button
                  type="button"
                  className="rounded-full border border-black px-6 py-1.5 mt-2"
                >
                  <FcGoogle />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}