import { MdOutlineEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
import { CgPassword } from "react-icons/cg";
import { useEffect, useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";

const userreglog = () => {
  const [lpass, setlpass] = useState(false);
  const [lpassword, setlpassword] = useState("");
  const [passwordstrength, setpasswordstrength] = useState("");
  const handlelpass = () => {
    setlpass((prev) => {
      return !prev;
    });
  };
  const checkpasssstrength = (pass) => {
    if (pass.length <= 6) {
      setpasswordstrength("The pass is too short ");
    } else if (pass.length >= 6) {
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
        setpasswordstrength("weak try using caps and special characters!");
      }
      // if (strength === 2) return setpasswordstrength("Medium");
      if (strength > 2) return setpasswordstrength("strong");
    }
  };
  return (
    <section className="mt-40">
      <form class="max-w-sm mx-auto">
        <h1 className="text-center text-2xl font-semibold text-white">
          User Registrastion
        </h1>
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
            class="bg-transparent  border-purple-400 border  text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            placeholder="Ryan Mikey"
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
          <input
            type="text"
            id="email-address-icon"
            class="bg-transparent  border-purple-400 border  text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            placeholder="example@email.com"
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
          <input
            type="text"
            id="email-address-icon"
            class="bg-transparent  border-purple-400 border  text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            placeholder="password"
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
          />
        </div>
        <button
          type="submit"
          className="mt-4  border-purple-400 border rounded-lg text-white px-3 py-2 hover:bg-purple-500 font-semibold"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default userreglog;
