import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../Components/Logo";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { CgLogIn } from "react-icons/cg";
import { PiUserCirclePlusFill, PiUserCirclePlusLight } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { BiLoader } from "react-icons/bi";
import { postData } from "../../utils/api";
import toast from "react-hot-toast";
import { MyContext } from "../../App";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../../firebase";
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

function Login() {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);

  const context = useContext(MyContext);

  function handleGoogleSignup() {
    setLoadingGoogle(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        
        const fields = {
          fullName: user?.providerData?.[0]?.displayName,
          email: user?.providerData?.[0]?.email,
          avatar: user?.providerData?.[0]?.photoURL,
          mobile: user?.providerData?.[0]?.phoneNumber,
        }

        postData("/api/user/authWithGoogle", fields).then((res) => {
          console.log(res);
          if (res?.success === true) {
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            context.setIsLogin(true);
            toast.success(res?.message);
            navigate("/");
          } else {
            toast.error(res?.message);
          }
        });

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error(errorMessage);
      })
      .finally(() => {
        setLoadingGoogle(false);
      });
  }

  function handleClickFacebook() {
    setLoadingFacebook(true);
  }

  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [formFields, setFormFields] = useState({
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
  return (
    <section className="bg-[#ffffff] h-[100lvh]">
      <header className="w-full fixed top-0 left-0 px-4 hidden py-3 sm:flex items-center md:justify-between justify-center">
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
        className="w-full h-full fixed top-0 left-0 pointer-events-none opacity-5"
        alt=""
      />
      <div className="login-card w-full h-full sm:max-w-[600px] flex flex-col items-center justify-center mx-auto z-50 px-6">
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
        <h1 className="text-center sm:text-[40px] text-[24px] xs font-bold mt-4">
          Welcome Back! <br /> Login with your credentials
        </h1>
        <div className="flex flex-col sm:flex-row items-center mt-5 justify-center gap-4">
          <LoadingButton
            size="small"
            onClick={handleGoogleSignup}
            endIcon={<FcGoogle size={"25px"} />}
            loading={loadingGoogle}
            loadingPosition="end"
            variant="outlined"
            className="!capitalize !px-5 !text-[15px] !py-2 !font-medium !text-gray-700"
          >
            Sign-up with Google
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
            Sign-up with Facebook
          </LoadingButton>
        </div>
        <br />
        <div className="flex items-center gap-3 w-full justify-center">
        <span className="flex items-center h-[1px] sm:w-[150px] w-[50px] bg-slate-400"></span>         
          <span className="text-slate-500 text-[14px]">
            Or, Login with your email
          </span>
          <span className="flex items-center h-[1px] sm:w-[150px] w-[50px] bg-slate-400"></span>         
        </div>
        <form className="w-full mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              onChange={onChangeInput}
              name="email"
              id="email"
              disabled={isLoading}
              value={formFields.email}
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
                disabled={isLoading}
                type={isShowPassword ? "text" : "password"}
                variant="outlined"
                placeholder="••••••••"
                name="password"
                className="bg-gray-50 border h-[50px] outline-gray-700 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2"
                value={formFields.password}
                onChange={onChangeInput}
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
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            disabled={!validValue || isLoading}
            type="submit"
            className="!w-full !text-white !capitalize !bg-blue-600 !hover:bg-blue-700 !focus:ring-4 !focus:outline-none !focus:ring-blue-300 !font-medium !rounded-lg !text-sm !px-5 !py-2.5 !text-center"
          >
            {isLoading ? (
              <BiLoader size={"22px"} className="animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
          <p className="text-sm font-light text-gray-500">
            Don’t have an account yet?{" "}
            <Link
              to={"/sign-up"}
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
