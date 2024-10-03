import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import { useDocumentTitle } from "@uidotdev/usehooks";

export default function Home() {
  useDocumentTitle("E-Learning | Home");
  return (
    <div>
      <Header></Header>
      <div className="h-screen">
        <Carousel></Carousel>
      </div>
      <Footer></Footer>
    </div>
  );
}
