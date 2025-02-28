import React from "react";
import { useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { uploadImages } from "../utils/api";
import toast from "react-hot-toast";
import { BiLoader } from "react-icons/bi";

function UploadProductBox({ multiple, name, url, setPreviews }) {
  const [isUploading, setIsUploading] = useState(false);

  const formData = new FormData();

  const handleOnChangeFile = async (e, apiEndPoint) => {
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
          formData.append(name, file);
          for (const [key, value] of Object.entries(formData)) {
            console.log(`${key}: ${value}`);
          }

          uploadImages(apiEndPoint, formData, {
            withCredentials: true,
          }).then((res) => {
            if (res?.status === 200) {
              setIsUploading(false);
              setPreviews(res?.data?.images);
            }
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
    <div className="p-3 rounded-md h-[150px] flex-col relative w-[170px] flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 hover:border-gray-600 overflow-hidden border-dashed border border-gray-400 ">
      {isUploading ? (
        <BiLoader size={"22px"} className="animate-spin" />
      ) : (
        <>
          <FaRegImages
            size={"40px"}
            className="opacity-50 pointer-events-none"
          />
          <h4 className="text-[14px] pointer-events-none text-gray-500">
            Image Upload
          </h4>
          <input
            type="file"
            name={name}
            onChange={(e) => handleOnChangeFile(e, url)}
            accept="image/*"
            multiple={multiple !== "undefined" ? true : false}
            className="absolute top-0 opacity-0 left-0 w-full h-full z-50"
          />
        </>
      )}
    </div>
  );
}

export default UploadProductBox;
