import React, { useState } from "react";
import banner from "../assets/banner.jpg";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../utils/APIServices";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  const nav = useNavigate();
  const [confirmPass, setConfirmPass] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isToggle, setIsToggle] = useState(false);
  const [isToggleConfirmPass, setIsToggleConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);

  const resetToken = queryParams.get("token");
  const email = queryParams.get("email");
  console.log(resetToken);

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
      setLoading(true);
      try {
        console.log(email, password, resetToken);
        const data = await resetPassword({ email, password, resetToken });
        toast.success(data.message[0]);
        setLoading(false);
        setTimeout(() => {
          nav("/login");
        }, 1000);
        console.log(data);
      } catch (err) {
        toast.error(err.response.data.message[0]);
        setLoading(false);
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
                src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_79143.jpg"
                className="mx-auto h-24 w-24"
              />
              <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
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
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      name="password"
                      type={isToggle ? "text" : "password"}
                      className={
                        !error.password
                          ? "block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          : "mt-1 block w-full px-3 py-2 border rounded-md text-sm placeholder-slate-400 focus:outline-none focus:ring-1 bg-slate-50 shadow-none border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"
                      }
                      onChange={(e) => setPassword(e.target.value)}
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
                  <div className="mt-2 relative">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type={isToggleConfirmPass ? "text" : "password"}
                      className={
                        !error.confirmPass
                          ? "block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          : "mt-1 block w-full px-3 py-2 border rounded-md text-sm placeholder-slate-400 focus:outline-none focus:ring-1 bg-slate-50 shadow-none border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"
                      }
                      onChange={(e) => setConfirmPass(e.target.value)}
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
                    {error.confirmPass && (
                      <p className="mt-2 text-pink-600 text-sm">
                        {error.confirmPass}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  {loading ? (
                    <div
                      role="status"
                      className="flex items-center justify-center"
                    >
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
                    >
                      Reset Password
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
