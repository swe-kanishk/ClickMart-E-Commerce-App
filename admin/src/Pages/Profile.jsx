import React, { useContext, useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MyContext } from "../App";
import { postData, editData, uploadImage } from "../utils/api";

import { Button } from "@mui/material";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import TextField from "@mui/material/TextField";
import { Collapse } from "react-collapse";

function Profile() {
  const [previews, setPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const formData = new FormData();
  const navigate = useNavigate();

  const context = useContext(MyContext);

  useEffect(() => {
    const userAvatar = [];
    if (
      context?.adminData?.avatar !== "" &&
      context?.adminData?.avatar !== null &&
      context?.adminData?.avatar !== undefined
    ) {
      userAvatar.push(context?.adminData?.avatar);
    }
    setPreviews(userAvatar);
  }, [context?.adminData]);

  const handleOnChangeFile = async (e, url) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setIsUploading(true);
      for (let i = 0; i < files?.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];
          formData.append("avatar", file);

          uploadImage("/api/user/user-avatar", formData, {
            withCredentials: true,
          }).then((res) => {
            setIsUploading(false);
            const avatar = [];
            avatar.push(res?.data?.avatar);
            setPreviews(avatar);
          });
        } else {
          toast.error("Please select a valid JPG, webp or PNG image file!");
          setIsUploading(false);
          return false;
        }
      }
    } catch (error) {
      console.log(error);
      setIsUploading(false);
      toast.error(error?.message);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [adminId, setAdminId] = useState(null);

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
    if (context?.adminData?._id !== "" && context?.adminData?._id !== undefined) {
      setAdminId(context?.adminData?._id);
      setFormFields({
        email: context?.adminData?.email,
        fullName: context?.adminData?.fullName,
        mobile: context?.adminData?.mobile,
      });
      setChangePassword({
        email: context?.adminData?.email,
      });
    }
  }, [context?.adminData]);

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
    editData(`/api/user/${adminId}`, formFields, { withCredentials: true }).then(
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
    <div className="card w-[65%] bg-white p-5 shadow-md shadow-gray-300 border rounded-md my-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-[600]">Admin Profile</h2>
        <Button
          onClick={() => setIsChangePasswordOpen(!isChangePasswordOpen)}
          className="!ml-auto !capitalize"
        >
          Change Password
        </Button>
      </div>
      <br />
      <div className="rounded-full w-[110px] h-[110px] bg-gray-200 aspect-square flex items-center justify-center object-cover overflow-hidden relative mb-4 group cursor-pointer">
        {isUploading ? (
          <BiLoader size={28} className="text-gray-500 animate-spin" />
        ) : previews?.length > 0 ? (
          previews?.map((img, index) => (
            <img
              src={img}
              key={index}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ))
        ) : (
          <img
            src={"./user-avatar.png"}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        )}

        <div className="overlay w-full h-full absolute top-0 items-center justify-center left-0 z-50 bg-[rgba(0,0,0,0.5)] opacity-0 transition flex group-hover:opacity-100">
          <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            className="opacity-0 absolute top-0 cursor-pointer left-0 w-full h-full"
            onChange={(e) => handleOnChangeFile(e, "/api/user/user-avatar")}
          />
        </div>
      </div>
      <form className="mt-8 form" onSubmit={handleSubmit}>
        <div className="flex items-center gap-5">
          <div className="w-[50%]">
            <input
              type="text"
              className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              name="fullName"
              disabled={isLoading}
              value={formFields.fullName}
              onChange={handleOnChangeInput}
            />
          </div>
          <div className="w-[50%]">
            <input
              type="email"
              className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              name="email"
              disabled={isLoading}
              value={formFields.email}
              onChange={handleOnChangeInput}
            />
          </div>
        </div>
        <div className="flex items-center mt-4 gap-5">
          <div className="w-[50%]">
            <PhoneInput
              defaultCountry="in"
              name="mobile"
              disabled={isLoading}
              value={formFields.mobile || ''}
              onChange={(mobile) => setFormFields({...formFields, mobile})}
            />
          </div>
        </div>
        <br />
        <div className="flex items-center gap-5">
          <Button
            disabled={!validValue || isLoading}
            type="submit"
            className={`!w-full ${
              isLoading || !validValue ? "!bg-blue-400" : "!bg-blue-500"
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
      <Collapse isOpened={isChangePasswordOpen}>
        <form className="mt-8" onSubmit={handleSubmitChangePassword}>
          <div className="flex items-center pb-3">
            <h2 className="">Change Password</h2>
          </div>
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
      </Collapse>
    </div>
  );
}

export default Profile;
