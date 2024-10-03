import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.jpg";
import { motion as m } from "framer-motion";
import { registerLearner } from "../utils/APIServices";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDocumentTitle } from "@uidotdev/usehooks";

export default function Register() {
  useDocumentTitle("E-Learning | Sign-up");
  const navigate = useNavigate();
  const [registerUser, setRegisterUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isToggle, setIsToggle] = useState(false);
  const [isToggleConfirmPass, setIsToggleConfirmPass] = useState(false);

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
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        setLoading(false);
        setRegisterUser({ email: "", password: "", confirmPassword: "" });
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
                  value={registerUser.email}
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
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={isToggle ? "text" : "password"}
                  onChange={handleInputChange}
                  required
                  autoComplete="current-password"
                  value={registerUser.password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {!isToggle ? (
                  <>
                    <FaEye
                      onClick={() => setIsToggle(!isToggle)}
                      className="size-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    />
                  </>
                ) : (
                  <>
                    <FaEyeSlash
                      onClick={() => setIsToggle(!isToggle)}
                      className="size-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    />
                  </>
                )}
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
              <div className="mt-2 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={isToggleConfirmPass ? "text" : "password"}
                  onChange={handleInputChange}
                  required
                  autoComplete="current-password"
                  value={registerUser.confirmPassword}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {!isToggleConfirmPass ? (
                  <>
                    <FaEye
                      onClick={() =>
                        setIsToggleConfirmPass(!isToggleConfirmPass)
                      }
                      className="size-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    />
                  </>
                ) : (
                  <>
                    <FaEyeSlash
                      onClick={() =>
                        setIsToggleConfirmPass(!isToggleConfirmPass)
                      }
                      className="size-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    />
                  </>
                )}
              </div>
            </div>

            <Toaster />

            <div>
              {loading ? (
                <div role="status" className="flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleSubmitForm}
                >
                  Sign up
                </button>
              )}
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
