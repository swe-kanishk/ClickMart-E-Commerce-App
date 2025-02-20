import React, { useContext, useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"
import { MyContext } from "../App";
import { uploadImage } from "../utils/api";

function Profile() {
  const [previews, setPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const formData = new FormData();
  const navigate = useNavigate();

  const context = useContext(MyContext);

  useEffect(() => {
    const userAvatar = [];
    if(context?.adminData?.avatar !== '' && context?.adminData?.avatar !== null && context?.adminData?.avatar !== undefined) {
      userAvatar.push(context?.adminData?.avatar);
    }
    setPreviews(userAvatar);
  }, [context?.adminData]);

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

  return (
    <div className="card bg-white p-5 shadow-md rounded-md my-4">
      <h2 className="text-[20px] font-[600]">Admin Profile</h2>
      <br />
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
    </div>
  );
}

export default Profile;
