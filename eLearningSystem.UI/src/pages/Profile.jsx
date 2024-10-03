import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getUser, updateAvatar, updateProfile } from "../utils/APIServices";
import ChangePassword from "./ChangePassword";
import { motion as m } from "framer-motion";

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
    gender: "",
  });

  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);

  const [avatar, setAvatar] = useState(null); // Holds the selected avatar or URL

  const [file, setFile] = useState(null); // Holds the file object
  const [isNewAvatar, setIsNewAvatar] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);

  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setUserInfo({
          email: response.data.email == "None" ? "" : response.data.email,
          phone:
            response.data.phoneNumber == "None"
              ? ""
              : response.data.phoneNumber,
          fullname:
            response.data.fullName == "None" ? "" : response.data.fullName,
          dob:
            response.data.dateOfBirth == "None"
              ? ""
              : response.data.dateOfBirth,
          gender: response.data.gender == "None" ? "" : response.data.gender,
        });
        setAvatar(response.data.image == "None" ? null : response.data.image);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, add 1 and pad with 0
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
    setIsUpdate(true);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file
    if (selectedFile) {
      setAvatar(URL.createObjectURL(selectedFile)); // Display the avatar preview
      setFile(selectedFile); // Save the file
      setIsNewAvatar(true); // Show the "Save" button
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsLoadingAvatar(true);
      const formData = new FormData();
      formData.append("file", file);
      const response = await updateAvatar(formData);
      if (response) {
        toast.success(response.message[0]);
      }
      setIsLoadingAvatar(false);
    } catch (error) {
      console.log(error);
      setIsLoadingAvatar(false);
    }
    setIsNewAvatar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.email.trim() === "") {
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
    } else if (userInfo.fullname.trim() === "") {
      setError((prevError) => ({
        ...prevError,
        fullname: "Fullname is required",
      }));
    } else {
      setError((prevError) => ({ ...prevError, fullname: "" }));
    }

    if (userInfo.gender.trim() === "") {
      setError((prevError) => ({
        ...prevError,
        gender: "Gender is required",
      }));
    } else {
      setError((prevError) => ({ ...prevError, gender: "" }));
    }

    if (userInfo.phone.length > 15) {
      setError((prevError) => ({
        ...prevError,
        phone: "No more than 10 characters",
      }));
    } else if (userInfo.phone.trim() === "") {
      setError((prevError) => ({
        ...prevError,
        phone: "Phone number is required",
      }));
    } else {
      setError((prevError) => ({ ...prevError, phone: "" }));
    }

    if (userInfo.dob.trim() === "") {
      setError((prevError) => ({
        ...prevError,
        dob: "Date of birth is required",
      }));
    } else {
      setError((prevError) => ({ ...prevError, dob: "" }));
    }

    if (
      userInfo.email.trim() !== "" &&
      userInfo.fullname.trim() !== "" &&
      userInfo.dob.trim() !== "" &&
      userInfo.phone.trim() !== "" &&
      userInfo.gender.trim() !== ""
    ) {
      try {
        const response = await updateProfile(userInfo);
        if (response) {
          setIsUpdate(false);
          toast.success(response.message[0]);
          // toast.success("Profile updated successfully");
        }
      } catch (error) {
        console.log(error);
      }
    }
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
      <Toaster />
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="grid grid-cols-2 py-16 px-10 h-full"
      >
        <div className="border-r border-gray-900/10">
          <div className="flex justify-center align-middle h-full">
            <div className="mt-2 flex items-center flex-col gap-x-3">
              <div className="relative mb-3">
                {/* Avatar preview */}
                <img
                  src={
                    avatar !== null ? avatar : "https://via.placeholder.com/150"
                  }
                  alt="User Avatar"
                  className="w-52 h-52 rounded-full object-cover border-2 border-gray-300"
                />
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              />

              <div className="mt-5">
                {isNewAvatar && !isLoadingAvatar ? (
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                ) : isLoadingAvatar ? (
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
                ) : null}
              </div>

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
                    placeholder="Your Email"
                    value={userInfo.email}
                    onChange={handleChange}
                    autoComplete="email"
                    readOnly
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
                    <option value="">--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {error.gender && (
                    <p className="mt-1 text-pink-600 text-sm">{error.gender}</p>
                  )}
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
                    type="text"
                    value={userInfo.phone}
                    onChange={handleChange}
                    autoComplete="phone"
                    placeholder="Your Phone Number"
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
                    value={formatDate(userInfo.dob)}
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
            {isUpdate && (
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </m.div>

      <ChangePassword open={open} setOpen={setOpen}></ChangePassword>

      <Footer></Footer>
    </div>
  );
}
