import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import AccountSidebar from "./AccountSidebar";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { editData, postData } from "../../utils/api";
import toast from "react-hot-toast";
import { BiLoader } from "react-icons/bi";
import { Collapse } from "react-collapse";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

function MyAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });

  const [changePassword, setChangePassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === "" || token === null || token === undefined) {
      navigate("/");
    }
  }, [localStorage.getItem("accessToken")]);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setUserId(context?.userData?._id);
      setFormFields({
        email: context?.userData?.email,
        fullName: context?.userData?.fullName,
        mobile: `${context?.userData?.mobile}`,
      });
      setChangePassword({
        email: context?.userData?.email,
      });
    }
  }, [context?.userData]);

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => ({ ...formFields, [name]: value }));
    setChangePassword(() => ({ ...changePassword, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFields.fullName === "") {
      toast.error("Please enter fullName!");
      return;
    } else if (formFields.email === "") {
      toast.error("Please enter email id!");
      return;
    } else if (formFields.mobile === "") {
      toast.error("Please enter mobile number!");
      return;
    }
    setIsLoading(true);
    editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then(
      (res) => {
        if (res?.data?.success === true) {
          toast.success(res?.data?.message);
          setIsLoading(false);
        } else {
          toast.error(res?.data?.message);
          setIsLoading(false);
        }
      }
    );
  };

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();
    if (changePassword.oldPassword === "") {
      toast.error("Please enter old password!");
      return;
    } else if (changePassword.newPassword === "") {
      toast.error("Please enter new password!");
      return;
    } else if (changePassword.confirmPassword === "") {
      toast.error("Please enter confirm password!");
      return;
    } else if (changePassword.confirmPassword !== changePassword.newPassword) {
      toast.error("confirm password & new password should be same!");
      return;
    }
    setIsLoading2(true);
    postData(`/api/user/reset-password`, changePassword, {
      withCredentials: true,
    }).then((res) => {
      if (res?.success === true) {
        toast.success(res?.message);
        setIsLoading2(false);
      } else {
        toast.error(res?.message);
        setIsLoading2(false);
      }
    });
  };

  const validValue = Object.values(formFields).every((el) => el);
  const validValue2 = Object.values(formFields).every((el) => el);
  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="left-col w-[20%]">
          <AccountSidebar />
        </div>
        <div className="right-col w-[80%]">
          <div className="card bg-white p-5 shadow-md rounded-md mb-5">
            <div className="flex items-center pb-3">
              <h2 className="">My Profile</h2>
              <Button
                onClick={() => setIsChangePasswordOpen(!isChangePasswordOpen)}
                className="!ml-auto !capitalize"
              >
                Change Password
              </Button>
            </div>
            <hr />
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="flex items-center gap-5">
                <div className="w-[50%]">
                  <TextField
                    label="Full Name"
                    disabled={isLoading}
                    value={formFields.fullName}
                    onChange={handleOnChangeInput}
                    className="w-full"
                    name="fullName"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                    label="Email"
                    disabled={true}
                    value={formFields.email}
                    onChange={handleOnChangeInput}
                    type="email"
                    className="w-full"
                    name="email"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
              <div className="flex items-center mt-4 gap-5">
                <div className="w-[50%]">
                  <PhoneInput
                    defaultCountry="in"
                    name="mobile"
                    disabled={isLoading}
                    value={formFields.mobile || ""}
                    onChange={(mobile) => {
                      setFormFields((prev) => ({ ...prev, mobile }));
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="flex items-center gap-5">
                <Button
                  disabled={!validValue || isLoading}
                  type="submit"
                  className={`!w-fit ${
                    isLoading || !validValue ? "!bg-red-400" : "!bg-red-500"
                  }  !text-white !py-1 !capitalize hover:!bg-black`}
                >
                  {isLoading ? (
                    <BiLoader size={"22px"} className="animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </div>
          <Collapse isOpened={isChangePasswordOpen}>
            <div className="card bg-white p-5 shadow-md rounded-md">
              <div className="flex items-center pb-3">
                <h2 className="">Change Password</h2>
              </div>
              <hr />
              <form className="mt-8" onSubmit={handleSubmitChangePassword}>
                <div className="flex items-center gap-5">
                  <div className="w-[50%]">
                    <TextField
                      label="Old Password"
                      disabled={isLoading}
                      value={changePassword.oldPassword}
                      onChange={handleOnChangeInput}
                      className="w-full"
                      name="oldPassword"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <div className="w-[50%]">
                    <TextField
                      label="New Password"
                      disabled={isLoading}
                      value={changePassword.newPassword}
                      onChange={handleOnChangeInput}
                      className="w-full"
                      name="newPassword"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
                <div className="flex items-center mt-4 gap-5">
                  <div className="w-[50%]">
                    <TextField
                      label="Confirm Password"
                      disabled={isLoading}
                      value={changePassword.confirmPassword}
                      onChange={handleOnChangeInput}
                      className="w-full"
                      name="confirmPassword"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
                <br />
                <div className="flex items-center gap-5">
                  <Button
                    disabled={!validValue2 || isLoading2}
                    type="submit"
                    className={`!w-fit ${
                      isLoading2 || !validValue2 ? "!bg-red-400" : "!bg-red-500"
                    }  !text-white !py-1 !capitalize hover:!bg-black`}
                  >
                    {isLoading2 ? (
                      <BiLoader size={"22px"} className="animate-spin" />
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Collapse>
        </div>
      </div>
    </section>
  );
}

export default MyAccount;
