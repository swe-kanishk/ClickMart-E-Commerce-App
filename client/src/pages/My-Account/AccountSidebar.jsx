import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { HiClipboardCheck } from "react-icons/hi";
import { IoMdHeart } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { BiLoader } from "react-icons/bi";
import { uploadImage, getData } from "../../utils/api";
import { MyContext } from "../../App";

function AccountSidebar() {
  const [previews, setPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const formData = new FormData();
  const navigate = useNavigate();

  const context = useContext(MyContext);

  useEffect(() => {
    const userAvatar = [];
    if(context?.userData?.avatar !== '' && context?.userData?.avatar !== null && context?.userData?.avatar !== undefined) {
      userAvatar.push(context?.userData?.avatar);
    }
    setPreviews(userAvatar);
  }, [context?.userData]);

  const handleOnChangeFile = async (e, url) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setIsUploading(true);
      for (let i = 0; i < files.length; i++) {
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

  const handleLogout = () => {
    getData(`/api/user/logout?token=${localStorage.getItem("accessToken")}`, {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        if (res?.success === true) {
          toast.success(res?.message);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          context.setIsLogin(false);
          navigate("/");
        } else {
          toast.error(res?.message);
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        toast.error("Logout failed. Please try again.");
      });
  };
  return (
    <div className="card bg-white shadow-md rounded-md sticky top-10">
      <div className="w-full p-5 flex items-center justify-center flex-col">
        <div className="rounded-full w-[110px] h-[110px] bg-gray-200 aspect-square flex items-center justify-center object-cover overflow-hidden relative mb-4 group cursor-pointer">
          {isUploading ? (
            <BiLoader size={28} className="text-gray-500 animate-spin" />
          ) : previews.length > 0 ? (
            previews.map((img, index) => (
              <img
                src={img}
                key={index}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ))
          ) : (
            <img
              src={'./user-avatar.png'}
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
        <h3>{context?.userData?.fullName}</h3>
        <h6 className="text-[13px] font-[500]">{context?.userData?.email}</h6>
      </div>
      <ul className="list-none pb-5 bg-[#f5f5f5] myAccountTabs">
        <li className="w-full">
          <NavLink to="/my-account" activeClassName="isActive">
            <Button className="!flex !w-full !text-gray-700 !rounded-none !items-center !px-5 !justify-start gap-2 !capitalize">
              <FaRegUser size={"16px"} />
              My Profile
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/wishlist" activeClassName="isActive">
            <Button className="!flex !w-full !text-gray-700 !rounded-none !items-center !px-5 !justify-start gap-2 !capitalize">
              <IoMdHeart size={"18px"} />
              My List
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/orders" activeClassName="isActive">
            <Button className="!flex !w-full !text-gray-700 !rounded-none !items-center !px-5 !justify-start gap-2 !capitalize">
              <HiClipboardCheck size={"18px"} />
              My Orders
            </Button>
          </NavLink>
        </li>
        <li onClick={handleLogout} className="w-full">
          <Button className="!flex !w-full !text-gray-700 !rounded-none !items-center !px-5 !justify-start gap-2 !capitalize">
            <IoLogOutOutline size={"18px"} />
            Logout
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default AccountSidebar;
