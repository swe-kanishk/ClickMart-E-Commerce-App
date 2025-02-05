import React from 'react'
import { IoSearch } from 'react-icons/io5'

function ProductSearchbox() {
  return (
    <div className='w-full h-auto relative overflow-hidden'>
      <input type="text" placeholder='Search here...' className='h-[40px] w-full border bg-[#ffffff] rounded-md pl-8 text-[14px] border-gray-300 px-2 focus:border-gray-700 outline-none' />
      <IoSearch className='absolute top-3 opacity-55 left-2 pointer-events-none' />
    </div>
  )
}

export default ProductSearchbox
