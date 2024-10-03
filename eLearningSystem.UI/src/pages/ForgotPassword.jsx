import React from "react";
import banner from "../assets/banner.jpg";
import InputEmail from "../components/InputEmail";
import { motion as m } from "framer-motion";
import { useDocumentTitle } from "@uidotdev/usehooks";

export default function ForgotPassword() {
  useDocumentTitle("E-Learning | Forgot password");
  return (
    <>
      <div className="h-screen w-screen grid grid-cols-2">
        <div className="px-12 py-12">
          <img
            className="object-cover w-full h-full rounded-xl"
            src={banner}
          ></img>
        </div>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className=""
        >
          <InputEmail />
        </m.div>
      </div>
    </>
  );
}
