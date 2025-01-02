import React from "react";
import { Link } from "react-router-dom";

function HomeBanner() {
  return (
    <div className="flex w-full h-[100%] m-auto flex-col overflow-hidden items-end justify-between gap-3">
      <div className="group overflow-hidden h-1/2 rounded-lg relative">
        <div className="absolute flex flex-col items-start justify-center h-[100%] z-50 left-[1rem]">
          <h3 className="font-medium pb-2 text-xl flex">
            Samsung Gear VR Camera
          </h3>
          <span className="text-red-500 font-medium text-[20px]">$129.00</span>
          <Link to="/" className="btn text-black hover:text-red-500 block underline underline-offset-2 mt-4">Shop Now</Link>
        </div>
        <img
          src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg"
          alt=""
          className="group-hover:scale-105 min-h-[100%] max-h-[100%] duration-500 transition-all object-cover"
        />
      </div>
      <div className="group overflow-hidden h-1/2 rounded-lg relative">
      <div className="absolute flex flex-col justify-center items-start h-full z-50 right-[1rem]">
          <h3 className="font-medium pb-2 text-xl flex-wrap">
            Marcel Dining Room Chair
          </h3>
          <span className="text-red-500 font-medium text-[20px]">$44.05</span>
          <Link to="/" className="btn text-black hover:text-red-500 block underline underline-offset-2 mt-4">Shop Now</Link>
        </div>
        <img
          src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-2.jpg"
          alt=""
          className="group-hover:scale-105 min-h-[100%] max-h-[100%] duration-500 transition-all object-cover"
        />
      </div>
    </div>
  );
}

export default HomeBanner;
