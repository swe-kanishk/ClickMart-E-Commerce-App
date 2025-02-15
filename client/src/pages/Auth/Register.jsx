import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { postData } from "../../utils/api";
import toast from "react-hot-toast";
import { BiLoader } from "react-icons/bi";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [formFields, setFormFields] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => ({ ...formFields, [name]: value }));
  };

  const validValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFields.fullName === "") {
      toast.error("Please add fullName!");
      return;
    } else if (formFields.email === "") {
      toast.error("Please add email!");
      return;
    } else if (formFields.password === "") {
      toast.error("Please add password!");
      return;
    }
    setIsLoading(true);
    postData("/api/user/register", formFields).then((res) => {
      if (res?.success) {
        localStorage.setItem('userEmail', formFields.email);
        toast.success(res?.message)
        setIsLoading(false);
        setFormFields({
          fullName: "",
          email: "",
          password: "",
        });
        navigate('/verify')
      }
      else {
        toast.error(res?.message)
        setIsLoading(false);
      }
    });
  };
  return (
    <section className="py-5">
      <div className="container">
        <div className="card shadow-md w-[450px] m-auto rounded-lg bg-white p-5 px-8">
          <h3 className="text-center text-[20px] font-[500] text-black">
            Register with a new Account
          </h3>
          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5 relative">
              <TextField
                id="fullName"
                label="FullName"
                name="fullName"
                value={formFields.fullName}
                disabled={isLoading}
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
              <span className="!absolute top-5 right-1 !rounded-full !min-h-[35px] !h-[35px] !text-gray-500 !min-w-[35px] !w-[35px]">
                <FaUser size={"20px"} />
              </span>
            </div>
            <div className="form-group w-full mb-5 relative">
              <TextField
                id="email"
                label="Email"
                name="email"
                disabled={isLoading}
                value={formFields.email}
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
              <span className="!absolute top-4 right-1 !rounded-full !min-h-[35px] !h-[35px] !text-gray-500 !min-w-[35px] !w-[35px]">
                <MdOutlineEmail size={"22px"} />
              </span>
            </div>
            <div className="form-group w-full mb-1 relative">
              <TextField
                id="password"
                label="Password"
                name="password"
                disabled={isLoading}
                value={formFields.password}
                variant="outlined"
                className="w-full"
                type={isShowPassword ? "text" : "password"}
                onChange={onChangeInput}
              />
              <Button
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="!absolute top-3 right-1 !rounded-full !min-h-[40px] !h-[40px] !min-w-[40px] !w-[40px] !text-gray-500"
              >
                {isShowPassword ? (
                  <IoMdEyeOff size={"22px"} />
                ) : (
                  <IoMdEye size={"22px"} />
                )}
              </Button>
            </div>
            <div className="flex items-center my-5">
              <Button
                disabled={!validValue || isLoading}
                type="submit"
                className={`!w-full ${
                  isLoading ? "!bg-red-400" : "!bg-red-500"
                }  !text-white !py-2 hover:!bg-black`}
              >
                {isLoading ? (
                  <BiLoader size={"22px"} className="animate-spin" />
                ) : (
                  "Register"
                )}
              </Button>
            </div>
            <p className="text-center text-[14px] text-gray-500 underline underline-offset-2">
              Already have an Account?{" "}
              <Link
                to="/login"
                className="hover:text-red-500 text-[14px] font-[500] text-blue-600"
              >
                Login
              </Link>
            </p>
            <p className="text-sm text-center my-5 font-medium text-gray-500">
              Or continue with social account
            </p>
            <Button className="!flex gap-3 !w-full !mb-3 !text-black !py-2 !bg-[#f1f1f1]">
              <FcGoogle size={"22px"} /> Sign in With Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
