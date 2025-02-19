import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../Components/Logo";
import { Button } from "@mui/material";
import { CgLogIn } from "react-icons/cg";
import { PiUserCirclePlusFill, PiUserCirclePlusLight } from "react-icons/pi";
import { BiLoader } from "react-icons/bi";
import { postData } from "../../utils/api";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const forgotPassword = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
  
    if (email === "") {
      toast.error("Please add email!");
      return;
    }
  
    setIsLoading(true);
    localStorage.setItem("actionType", "forgot-password");
    localStorage.setItem("userEmail", email); // Use email instead of formFields.email
  
    postData("/api/user/forgot-password", { email })
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          navigate("/verify-account");
        } else {
          toast.error(res?.message);
          localStorage.removeItem("actionType");
          localStorage.removeItem("userEmail");
        }
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again.");
        console.error("Forgot Password Error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
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
          Having trouble to sign in? <br /> Reset your password
        </h1>
        <form className="w-full mt-4 space-y-4" onSubmit={forgotPassword}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value.trim())}
              id="email"
              className="bg-gray-50 border h-[50px] outline-gray-700 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2"
              placeholder="Enter your email"
              required
            />
          </div>
          <Button
            disabled={!email || isLoading}
            type="submit"
            className="!w-full !text-white !bg-blue-600 !capitalize !hover:bg-blue-700 !focus:ring-4 !focus:outline-none !focus:ring-blue-300 !font-medium !rounded-lg !text-sm !px-5 !py-2.5 !text-center"
          >
            {isLoading ? (
              <BiLoader size={"22px"} className="animate-spin" />
            ) : (
              "Reset Password"
            )}
          </Button>
          <p className="text-sm text-center font-light text-gray-500">
            Don’t want to reset?{" "}
            <Link to={-1} className="font-medium text-blue-600 hover:underline">
              Go back
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;
