import React, { createRef, useCallback, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../Components/Logo";
import { Button } from "@mui/material";
import { CgLogIn } from "react-icons/cg";
import { PiUserCirclePlusFill } from "react-icons/pi";
import { postData } from "../../utils/api";
import toast from "react-hot-toast";
import { BiLoader } from "react-icons/bi";

function VerifyAccount() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const inputRefs = useMemo(
    () => Array.from({ length: 6 }, () => createRef()),
    []
  );

  const handleChange = useCallback(
    (index, value) => {
      setOtp((prevCode) => {
        const newCode = [...prevCode];

        if (value.length > 1) {
          const pastedCode = value.slice(0, 6).split("");
          pastedCode.forEach((char, i) => (newCode[i] = char || ""));

          const lastFilledIndex = newCode.findLastIndex(
            (digit) => digit !== ""
          );
          const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
          inputRefs[focusIndex]?.current?.focus();
        } else {
          newCode[index] = value;
          if (value && index < 5) {
            inputRefs[index + 1]?.current?.focus();
          }
        }
        return newCode;
      });
    },
    [inputRefs]
  );

  const handleKeyDown = useCallback(
    (index, e) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs[index - 1]?.current?.focus();
      }
    },
    [otp, inputRefs]
  );
  const validValue = otp.every((el) => el);

  const verifyOTP = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const actionType = localStorage.getItem("actionType");
    if (actionType !== "forgot-password") {
      postData("/api/user/verify-email", {
        email: localStorage.getItem("userEmail"),
        otp: otp.join(""),
      }).then((res) => {
        console.log(res)
        if (res?.success === true) {
          localStorage.removeItem("userEmail");
          toast.success(res?.message);
          setIsLoading(false);
          navigate("/login");
        } else {
          toast.error(res?.message);
          setIsLoading(false);
        }
      }).catch((err) => {
        toast.error(err?.message || 'something went wrong!')
        setIsLoading(false);
        console.log(err)
      });
    }
    else {
      postData("/api/user/verify-forgot-password-otp", {
        email: localStorage.getItem("userEmail"),
        otp: otp.join(""),
      }).then((res) => {
        if (res.success === true) {
          localStorage.removeItem("actionType");
          toast.success(res?.message);
          setIsLoading(false);
          navigate("/change-password");
        } else {
          toast.error(res?.message);
          setIsLoading(false);
        }
      }).catch((err) => {
        toast.error(err?.message || 'something went wrong!')
        setIsLoading(false);
        console.log(err)
      });;
    }
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
          <img src={'./verify.png'} alt="" width={'80px'} />
        </div>
        <h1 className="text-center text-[40px] font-bold mt-4">
          Welcome Back! <br /> Please verify your Email.
        </h1>
        <br />
        <p className="text-center text-[15px] font-medium">OTP send to <span className="text-primary font-semibold">{localStorage.getItem("userEmail")}</span></p>
        <br />
        <form onSubmit={verifyOTP} className="flex items-center justify-center flex-col">
            <div className="flex my-2 gap-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength=""
                  name="otp"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center font-bold text-gray-500 border focus:border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              ))}
            </div>
            <Button
              disabled={!validValue || isLoading}
              type="submit"
              className={`!w-[400px] !my-3 !capitalize ${
                isLoading ? "!bg-blue-500" : "!bg-blue-600"
              }  !text-white hover:!bg-blue-700 !focus:ring-4 focus:!outline-none focus:!ring-blue-300 !font-medium !rounded-lg !text-sm !px-5 !py-2.5 !text-center`}
            >
              {isLoading ? (
                <BiLoader size={"22px"} className="animate-spin" />
              ) : (
                "Verify OTP"
              )}
            </Button>
          </form>
      </div>
    </section>
  );
}

export default VerifyAccount;
