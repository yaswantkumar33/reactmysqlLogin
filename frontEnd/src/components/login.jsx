import { MdOutlineEmail } from "react-icons/md";
import { CgPassword } from "react-icons/cg";
import { useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const login = () => {
  const navigate = useNavigate();
  const [Errormsg, setErrormsg] = useState("");
  const [lpass, setlpass] = useState(false);
  const [checkemail, setcheckemail] = useState({ icon: false, display: false });
  axios.defaults.withCredentials = true;
  const handlelpass = () => {
    setlpass((prev) => {
      return !prev;
    });
  };
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const handlesubmit = (ev) => {
    ev.preventDefault();
    axios.post("http://localhost:3565/login", formdata).then((res) => {
      if (res.data.Status == "Sucess") {
        return navigate("/dashboard");
      } else {
        setErrormsg(res.data.message);
        // alert("Error While Login Check The Creditianls");
        console.log(res);
      }
    });

    console.log("handle submit called");
  };
  return (
    <section className="mt-40">
      <form
        className="max-w-sm mx-auto"
        onSubmit={(ev) => {
          handlesubmit(ev);
        }}
      >
        <h1 className="text-2xl text-white font-semibold text-center">
          User Login
        </h1>
        <p className="text-red-600 h-6 my-2 font-semibold text-lg text-center">
          {Errormsg}
        </p>
        <label className="block mb-2 text-xl font-medium text-white">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
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
            name="email"
            id="email-address-icon"
            className="bg-transparent  border-purple-400 border  text-white text-sm rounded-lg focus:ring-white  block w-full ps-10 p-2.5 focus:border-white"
            placeholder="example@email.com"
            value={formdata.email}
            onChange={(ev) => {
              setformdata((prevval) => ({
                ...prevval,
                email: ev.target.value,
              }));
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
          />
        </div>
        <label
          for="email-address-icon"
          className="block mb-2 text-xl font-medium text-white"
        >
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <CgPassword className="text-xl text-gray-400" />
          </div>
          <div className="absolute inset-y-0 end-5 flex items-center ps-3.5">
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
            name="password"
            type={lpass ? "text" : "password"}
            id="email-address-icon"
            className="bg-transparent  border-purple-400 border  text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            placeholder="password"
            onChange={(ev) => {
              setformdata((prev) => ({ ...prev, password: ev.target.value }));
              //   setlpassword(ev.target.value);
              //   checkpasssstrength(ev.target.value);
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-white text-center mt-4">
            Don't have account regisgter
            <a href="/register" className="text-purple-400 underline">
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

export default login;
