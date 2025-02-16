import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
import { BiLoader } from "react-icons/bi";
import { postData } from "../../utils/api";
import toast from "react-hot-toast";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const forgotPassword = () => {
    if (formFields.email === "") {
      toast.error("Please add email!");
      return;
    }
    setIsLoading(true)
    localStorage.setItem("actionType", "forgot-password");
    localStorage.setItem("userEmail", formFields.email);
    
    postData("/api/user/forgot-password", {
      email: formFields.email,
    }).then((res) => {
      if (res?.success) {
        toast.success(res?.message);
        setIsLoading(false);
        navigate("/verify");
      } else {
        toast.error(res?.message);
        localStorage.removeItem("actionType");
        localStorage.removeItem("userEmail");
        setIsLoading(false);
      }
    });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => ({ ...formFields, [name]: value.trim() }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFields.email === "") {
      toast.error("Please add email!");
      return;
    } else if (formFields.password === "") {
      toast.error("Please add password!");
      return;
    }
    setIsLoading(true);
    postData("/api/user/login", formFields).then((res) => {
      if (res?.success) {
        toast.success(res?.message);
        setIsLoading(false);
        setFormFields({
          email: "",
          password: "",
        });
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        context.setIsLogin(true);
        navigate("/");
      } else {
        toast.error(res?.message);
        setIsLoading(false);
      }
    });
  };

  const validValue = Object.values(formFields).every((el) => el);
  return (
    <section className="py-5">
      <div className="container">
        <div className="card shadow-md w-[450px] m-auto rounded-lg bg-white p-5 px-8">
          <h3 className="text-center text-[20px] font-[500] text-black">
            Login to your Account
          </h3>
          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5 relative">
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                className="w-full"
                disabled={isLoading}
                name="email"
                value={formFields.email}
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
                disabled={isLoading}
                variant="outlined"
                className="w-full"
                type={isShowPassword ? "text" : "password"}
                name="password"
                value={formFields.password}
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
            <span
              onClick={forgotPassword}
              className="hover:text-red-500 cursor-pointer text-[14px] font-[500] text-blue-600"
            >
              Forgot Password?
            </span>
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
                  "Login"
                )}
              </Button>
            </div>
            <p className="text-center text-[14px] text-gray-500 underline underline-offset-2">
              Not Registered?{" "}
              <Link
                to="/register"
                className="hover:text-red-500 text-[14px] font-[500] text-blue-600"
              >
                Register
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

export default Login;
