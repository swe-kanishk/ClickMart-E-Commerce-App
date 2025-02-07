import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Components/Logo";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { CgLogIn } from "react-icons/cg";
import { PiUserCirclePlusFill, PiUserCirclePlusLight } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function ChangePassword() {
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const [formFields, setFormFields] = useState({
      newPassword: "",
      confirmPassword: "",
    });

  return (
    <section className="bg-[#ffffff]">
      <header className="w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6">
          <NavLink to={"/login"} exact={true} activeClassName="isActive">
            <Button
              variant="outlined"
              className="!text-black !font-[500] gap-1 !bg-gray-200 !border-gray-600 !rounded-full !px-3 !capitalize"
            >
              <CgLogIn size={"18px"} /> Login
            </Button>
          </NavLink>
          <NavLink to={"/sign-up"} exact={true} activeClassName="isActive">
            <Button
              variant="outlined"
              className="!text-black !border-gray-600 !font-[500] gap-1 !bg-gray-200 !rounded-full !px-3 !capitalize"
            >
              <PiUserCirclePlusFill size={"18px"} /> Signup
            </Button>
          </NavLink>
        </div>
      </header>
      <img
        src="https://fullstack-ecommerce-add-admin.netlify.app/static/media/pattern.df9a7a28fc13484d1013.webp"
        className="w-full fixed top-0 left-0 pointer-events-none opacity-5"
        alt=""
      />
      <div className="login-card max-w-[600px] mx-auto z-50 pt-32">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={"80px"}
            fill="none"
            viewBox="0 0 48 26"
          >
            <rect
              width="10.16"
              height="19.93"
              fill="currentColor"
              rx="5.08"
              transform="rotate(29.49 -5.18 20.77) skewX(.85)"
            ></rect>
            <rect
              width="10.16"
              height="25.62"
              fill="currentColor"
              rx="5.08"
              transform="matrix(.87 .492 -.48 .878 27.17 0)"
            ></rect>
            <rect
              width="10.16"
              height="10.25"
              fill="currentColor"
              opacity=".5"
              rx="5.08"
              transform="rotate(29.49 -8.24 75.34) skewX(.85)"
            ></rect>
          </svg>
        </div>
        <h1 className="text-center text-[40px] font-bold mt-4">
          Welcome Back! <br /> You can change your password from here.
        </h1>
        <form className="w-full mt-4 space-y-4">
  
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              New Password
            </label>
            <div className="form-group w-full relative">
              <input
                id="password"
                label="Password"
                type={isShowNewPassword ? "text" : "password"}
                variant="outlined"
                placeholder="••••••••"
                name="password"
                className="bg-gray-50 border h-[50px] outline-gray-700 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2"
                value={formFields.password}
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    newPassword: e.target.value.trim(),
                  })
                }
              />
              <Button
                onClick={() => setIsShowNewPassword(!isShowNewPassword)}
                className="!absolute top-1 right-1 !rounded-full !min-h-[40px] !h-[40px] !min-w-[40px] !w-[40px] !text-gray-500"
              >
                {isShowNewPassword ? (
                  <IoMdEyeOff size={"22px"} />
                ) : (
                  <IoMdEye size={"22px"} />
                )}
              </Button>
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <div className="form-group w-full relative">
              <input
                id="password"
                label="Password"
                type={isShowConfirmPassword ? "text" : "password"}
                variant="outlined"
                placeholder="••••••••"
                name="password"
                className="bg-gray-50 border h-[50px] outline-gray-700 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2"
                value={formFields.password}
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    confirmPassword: e.target.value.trim(),
                  })
                }
              />
              <Button
                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                className="!absolute top-1 right-1 !rounded-full !min-h-[40px] !h-[40px] !min-w-[40px] !w-[40px] !text-gray-500"
              >
                {isShowConfirmPassword ? (
                  <IoMdEyeOff size={"22px"} />
                ) : (
                  <IoMdEye size={"22px"} />
                )}
              </Button>
            </div>
          </div>

          <br />
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Change Password
          </button>
        </form>
      </div>
    </section>
  );
}

export default ChangePassword;
