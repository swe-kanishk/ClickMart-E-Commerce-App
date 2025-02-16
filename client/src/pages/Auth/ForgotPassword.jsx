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

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const [formFields, setFormFields] = useState({
    email: localStorage.getItem("userEmail"),
    newPassword: "",
    confirmPassword: "",
  });

  //   const context = useContext(MyContext)
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value.trim() }));
    console.log(formFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFields.newPassword === "") {
      toast.error("Please enter new password!");
      return;
    } else if (formFields.confirmPassword === "") {
      toast.error("Please enter confirm password!");
      return;
    } else if (formFields.newPassword !== formFields.confirmPassword) {
      toast.error("new password & confirm password shoud be same!");
      return;
    }
    setIsLoading(true);
    postData("/api/user/reset-password", formFields).then((res) => {
      if (res?.success) {
        toast.success(res?.message);
        setIsLoading(false);
        localStorage.removeItem("userEmail");
        setFormFields({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
        navigate("/login");
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
            Forgot Password
          </h3>
          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-3 relative">
              <TextField
                id="newPassword"
                label="New Password"
                disabled={isLoading}
                variant="outlined"
                className="w-full"
                type={isShowNewPassword ? "text" : "password"}
                name="newPassword"
                value={formFields.newPassword}
                onChange={onChangeInput}
              />
              <Button
                onClick={() => setIsShowNewPassword(!isShowNewPassword)}
                className="!absolute top-3 right-1 !rounded-full !min-h-[40px] !h-[40px] !min-w-[40px] !w-[40px] !text-gray-500"
              >
                {isShowNewPassword ? (
                  <IoMdEyeOff size={"22px"} />
                ) : (
                  <IoMdEye size={"22px"} />
                )}
              </Button>
            </div>
            <div className="form-group w-full relative">
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                disabled={isLoading}
                variant="outlined"
                className="w-full"
                type={isShowConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formFields.confirmPassword}
                onChange={onChangeInput}
              />
              <Button
                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                className="!absolute top-3 right-1 !rounded-full !min-h-[40px] !h-[40px] !min-w-[40px] !w-[40px] !text-gray-500"
              >
                {isShowConfirmPassword ? (
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
                  "Change Password"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
