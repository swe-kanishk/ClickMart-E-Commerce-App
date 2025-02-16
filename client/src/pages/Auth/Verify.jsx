import { createRef, useCallback, useEffect, useMemo, useState } from "react";
import verifyPng from "../../../src/components/assets/verify.png";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import { BiLoader } from "react-icons/bi";

function Verify() {
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

  const verifyOTP = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const actionType = localStorage.getItem("actionType");
    if (actionType !== "forgot-password") {
      postData("/api/user/verify-email", {
        email: localStorage.getItem("userEmail"),
        otp: otp.join(""),
      }).then((res) => {
        if (res.success) {
          localStorage.removeItem("userEmail");
          toast.success(res?.message);
          setIsLoading(false);
          navigate("/login");
        } else {
          toast.error(res?.message);
          setIsLoading(false);
        }
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
          navigate("/forgot-password");
        } else {
          toast.error(res?.message);
          setIsLoading(false);
        }
      });
    }
  };

  const validValue = otp.every((el) => el);
  return (
    <section className="py-5">
      <div className="container">
        <div className="card shadow-md w-[450px] flex flex-col gap-1 items-center justify-start m-auto rounded-lg bg-white py-6 px-3">
          <div className="text-center mb-2">
            <img src={verifyPng} alt="" width={"50"} />
          </div>
          <h3 className="text-center text-[20px] mb-2 font-[500] text-black">
            Verify OTP
          </h3>
          <p className="mb-4 text-center">
            OTP send to{" "}
            <span className="font-medium text-primary">
              {localStorage.getItem("userEmail")}
            </span>
          </p>
          <form onSubmit={verifyOTP}>
            <div className="flex my-2 gap-2 justify-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength="1"
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
              className={`!w-full !my-3 !capitalize ${
                isLoading ? "!bg-red-400" : "!bg-red-500"
              }  !text-white !py-2 hover:!bg-black`}
            >
              {isLoading ? (
                <BiLoader size={"22px"} className="animate-spin" />
              ) : (
                "Verify OTP"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Verify;
