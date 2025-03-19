import React from "react";
import { useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { uploadImages } from "../utils/api";
import toast from "react-hot-toast";
import { BiLoader } from "react-icons/bi";

function UploadProductBox({ multiple, name, url, setPreviewsfunction }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleOnChangeFile = async (e, apiEndPoint) => {
    const formData = new FormData(); // Create a new FormData instance
    try {
      setPreviewsfunction([]); // Clear previous previews
      const files = e.target.files;
      setIsUploading(true);
  
      // Validate and append all files to formData
      for (let i = 0; i < files?.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          formData.append(name, files[i]); // Append each file to formData
        } else {
          toast.error("Please select a valid JPG, webp, or PNG image file!");
          setIsUploading(false);
          return false;
        }
      }
  
      // Send formData to the server in a single request
      const res = await uploadImages(apiEndPoint, formData, {
        withCredentials: true,
      });
  
      if (res?.status === 200) {
        setIsUploading(false);
        setPreviewsfunction(res?.data?.images); // Update previews with uploaded images
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
        <>
        <BiLoader size={"22px"} className="animate-spin" />
        <span className="text-center">Uploading...</span>
        </>
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
            multiple={multiple || false}
            className="absolute top-0 opacity-0 left-0 w-full h-full z-50"
          />
        </>
      )}
    </div>
  );
}

export default UploadProductBox;
