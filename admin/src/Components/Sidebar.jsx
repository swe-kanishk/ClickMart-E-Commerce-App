import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
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
import { MyContext } from "../App";
import Logo from "./Logo";

function Sidebar() {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const isOpenSubmenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else setSubmenuIndex(index);
  };

  const context = useContext(MyContext)

  return (
    <div className={`fixed py-2 px-2 top-0 left-0 bg-[#fff] ${context.isSidebarOpen ? 'w-[18%]' : 'w-[0px]'} border-r border-gray-300 h-full`}>
      <div className="pb-3 border-b whitespace-nowrap transition-all">
      <Logo />
      </div>
      <ul className="mt-4">
        <li>
          <Link to="/">
          <Button className="w-full !py-2 !capitalize hover:!text-black !justify-start gap-2 !text-gray-700 !text-[600] hover:!bg-[#f1f1f1] flex items-end">
            <RxDashboard size={"18px"} />{" "}
            <span className="text-[16px]">Dashboard</span>
          </Button>
          </Link>
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
                <Link to="/homeSlider/list"><Button className="!capitalize !w-full !pl-8 !text-[13px] flex gap-2 !font-[500] !justify-start !text-gray-500"><span className="block bg-gray-300 h-[6px] w-[6px] rounded-full"></span> Home Slides List</Button></Link>
              </li>
            </ul>
          </Collapse>
        </li>
        <li>
        <Link to="/users">
          <Button className="w-full !py-2 !capitalize hover:!text-black !justify-start gap-2 !text-gray-700 !text-[600] hover:!bg-[#f1f1f1] flex items-end">
            <LuUsers size={"20px"} /> <span className="text-[16px]">Users</span>
          </Button>
          </Link>
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
                <Link to={'/products'}><Button className="!capitalize !w-full !pl-8 !text-[13px] flex gap-2 !font-[500] !justify-start !text-gray-500"><span className="block bg-gray-300 h-[6px] w-[6px] rounded-full"></span> Product List</Button></Link>
                <Button onClick={() => context.setIsOpenFullScreenPannel({open: true, model: 'Add Product'})} className="!capitalize !w-full !pl-8 !text-[13px] flex gap-2 !font-[500] !justify-start !text-gray-500"><span className="block bg-gray-300 h-[6px] w-[6px] rounded-full"></span> Product Upload</Button>
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
