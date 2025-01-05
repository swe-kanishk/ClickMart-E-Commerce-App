import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Login() {
    const [isShowPassword, setIsShowPassword] = useState(false)
  return (
    <section className="py-5">
      <div className="container">
        <div className="card shadow-md w-[450px] m-auto rounded-lg bg-white p-5 px-8">
          <h3 className="text-center text-[20px] font-[500] text-black">
            Login to your Account
          </h3>
          <form className="w-full mt-5">
            <div className="form-group w-full mb-5 relative">
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                className="w-full"
              />
              <span className="!absolute top-4 right-1 !rounded-full !min-h-[35px] !h-[35px] !text-gray-500 !min-w-[35px] !w-[35px]"><MdOutlineEmail size={'22px'} /></span>
            </div>
            <div className="form-group w-full mb-1 relative">
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                className="w-full"
                type={isShowPassword ? 'text' : 'password'}
              />
              <Button onClick={() => setIsShowPassword(!isShowPassword)} className="!absolute top-3 right-1 !rounded-full !min-h-[40px] !h-[40px] !min-w-[40px] !w-[40px] !text-gray-500">{ isShowPassword ? <IoMdEyeOff size={'22px'} /> : <IoMdEye size={'22px'} />}</Button>
            </div>
            <Link className="hover:text-red-500 text-[14px] font-[500] text-blue-600">Forgot Password?</Link>
            <div className="flex items-center my-5">
                <Button className="!w-full !bg-red-500 !text-white !py-2 hover:!bg-black">Login</Button>
            </div>
            <p className="text-center text-[14px] text-gray-500 underline underline-offset-2">Not Registered? <Link to="/register" className="hover:text-red-500 text-[14px] font-[500] text-blue-600">Register</Link></p>
            <p className="text-sm text-center my-5 font-medium text-gray-500">Or continue with social account</p>
            <Button className="!flex gap-3 !w-full !mb-3 !text-black !py-2 !bg-[#f1f1f1]"><FcGoogle size={'22px'} /> Sign in With Google</Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
