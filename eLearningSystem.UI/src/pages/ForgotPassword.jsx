import React from "react";
import banner from "../assets/banner.jpg";
import InputEmail from "../components/InputEmail";

export default function ForgotPassword() {
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
          <InputEmail />
        </div>
      </div>
    </>
  );
}
