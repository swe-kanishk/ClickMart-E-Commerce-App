import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { LuUsers } from "react-icons/lu";
import {
  IoBagCheckOutline,
  IoImagesOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { RiProductHuntLine } from "react-icons/ri";
import { CiViewList } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";

import {Collapse} from 'react-collapse';

function Sidebar() {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const isOpenSubmenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else setSubmenuIndex(index);
  };
  return (
    <div className="fixed py-2 px-2 top-0 left-0 bg-[#fff] w-[18%] border-r border-gray-300 h-full">
      <Link className="logo border-b pb-5 border-gray-300 flex items-center gap-2 justify-start pl-2 py-2 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={"40px"}
          fill="none"
          viewBox="0 0 48 26"
        >
          <rect
            width="10.16"
            height="19.93"
            fill="currentColor"
            rx="5.08"
            transform="rotate(29.49 -5.18 20.77) skewX(.85)"
          ></rect>
          <rect
            width="10.16"
            height="25.62"
            fill="currentColor"
            rx="5.08"
            transform="matrix(.87 .492 -.48 .878 27.17 0)"
          ></rect>
          <rect
            width="10.16"
            height="10.25"
            fill="currentColor"
            opacity=".5"
            rx="5.08"
            transform="rotate(29.49 -8.24 75.34) skewX(.85)"
          ></rect>
        </svg>
        <h2 className="font-[600]">ClickMart Admin</h2>
      </Link>
      <ul className="mt-4">
        <li>
          <Button className="w-full !py-2 !capitalize hover:!text-black !justify-start gap-2 !text-gray-700 !text-[600] hover:!bg-[#f1f1f1] flex items-end">
            <RxDashboard size={"18px"} />{" "}
            <span className="text-[16px]">Dashboard</span>
          </Button>
        </li>
        <li>
          <Button onClick={() => isOpenSubmenu(1)} className="w-full !py-2 !capitalize hover:!text-black !justify-start gap-2 !text-gray-700 !text-[600] hover:!bg-[#f1f1f1] flex items-end">
            <IoImagesOutline size={"18px"} />{" "}
            <span className="text-[16px]">Home Slides</span>
            <span className="ml-auto">
              <FaAngleDown className={`transition-all duration-400 ${submenuIndex === 1 ? 'rotate-0' : '-rotate-90'}`} />
            </span>
          </Button>
          <Collapse isOpened={submenuIndex === 1 ? true : false}>
            <ul className="w-full">
              <li className="w-full">
                <Button className="!capitalize !w-full !pl-8 !text-[13px] flex gap-2 !font-[500] !justify-start !text-gray-500"><span className="block bg-gray-300 h-[6px] w-[6px] rounded-full"></span> Add Home Banner Slide</Button>
                <Button className="!capitalize !w-full !pl-8 !text-[13px] flex gap-2 !font-[500] !justify-start !text-gray-500"><span className="block bg-gray-300 h-[6px] w-[6px] rounded-full"></span> Home Slides List</Button>
              </li>
            </ul>
          </Collapse>
        </li>
        <li>
          <Button className="w-full !py-2 !capitalize hover:!text-black !justify-start gap-2 !text-gray-700 !text-[600] hover:!bg-[#f1f1f1] flex items-end">
            <LuUsers size={"20px"} /> <span className="text-[16px]">Users</span>
          </Button>
        </li>
        <li>
          <Button onClick={() => isOpenSubmenu(2)} className="w-full !py-2 !capitalize hover:!text-black !justify-start gap-2 !text-gray-700 !text-[600] hover:!bg-[#f1f1f1] flex items-end">
            <CiViewList size={"22px"} />{" "}
            <span className="text-[16px]">Category</span>
            <span className="ml-auto">
              <FaAngleDown className={`transition-all duration-400 ${submenuIndex === 2 ? 'rotate-0' : '-rotate-90'}`} />
            </span>
          </Button>
          <Collapse isOpened={submenuIndex === 2 ? true : false}>
            <ul className="w-full">
            <li className="w-full">
                <Button className="!capitalize !w-full !pl-8 !text-[13px] flex gap-2 !font-[500] !justify-start !text-gray-500"><span className="block bg-gray-300 h-[6px] w-[6px] rounded-full"></span> Category List</Button>
                <Button className="!capitalize !w-full !pl-8 !text-[13px] flex gap-2 !font-[500] !justify-start !text-gray-500"><span className="block bg-gray-300 h-[6px] w-[6px] rounded-full"></span> Add a category</Button>
                <Button className="!capitalize !w-full !pl-8 !text-[13px] flex gap-2 !font-[500] !justify-start !text-gray-500"><span className="block bg-gray-300 h-[6px] w-[6px] rounded-full"></span> Sub Category List</Button>
                <Button className="!capitalize !w-full !pl-8 !text-[13px] flex gap-2 !font-[500] !justify-start !text-gray-500"><span className="block bg-gray-300 h-[6px] w-[6px] rounded-full"></span> Add a sub category</Button>
              </li>
            </ul>
          </Collapse>
        </li>
        <li>
          <Button onClick={() => isOpenSubmenu(3)} className="w-full !py-2 !capitalize hover:!text-black !justify-start gap-2 !text-gray-700 !text-[600] hover:!bg-[#f1f1f1] flex items-end">
            <RiProductHuntLine size={"21px"} />{" "}
            <span className="text-[16px]">Products</span>
            <span className="ml-auto">
              <FaAngleDown className={`transition-all duration-400 ${submenuIndex === 3 ? 'rotate-0' : '-rotate-90'}`} />
            </span>
          </Button>
          <Collapse isOpened={submenuIndex === 3 ? true : false}>
            <ul className="w-full">
            <li className="w-full">
                <Button className="!capitalize !w-full !pl-8 !text-[13px] flex gap-2 !font-[500] !justify-start !text-gray-500"><span className="block bg-gray-300 h-[6px] w-[6px] rounded-full"></span> Product List</Button>
                <Button className="!capitalize !w-full !pl-8 !text-[13px] flex gap-2 !font-[500] !justify-start !text-gray-500"><span className="block bg-gray-300 h-[6px] w-[6px] rounded-full"></span> Product Upload</Button>
              </li>
            </ul>
          </Collapse>
        </li>
        <li>
          <Button className="w-full !py-2 !capitalize hover:!text-black !justify-start gap-2 !text-gray-700 !text-[600] hover:!bg-[#f1f1f1] flex items-end">
            <IoBagCheckOutline size={"20px"} />{" "}
            <span className="text-[16px]">Orders</span>
          </Button>
        </li>
        <li>
          <Button className="w-full !py-2 !capitalize hover:!text-black !justify-start gap-2 !text-gray-700 !text-[600] hover:!bg-[#f1f1f1] flex items-end">
            <IoLogOutOutline size={"22px"} />{" "}
            <span className="text-[16px]">Logout</span>
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
