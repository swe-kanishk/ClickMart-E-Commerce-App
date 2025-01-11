import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { BsCommand } from "react-icons/bs";

function InputBox() {
  return (
    <div className='flex inputBox m-auto gap-2 px-2 border-[1.5px] w-full hover:border-black border-gray-300 items-center rounded-lg h-[35px]'>
        <IoSearchOutline />
      <input
        className='focus:outline-none w-full text-[14px]'
        placeholder="Search your page..."
      />
      <span className='bg-gray-800 text-white flex items-center gap-1 text-[12px] px-2 py-1 rounded-[5px]'><BsCommand size={'14px'} /> K</span>
    </div>
  )
}

export default InputBox
