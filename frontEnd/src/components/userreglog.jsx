import { MdOutlineEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
import { CgPassword } from "react-icons/cg";
import { useEffect, useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { Navigate, redirect, useNavigate } from "react-router-dom";

const userreglog = () => {
  const navigate = useNavigate();
  const [lpass, setlpass] = useState(false);
  const [lpassword, setlpassword] = useState("");
  const [passwordstrength, setpasswordstrength] = useState("");
  const [checkicon, setcheckicon] = useState({
    diplay: false,
    checkicon: false,
  });
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
  });
  const [checkemail, setcheckemail] = useState(false);
  const handlelpass = () => {
    setlpass((prev) => {
      return !prev;
    });
  };
  const checkpasssstrength = (pass) => {
    if (pass.length <= 6) {
      setpasswordstrength("The pass is too short ");
    } else if (pass.length >= 6) {
      setlpassword("");
      const regex = {
        lower: /[a-z]/,
        upper: /[A-Z]/,
        number: /\d/,
        special: /[!@#$%^&*(),.?":{}|<>]/,
      };
      let strength = 0;
      if (regex.lower.test(pass)) strength++;
      if (regex.upper.test(pass)) strength++;
      if (regex.number.test(pass)) strength++;
      if (regex.special.test(pass)) strength++;
      if (strength < 2) {
        setpasswordstrength(
          "password is weak try using caps and special characters!"
        );
      } else if (strength > 2) {
        setpasswordstrength("");
      }
    }
  };
  const handlesubmit = (ev) => {
    console.log(formdata);
    ev.preventDefault();
    axios
      .post("http://localhost:3565/register", formdata)
      .then((res) => {
        if (res.data.Status == "Sucess") {
          return navigate("/");
        } else {
          alert("Error Registering User ");
        }
      })
      .then((err) => console.log(err));
  };
  return (
    <section className="mt-40">
      <form class="max-w-sm mx-auto" onSubmit={handlesubmit}>
        <h1 className="text-center text-2xl font-semibold text-white">
          User Registrastion
        </h1>
        <p className="text-red-500 text-center h-4 my-3">{passwordstrength}</p>
        <label
          for="email-address-icon"
          class="block mb-2 text-xl font-medium text-white"
        >
          Name
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <FaUserAlt className="text-lg text-gray-400" />
          </div>
          <input
            type="text"
            id="email-address-icon"
            name="name"
            class="bg-transparent  border-purple-400 border  text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            placeholder="Ryan Mikey"
            onChange={(ev) => {
              setformdata((prev) => ({ ...prev, name: ev.target.value }));
              if (ev.target.value.length < 4) {
                setpasswordstrength(
                  "User Name Should atleast have 4 characters"
                );
              } else if (ev.target.value.length > 3) {
                setpasswordstrength(" ");
              }
            }}
            value={formdata.name}
          />
        </div>
        <label
          for="email-address-icon"
          class="block mb-2 text-xl font-medium text-white"
        >
          Email
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <MdOutlineEmail className="text-xl text-gray-400" />
          </div>
          <div className="absolute inset-y-0 end-5 flex items-center ps-3.5 pointer-events-none">
            {checkemail.display ? (
              checkemail.icon ? (
                <FaCheck className="text-xl text-green-400" />
              ) : (
                <IoClose className="text-2xl text-red-400 font-semibold" />
              )
            ) : (
              ""
            )}
          </div>
          <input
            type="email"
            id="email-address-icon"
            class="bg-transparent  border-purple-400 border  text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            placeholder="example@email.com"
            name="email"
            onChange={(ev) => {
              setformdata((prev) => ({ ...prev, email: ev.target.value }));
              if (!checkemail.display) {
                setcheckemail((prevval) => ({
                  ...prevval,
                  display: true,
                }));
              }
              if (
                /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(ev.target.value)
              ) {
                setcheckemail((prevval) => ({ ...prevval, icon: true }));
              } else {
                if (checkemail.icon) {
                  setcheckemail((prevval) => ({ ...prevval, icon: false }));
                }
              }
            }}
            value={formdata.email}
          />
        </div>
        <label
          for="email-address-icon"
          class="block mb-2 text-xl font-medium text-white"
        >
          Password
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <CgPassword className="text-xl text-gray-400" />
          </div>
          <div class="absolute inset-y-0 end-5 flex items-center ps-3.5 ">
            {lpass ? (
              <IoMdEye
                className="text-xl text-gray-400 cursor-pointer"
                onClick={() => {
                  handlelpass();
                }}
              />
            ) : (
              <IoEyeOff
                className="text-xl text-gray-400 cursor-pointer"
                onClick={() => {
                  handlelpass();
                }}
              />
            )}
          </div>
          <input
            type={lpass ? "text" : "password"}
            name="password"
            id="email-address-icon"
            class="bg-transparent  border-purple-400 border  text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            placeholder="password"
            onChange={(ev) => {
              checkpasssstrength(ev.target.value);
              setlpassword(ev.target.value);
              setformdata((prev) => ({ ...prev, password: ev.target.value }));
            }}
            value={formdata.password}
          />
        </div>
        <label
          for="email-address-icon"
          class="block mb-2 text-xl font-medium text-white"
        >
          Confirm Password
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <CgPassword className="text-xl text-gray-400" />
          </div>
          <div class="absolute inset-y-0 end-5 flex items-center ps-3.5 ">
            {checkicon.diplay ? (
              checkicon.checkicon ? (
                <FaCheck className="text-xl text-green-400" />
              ) : (
                <IoClose className="text-2xl text-red-400 font-semibold" />
              )
            ) : (
              ""
            )}
          </div>
          <input
            type={lpass ? "text" : "password"}
            id="email-address-icon"
            class="bg-transparent  border-purple-400 border  text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            placeholder="password"
            onChange={(ev) => {
              if (!checkicon.diplay) {
                setcheckicon((prev) => ({ ...prev, diplay: true }));
                setpasswordstrength("Confirm password doesn't match");
              }
              if (ev.target.value != "" && ev.target.value == lpassword) {
                setcheckicon((prev) => ({ ...prev, checkicon: true }));
                setpasswordstrength("");
              }
            }}
          />
        </div>

        <label
          for="email-address-icon"
          class="block mb-2 text-xl font-medium text-white"
        >
          Comapny
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <GrOrganization className="text-xl text-gray-400" />
          </div>
          <input
            type="text"
            id="email-address-icon"
            class="bg-transparent  border-purple-400 border  text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            placeholder="Company Name"
            name="companyName"
            value={formdata.companyName}
            onChange={(ev) => {
              setformdata((pre) => ({
                ...pre,
                companyName: ev.target.value,
              }));
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-white text-center mt-4">
            Already have a account ! Login
            <a href="/" className="text-purple-400 underline">
              Here
            </a>
          </p>
          <button
            type="submit"
            className="mt-4  border-purple-400 border rounded-lg text-white px-3 py-2 hover:bg-purple-500 font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default userreglog;
