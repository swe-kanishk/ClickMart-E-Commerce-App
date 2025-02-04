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

function Signup() {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [formFields, setFormFields] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });

  function handleClickGoogle() {
    setLoadingGoogle(true);
  }

  function handleClickFacebook() {
    setLoadingFacebook(true);
  }
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
        src="/bgPattern.webp"
        className="w-full fixed top-0 left-0 pointer-events-none opacity-5"
        alt=""
      />
      <div className="login-card max-w-[760px] mx-auto z-50 pt-32">
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
          Join us today! <br /> <span>Get special benefits and stay up-to-date.</span>
        </h1>
        <div className="flex items-center mt-5 justify-center gap-4">
          <LoadingButton
            size="small"
            onClick={handleClickGoogle}
            endIcon={<FcGoogle size={"25px"} />}
            loading={loadingGoogle}
            loadingPosition="end"
            variant="outlined"
            className="!capitalize !px-5 !text-[15px] !py-2 !font-medium !text-gray-700"
          >
            Sign-in with Google
          </LoadingButton>

          <LoadingButton
            size="small"
            onClick={handleClickFacebook}
            endIcon={<FaFacebook size={"22px"} className="text-blue-500" />}
            loading={loadingFacebook}
            loadingPosition="end"
            variant="outlined"
            className="!capitalize !px-5 !text-[15px] !py-2 !font-medium !text-gray-700"
          >
            Sign-in with Facebook
          </LoadingButton>
        </div>
        <br />
        <div className="flex items-center gap-3 w-full justify-center">
          <span className="flex items-center h-[1px] w-[150px] bg-slate-400"></span>
          <span className="text-slate-500 text-[14px]">
            Or, Sign in with your email
          </span>
          <span className="flex items-center h-[1px] w-[150px] bg-slate-400"></span>
        </div>
        <form className="w-full mt-4 space-y-4">
          <div>
            <div className="flex items-center mb-2 gap-6">
                <div className="w-1/2"><label
              htmlFor="firstname"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              FirstName
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              className="bg-gray-50 border h-[50px] outline-gray-700 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2"
              placeholder="firstname"
              required
            /></div>
                <div className="w-1/2">
                <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              LastName
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="bg-gray-50 border h-[50px] outline-gray-700 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2"
              placeholder="lastname"
              required
            />
                </div>
            </div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border h-[50px] outline-gray-700 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="form-group w-full relative">
              <input
                id="password"
                label="Password"
                type={isShowPassword ? "text" : "password"}
                variant="outlined"
                placeholder="••••••••"
                name="password"
                className="bg-gray-50 border h-[50px] outline-gray-700 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2"
                value={formFields.password}
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    password: e.target.value.trim(),
                  })
                }
              />
              <Button
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="!absolute top-1 right-1 !rounded-full !min-h-[40px] !h-[40px] !min-w-[40px] !w-[40px] !text-gray-500"
              >
                {isShowPassword ? (
                  <IoMdEyeOff size={"22px"} />
                ) : (
                  <IoMdEye size={"22px"} />
                )}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-500">
                Remember me
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500">
            Already have an account?{" "}
            <Link to={'/login'} className="font-medium text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Signup;
