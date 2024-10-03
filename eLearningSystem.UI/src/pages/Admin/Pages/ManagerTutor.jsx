import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { addTutor, getActors } from "../../../utils/APIServices";

export default function ManagerTutor() {
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullname: "",
    email: "",
  });
  const [error, setError] = useState({
    fullname: "",
    email: "",
  });

  const [actors, setActors] = useState([]);

  const [role, setRole] = useState("tutor");

  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

  const fetchTutors = async () => {
    try {
      const response = await getActors(role);
      setActors(response.data);
    } catch (error) {
      const errorMessages = error.response?.data?.message || [
        "Something went wrong",
      ];
      errorMessages.forEach((message) => toast.error(message));
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = {};

    if (userInfo.email.trim() === "") {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!emailRegex.test(userInfo.email)) {
      newErrors.email = "Please provide a valid email address.";
      hasError = true;
    }

    if (userInfo.fullname.trim() === "") {
      newErrors.fullname = "Fullname is required";
      hasError = true;
    } else if (userInfo.fullname.length > 255) {
      newErrors.fullname = "No more than 255 characters";
      hasError = true;
    }

    if (hasError) {
      setError((prevError) => ({ ...prevError, ...newErrors }));
      return;
    }

    setError({ email: "", fullname: "" });

    try {
      setIsLoading(true);

      const response = await addTutor(userInfo);

      if (response) {
        toast.success(response.message[0]);
        setOpen(false);
        setUserInfo({ fullname: "", email: "" });
        fetchTutors();
      }
    } catch (error) {
      const errorMessages = error.response?.data?.message || [
        "Something went wrong",
      ];
      errorMessages.forEach((message) => toast.error(message));
    } finally {
      setIsLoading(false);
    }
  };

  const hanldeCancel = () => {
    setError({ fullname: "", email: "" });
    setUserInfo({ fullname: "", email: "" });
    setOpen(false);
  };

  return (
    <div className="px-6">
      <div className="flex justify-end">
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="transition ease-in-out delay-150 bg-blue-500 text-white hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 px-4 py-2 border rounded-md"
        >
          Add Tutor
        </button>
      </div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left ">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900 text-lg text-center">
                      Add new tutor
                    </DialogTitle>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit}>
                        <div className="sm:col-span-3 mt-3">
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
                              placeholder="Your Fullname"
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

                        <div className="sm:col-span-3 mt-3">
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
                              placeholder="Your Email"
                              value={userInfo.email}
                              onChange={handleChange}
                              autoComplete="email"
                              className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {error.email && (
                              <p className="mt-1 text-pink-600 text-sm">
                                {error.email}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 ">
                          {isLoading ? (
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
                            <>
                              <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                              >
                                Save
                              </button>
                            </>
                          )}

                          <button
                            type="button"
                            data-autofocus
                            onClick={() => hanldeCancel()}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <ul role="list" className="divide-y divide-gray-100 ">
        {actors.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                alt=""
                src={person.image}
                className="h-24 w-24 flex-none rounded-full bg-gray-50 object-cover"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {person.fullName}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {person.email}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Online</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Toaster />
    </div>
  );
}
