import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.jpg";
import { motion as m } from "framer-motion";
import { registerLearner } from "../utils/ApiFunctions";

export default function Register() {
  const navigate = useNavigate();
  const [registerUser, setRegisterUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleNavigate = () => {
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser({ ...registerUser, [name]: value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      registerUser.email.trim() === "" ||
      registerUser.password.trim() === "" ||
      registerUser.confirmPassword.trim() === ""
    ) {
      toast.error("Please fill all fields");
    } else if (!registerUser.email.match(emailRegex)) {
      toast.error("Invalid email address");
    } else if (registerUser.password !== registerUser.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        setLoading(true);
        const response = await registerLearner(registerUser);
        toast.success(response.message[0]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data?.message[0]);
      }
    }
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2"
    >
      <div className="flex flex-col justify-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="E-Learning System"
            src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_79143.jpg"
            className="mx-auto h-24 w-24"
          />

          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            SIGN UP
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
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
                  type="email"
                  required
                  onChange={handleInputChange}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 peer"
                />
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
                  onChange={handleInputChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={handleInputChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <Toaster />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmitForm}
                {...(loading && { disabled: true })}
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="mt-3">
            <a onClick={handleNavigate}>
              <p className="text-center text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                Already have an account? Sign in
              </p>
            </a>
          </div>
        </div>
      </div>
      <div className="px-12 py-12">
        <img
          src={banner}
          alt="Banner"
          className="w-full h-full object-cover hidden lg:block rounded-3xl"
        />
      </div>
    </m.div>
  );
}
