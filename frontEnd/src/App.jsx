import React from "react";
import Userreglog from "./components/userreglog";
import Login from "./components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <>
      <div className=" fixed top-0 -z-10 h-full w-full">
        <div className="absolute inset-0 -z-20 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Userreglog />} />
        </Routes>
      </BrowserRouter>
      {/* <Userreglog /> */}
      {/* <Login /> */}
    </>
  );
}
