import React from 'react'
import './style.css'
import Button from '@mui/material/Button';
import { IoSearch } from "react-icons/io5";

function Search() {
  return (
    <div className='searchBox w-[100%] bg-[#e5e5e5] h-[40px] rounded-[6px] flex items-center relative'>
      <input type="text" placeholder='Search for products...' className='w-full h-[30px] focus:outline-none bg-inherit py-2 px-3 text-[15px]' />
      <Button className='!absolute top-[3px] z-50 !w-[34px] !min-w-[34px] !h-[34px] right-[5px] !rounded-full !text-[#2b2b2b]'><IoSearch size={'24px'} /></Button>
    </div>
  )
}

export default Search
