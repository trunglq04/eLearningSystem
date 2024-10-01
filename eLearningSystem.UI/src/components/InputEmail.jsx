import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../utils/APIServices";
import toast, { Toaster } from "react-hot-toast";

export default function InputEmail() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = { ...error };

    // Email validation
    if (email === "") {
      newErrors.email = "Email is required";
    } else if (!email.match(emailRegex)) {
      newErrors.email = "Please provide a valid email address.";
    } else {
      delete newErrors.email;
    }

    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const data = await forgotPassword(email);
        if (data.status === 200) {
          toast.success(data.data.message);
        }
        console.log(data);
      } catch (err) {
        toast.error(err.response.data.message);
        console.log(err);
      }
    }
  };
  return (
    <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Toaster />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot Password ?
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
                <p className="mt-2 text-pink-600 text-sm">{error.email}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Verify
            </button>
          </div>
        </form>

        <p className="mt-7 text-center text-sm text-gray-500">
          <a
            onClick={() => nav("/login")}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Back to Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
