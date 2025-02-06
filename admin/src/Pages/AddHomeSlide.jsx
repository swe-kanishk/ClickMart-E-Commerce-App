import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import UploadProductBox from "../Components/UploadProductBox";
import { Button } from "@mui/material";
import { MdOutlineFileUpload } from "react-icons/md";

function AddHomeSlide() {
  return (
    <section className="p-5 bg-gray-50">
      <form className="form px-2">
        <div className="scroll max-h-[78vh] pt-4 overflow-y-scroll">
          <div className="grid grid-cols-7 gap-4">
            <div className="uploadBoxWrapper relative">
              <IoMdCloseCircle className="text-red-500 z-50 absolute -top-2 -right-2 cursor-pointer" size={'30px'} />
              <div className="p-0 rounded-md h-[150px] flex-col w-[100%] flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 hover:border-gray-600 overflow-hidden border-dashed border border-gray-400">
              <LazyLoadImage
                alt={'image'}
                className="w-full h-full object-cover"
                effect="blur"
                src={'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp'}
                wrapperProps={{
                  style: {transitionDelay: "1s"},
                }}
              />
              </div>
            </div>
            <UploadProductBox multiple={true} />
          </div>
        </div>
        <br />
        <Button type="submit" className="!bg-blue-600 mt-3 !text-white !capitalize !max-w-[250px] w-full !p-2 !text-center !font-[500] gap-1"><MdOutlineFileUpload size={'20px'} className="mb-1" /> Publish and View</Button>
     
      </form>
    </section>
  );
}

export default AddHomeSlide;
