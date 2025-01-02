import { Button } from "@mui/material";
import React from "react";
import { IoTimeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

function BlogItem() {
  return (
    <div className="blogItem">
      <div className="imgWrapper w-full overflow-hidden rounded-md relative">
        <img
          src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/psblog/b/8/1105_813/b-blog-6.jpg"
          alt="blog image"
          className="w-full transition-all hover:scale-110 hover:rotate-1 duration-700"
        />
        <span className="flex items-center justify-center absolute bottom-[15px] text-white bg-violet-500 py-1 rounded-md px-2 gap-2 right-[15px] text-[12px] font-medium">
          <IoTimeOutline size={"16px"} /> 2 January 2025
        </span>
      </div>
      <div className="info py-4 flex flex-col items-start justify-start">
        <h2 className="font-medium">Turpis at eleifend Aenean porta</h2>
        <p className="text-gray-400 text-[13px] text-start mb-1">
          Turpis at eleifend ps mi elit Aenean porta ac sed faucibus. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
        </p>
        <Link
          to="/"
          className="relative font-semibold flex items-center gap-1 text-[14px] text-red-500 group"
        >
          Read More <IoIosArrowForward className="relative top-[1px]" />
          <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-500 transition-all duration-300 ease-linear group-hover:w-full"></span>
        </Link>
      </div>
    </div>
  );
}

export default BlogItem;
