import { Button } from '@mui/material'
import React from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { FaRegUser } from 'react-icons/fa6'
import { HiClipboardCheck } from 'react-icons/hi'
import { IoMdHeart } from 'react-icons/io'
import { IoLogOutOutline } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'

function AccountSidebar() {
  return (
    <div className="card bg-white shadow-md rounded-md sticky top-10">
            <div className="w-full p-5 flex items-center justify-center flex-col">
              <div className="rounded-full w-[110px] h-[110px] aspect-square object-cover overflow-hidden relative mb-4 group cursor-pointer">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgXjnwOAh3suTZVRaDGaXLtG5EzVhbOGEw8g&s"
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
                <div className="overlay w-full h-full absolute top-0 items-center justify-center left-0 z-50 bg-[rgba(0,0,0,0.5)] opacity-0 transition flex group-hover:opacity-100">
                  <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
                  <input
                    type="file"
                    className="opacity-0 absolute top-0 cursor-pointer left-0 w-full h-full"
                  />
                </div>
              </div>
              <h3>kanisxkkk</h3>
              <h6 className="text-[13px] font-[500]">cse.kanishkk@gmail.com</h6>
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
              <li className="w-full">
                <NavLink to="/logout" activeClassName="isActive">
                  <Button className="!flex !w-full !text-gray-700 !rounded-none !items-center !px-5 !justify-start gap-2 !capitalize">
                    <IoLogOutOutline size={"18px"} />
                    Logout
                  </Button>
                </NavLink>
              </li>
            </ul>
          </div>
  )
}

export default AccountSidebar
