import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Components/Logo";
import { Button } from "@mui/material";
import { CgLogIn } from "react-icons/cg";
import { PiUserCirclePlusFill } from "react-icons/pi";

function VerifyAccount() {
  
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
          <img src={'./verify.png'} alt="" width={'80px'} />
        </div>
        <h1 className="text-center text-[40px] font-bold mt-4">
          Welcome Back! <br /> Please verify your Email.
        </h1>
        <br />
        <p className="text-center text-[15px] font-medium">OTP send to <span className="text-primary font-semibold">cse.kanishkk@gmail.com</span></p>
        <br />
        <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Verify OTP
          </button>
      </div>
    </section>
  );
}

export default VerifyAccount;
