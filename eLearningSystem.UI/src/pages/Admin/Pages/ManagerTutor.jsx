import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { addTutor, getActors } from "../../../utils/APIServices";
import ModalAddTutor from "../Layout/ModalAddTutor";
import Pagination from "../Layout/Pagination";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = async (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      const response = await getActors(role, page);
      setActors(response.data?.users);
      setTotalPages(response.data?.totalPage + 1);
    }
  };

  useEffect(() => {
    handlePageChange(1);
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
        handlePageChange(1);
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
      <ModalAddTutor
        open={open}
        setOpen={setOpen}
        userInfo={userInfo}
        error={error}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        hanldeCancel={hanldeCancel}
        isLoading={isLoading}
      />

      <div className="flex flex-col min-h-screen p-1">
        <ul role="list" className="divide-y divide-gray-100 h-96">
          {actors.map((person) => (
            <li
              key={person.email}
              className="flex justify-between gap-x-6 py-3"
            >
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

        <div className="mt-40">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
